import logging
import time

from pathlib import Path
import sys
import os

import boto3
import cv2
import cvzone
import numpy as np
from botocore.exceptions import ClientError
from djitellopy import tello

"""
pilot.py is original work created by:
Capstone, Group 7 (AGM), at Bellevue College.
"""


def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.dirname(os.path.abspath(__file__))

    return os.path.join(base_path, relative_path)


thres = 0.50
nmsThres = 0.2
classNames = []
classFile = str(resource_path('ss.names'))
with open(classFile, 'rt') as f:
    classNames = f.read().split('\n')
print(classFile)
configPath = str(resource_path('ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'))
weightsPath = str(resource_path("frozen_inference_graph.pb"))
print("Current working directory:", os.getcwd())

# setup cv2 dnn
net = cv2.dnn_DetectionModel(resource_path('frozen_inference_graph.pb'),
                             resource_path('ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'))
net.setInputSize(320, 320)
net.setInputScale(1.0 / 127.5)
net.setInputMean((127.5, 127.5, 127.5))
net.setInputSwapRB(True)

# store movements of Tello
flight_path = {}
plant_x = 0
plant_y = 0


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


images_folder = str(resource_path('images'))
images = os.listdir(images_folder)


def monitor(app):
    me = tello.Tello()
    me.LOGGER.setLevel(logging.WARNING)
    me.connect()
    print("Battery = " + str(me.get_battery()) + "%")
    if me.get_battery() <= 15:
        me.streamoff()
        print("Battery too low to fly.")

    me.streamon()

    rnd = np.random.default_rng(12345)
    rnd_num = str(rnd.random())
    print(bcolors.WARNING + "DRONE TAKING OFF" + bcolors.ENDC)
    time.sleep(2)
    # me.takeoff()
    attempts = 0
    rotate_right_counter = 0
    rotate_left_counter = 0
    move_up_counter = 0
    move_down_counter = 0
    move_forward_counter = 0
    move_backward_counter = 0
    hold_counter = 0
    distance_ok = False
    x_centered = False
    y_centered = False
    capture_ok = False
    image_captured = False
    images_captured = 0
    plants = {}
    last_ratio = 0  # ratio of bounding box last captured by drone
    current_ratio = 0  # ratio of bounding box currently being captured by drone
    i = 0
    object_not_found_counter = 0
    object_found_counter = 0
    while app.monitoring:
        img = me.get_frame_read().frame
        classIds, confs, bbox = net.detect(img, confThreshold=thres, nmsThreshold=nmsThres)
        try:
            for classId, conf, box in zip(classIds.flatten(), confs.flatten(), bbox):
                cvzone.cornerRect(img, box)
                cv2.putText(img, f'{classNames[classId - 1].upper()} {round(conf * 100, 2)}',
                            (box[0] + 10, box[1] + 30), cv2.FONT_HERSHEY_COMPLEX_SMALL,
                            1, (0, 255, 0), 2)
                if classNames[classId - 1] == "potted plant" and conf >= 0.50:
                    # dimensions of the box around the target object
                    x, y, w, h = box
                    object_not_found_counter = 0
                    attempts = 0
                    if image_captured:
                        print(bcolors.OKCYAN + "I've taken", images_captured, "pictures" + bcolors.ENDC)
                        hold_counter = 0
                        # me.rotate_clockwise(50)
                        # me.move_back(30)
                        image_captured = False
                        if images_captured >= 2:
                            # me.land()
                            app.monitoring = False
                            me.streamoff()
                            continue

                    if distance_ok and x_centered and y_centered:
                        hold_counter += 1
                        attempts = 0
                        if hold_counter > 5 and images_captured < 2:
                            # plant names become "Plant_n" where n is some number 0-7
                            img_name = str(
                                "images/Plant" + "_" + str(
                                    images_captured) + ".png")
                            cv2.imwrite(img_name, me.get_frame_read().frame)
                            images_captured += 1
                            image_captured = True
                            hold_counter = 0

                    #  check distance from object, move until 40cm away from plant
                    if w < 320:  # distance at roughly 60cm
                        # plant is more than 60cm away, can move up 40cm
                        move_forward_counter += 1
                        distance_ok = False
                        if move_forward_counter > 3:
                            move_forward_counter = 0
                            # me.move_forward(20)
                            print(bcolors.WARNING + "MOVE DRONE FORWARD" + bcolors.ENDC)

                    else:
                        # distance of roughly 40cm from plant
                        if w > 440:
                            move_backward_counter += 1
                            distance_ok = False
                            if move_backward_counter > 1:
                                # me.move_back(20)
                                print(bcolors.FAIL + "MOVE DRONE BACK" + bcolors.ENDC)
                        else:
                            distance_ok = True
                            hold_counter += 1
                            attempts = 0

                    # check plant in x-axis
                    if x > 440:
                        # print(bcolors.WARNING + "X axis off center, move drone right" + bcolors.ENDC)
                        x_centered = False
                        rotate_right_counter += 1
                        if rotate_right_counter > 2:
                            print(bcolors.WARNING + "ROTATE DRONE CLOCKWISE" + bcolors.ENDC)
                            # me.rotate_clockwise(10)
                            rotate_right_counter = 0
                    elif x < 220:
                        # print(bcolors.WARNING + "X axis off center, move drone left" + bcolors.ENDC)
                        rotate_left_counter += 1
                        x_centered = False
                        if rotate_left_counter > 2:
                            print(bcolors.WARNING + "ROTATE DRONE COUNTERCLOCKWISE" + bcolors.ENDC)
                            # me.rotate_counter_clockwise(10)
                            rotate_left_counter = 0
                    else:
                        print(bcolors.OKGREEN + "X AXIS ON CENTER" + bcolors.ENDC)
                        x_centered = True
                        rotate_left_counter = 0
                        rotate_right_counter = 0
                        hold_counter += 1
                        attempts = 0

                    # check plant in y-axis
                    if y > 400:
                        # print(bcolors.WARNING + "Y axis off center, move drone down" + bcolors.ENDC)
                        y_centered = False
                        move_down_counter += 1
                        if move_down_counter > 5:
                            print(bcolors.WARNING + "MOVE DRONE DOWN" + bcolors.ENDC)
                            # me.move_down(20)
                            move_down_counter = 0
                    elif y < 80:
                        # print(bcolors.WARNING + "Y axis off center, move drone up" + bcolors.ENDC)
                        y_centered = False
                        move_up_counter += 1
                        if move_up_counter > 5:
                            print(bcolors.WARNING + "MOVE DRONE UP" + bcolors.ENDC)
                            # me.move_up(20)
                            move_up_counter = 0
                    else:
                        print(bcolors.OKGREEN + "Y AXIS ON CENTER" + bcolors.ENDC)
                        y_centered = True
                        move_down_counter = 0
                        move_up_counter = 0
                        hold_counter += 1
                        attempts = 0

                # rotate clockwise until plant found
                else:
                    object_not_found_counter += 1
                    if object_not_found_counter > 5:
                        attempts += 1
                        object_not_found_counter = 0
                        # me.rotate_clockwise(40)
                    elif attempts == 10:
                        # me.land()
                        print(bcolors.FAIL + f"{attempts} failed attempts, landing." + bcolors.ENDC)
                        app.monitoring = False
                        me.streamoff()

        except:
            pass
        cv2.imshow("Image", img)

        key = cv2.waitKey(1) & 0xFF  # bitwise AND with 0xFF to isolate last 8 bits
        # If 'q' key is pressed, break from loop and set app.monitoring to False
        if key == ord('q'):
            app.monitoring = False
            break

        # After the loop ends, close the window
    cv2.destroyAllWindows()
