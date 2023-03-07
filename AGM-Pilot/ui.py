import sys

import boto3
from botocore.exceptions import ClientError
import os, time, logging
from time import gmtime, strftime
from config.definitions import ROOT_DIR
import cv2
from djitellopy import tello
import cvzone
import numpy as np

thres = 0.50
nmsThres = 0.2
classNames = []
classFile = 'ss.names'  # Contains a totoal of 91 different objects which can be recognized by the code
with open(classFile, 'rt') as f:
    classNames = f.read().split('\n')

configPath = 'ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
weightsPath = "frozen_inference_graph.pb"

net = cv2.dnn_DetectionModel(weightsPath, configPath)
net.setInputSize(320, 320)
net.setInputScale(1.0 / 127.5)
net.setInputMean((127.5, 127.5, 127.5))
net.setInputSwapRB(True)

# me.enable_mission_pads()
# me.set_mission_pad_detection_direction(2)#enables for both forward and downward detection


flight_path = {}
# me.takeoff()

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


session = boto3.Session(
    aws_access_key_id="AKIAUFKX3XINW6TL6EF4",
    aws_secret_access_key="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",
)

client = session.client('s3')
s3 = session.resource('s3')
gardens = {}
p = os.path.join(ROOT_DIR, 'images')
images = os.listdir(p)


def new_user_garden(user_client):
    os.system('cls')
    garden_created = False
    while not garden_created:
        garden_name = input("Please provide a unique Garden ID or type 'q' to quit: ")
        if garden_name == 'q':
            break;
        try:
            response = user_client.create_bucket(
                Bucket=garden_name,
                CreateBucketConfiguration={
                    'LocationConstraint': 'us-west-2',
                },
            )
        except user_client.exceptions.ClientError:
            print(bcolors.FAIL + "Invalid bucket name\n" + bcolors.ENDC)
            continue
        except user_client.exceptions.BucketAlreadyExists:
            print(bcolors.FAIL + "Garden name already exists\n" + bcolors.ENDC)
            continue
        except user_client.exceptions.BucketAlreadyOwnedByYou:
            client_response = input(
                bcolors.FAIL + "Garden already exists and is owned by you, would you like to use it?\n" + bcolors.ENDC)
            if client_response.lower() == 'y':
                for bucket in s3.buckets.all():
                    if garden_name == bucket.name:
                        gardens[garden_name] = "active"
                        garden_created = True
                        continue
            else:
                continue
        else:
            garden_created = True


def list_gardens(user_client):
    os.system('cls')
    for bucket in s3.buckets.all():
        # existing s3 buckets will default to a non-active status
        if bucket.name not in gardens:
            gardens[bucket.name] = "non-active"

    print("Enter the garden name to toggle between active and non-active status, or enter 'q' to go back.\n\n")
    print("Garden name, Status: \n")
    garden_number = 1
    for key, value in gardens.items():
        print('- %s, %s' % (key, value))
        garden_number += 1


def select_garden(user_client):
    invalid_response = False
    garden_selection = ""
    while 'q' not in garden_selection:
        os.system('cls')
        list_gardens(user_client)
        if invalid_response:
            print("\n\nGarden status was not updated")
            time.sleep(.5)
        garden_selection = input("\n>    ")
        if garden_selection in gardens and gardens[garden_selection] == "non-active":
            gardens[garden_selection] = "active"
            print(garden_selection, "was found and is", gardens[garden_selection])
            invalid_response = False
        elif garden_selection in gardens and gardens[garden_selection] == "active":
            gardens[garden_selection] = "non-active"
            print(garden_selection, "was found and is", gardens[garden_selection])
            invalid_response = False
        else:
            invalid_response = True
            continue


def monitor():
    rnd = np.random.default_rng(12345)
    print("taking off")
    # me.takeoff()
    # time.sleep(2)
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
    monitoring = True
    while monitoring:
        img = me.get_frame_read().frame
        classIds, confs, bbox = net.detect(img, confThreshold=thres, nmsThreshold=nmsThres)
        try:
            for classId, conf, box in zip(classIds.flatten(), confs.flatten(), bbox):
                cvzone.cornerRect(img, box)
                cv2.putText(img, f'{classNames[classId - 1].upper()} {round(conf * 100, 2)}',
                            (box[0] + 10, box[1] + 30), cv2.FONT_HERSHEY_COMPLEX_SMALL,
                            1, (0, 255, 0), 2)
                if classNames[classId - 1] == "cup" and conf >= 0.50:
                    # dimensions of the box around the target object
                    x, y, w, h = box
                    object_not_found_counter = 0
                    attempts = 0
                    if image_captured:
                        print(bcolors.OKCYAN + "I've taken", images_captured, "pictures" + bcolors.ENDC)
                        # me.move_back(20)
                        # me.rotate_clockwise(40)
                        # me.land()
                        image_captured = False
                        if images_captured >= 8:
                            print(bcolors.OKCYAN + "I've taken at least 8 pictures")
                            # me.land()
                            # monitoring = False

                    if distance_ok and x_centered and y_centered:
                        hold_counter += 1
                        if hold_counter > 2 and images_captured < 8:
                            # frame_read = me.get_frame_read()
                            # pic_ts = str(strftime("%a-%d-%b-%Y_%H:%M:%S_+0000", gmtime()))
                            # my_str = str(pic_ts)
                            images_captured += 1
                            img_name = str(
                                "images/test_plant" + str(rnd.random()) + str(me.get_barometer()) + "_" + str(
                                    images_captured) + ".png")
                            # cv2.imwrite(img_name, me.get_frame_read().frame)
                            image_captured = True
                            hold_counter = 0

                    print("W of current plant = ", w)
                    #  check distance from object, move until 40cm away from plant
                    if w < 150:  # distance at roughly 60cm
                        # plant is more than 60cm away, can move up 40cm
                        move_forward_counter += 1
                        distance_ok = False
                        if move_forward_counter > 3:
                            move_forward_counter = 0
                            # me.move_forward(20)
                            print(bcolors.WARNING + "MOVING DRONE FORWARD" + bcolors.ENDC)
                    else:
                        # distance of roughly 40cm from plant
                        if w > 220:
                            # me.move_back(20)
                            print(bcolors.FAIL + "MOVE DRONE BACK" + bcolors.ENDC)
                            distance_ok = False
                        else:
                            distance_ok = True
                            hold_counter += 1


                    # check plant in x-axis
                    if x > 440:
                        print(bcolors.WARNING + "X axis off center, move drone right" + bcolors.ENDC)
                        x_centered = False
                        rotate_right_counter += 1
                        if rotate_right_counter > 2:
                            #print("HELP HELP HELP HELP")
                            print(bcolors.WARNING + "DRONE ROTATING CLOCKWISE" + bcolors.ENDC)
                            # me.rotate_clockwise(10)
                            rotate_right_counter = 0
                    elif x < 220:
                        print(bcolors.WARNING + "X axis off center, move drone left" + bcolors.ENDC)
                        rotate_left_counter += 1
                        x_centered = False
                        if rotate_left_counter > 2:
                            #print("HELP HELP HELP HELP")
                            print(bcolors.WARNING + "DRONE ROTATING COUNTERCLOCKWISE" + bcolors.ENDC)
                            # me.rotate_counter_clockwise(10)
                            rotate_left_counter = 0
                    else:
                        print(bcolors.OKGREEN + "X AXIS ON CENTER" + bcolors.ENDC)
                        x_centered = True
                        rotate_left_counter = 0
                        rotate_right_counter = 0
                        hold_counter += 1

                    # check plant in y-axis
                    if y > 400:
                        print(bcolors.WARNING + "Y axis off center, move drone down" + bcolors.ENDC)
                        y_centered = False
                        move_down_counter += 1
                        if move_down_counter > 5:
                            print(bcolors.WARNING + "DRONE MOVING DOWN" + bcolors.ENDC)
                            # me.move_down(20)
                            move_down_counter = 0
                    elif y < 80:
                        print(bcolors.WARNING + "Y axis off center, move drone up" + bcolors.ENDC)
                        y_centered = False
                        move_up_counter += 1
                        if move_up_counter > 5:
                            print(bcolors.WARNING + "DRONE MOVING UP" + bcolors.ENDC)
                            # me.move_up(20)
                            move_up_counter = 0
                    else:
                        print(bcolors.OKGREEN + "Y AXIS ON CENTER" + bcolors.ENDC)
                        y_centered = True
                        move_down_counter = 0
                        move_up_counter = 0
                        hold_counter += 1

                # rotate clockwise until plant found
                else:
                    object_not_found_counter += 1
                    # print("object_not_found_counter = ", object_not_found_counter)
                    if object_not_found_counter > 10:
                        attempts += 1
                        object_not_found_counter = 0
                        object_found_counter = 0
                    elif attempts > 3:
                        # me.land()
                        print("3 failed attempts landing")
                        # monitoring = False
        except:
            pass
        # me.send_rc_control(0, 0, 0, 0)
        cv2.imshow("Image", img)
        cv2.waitKey(1)


def menu():
    print(strftime("%a-%d-%b-%Y_%H:%M:%S_+0000", gmtime()))
    print("\nAGM Pilot UI:\n")
    print("1. View gardens")
    print("2. Create a new garden")
    print("3. Sync garden data")
    print("4. Start garden monitoring\n\n enter 'q' to exit")


# upload file to active S3 in 'garden'
def sync_garden():
    s3_client = boto3.client(
        's3',
        aws_access_key_id="",
        aws_secret_access_key="",
        # aws_session_token=SESSION_TOKEN
    )
    gardens_to_sync = 0
    active_gardens = []  # used to store names of all gardens that will be uploaded to
    for key, value in gardens.items():
        if value == "active":
            gardens_to_sync += 1
            active_gardens.append(key)
    if gardens_to_sync == 0:
        return False

    os.system('cls')
    print("Sync to", gardens_to_sync, "gardens?")
    ready_to_sync = input("\n\ny/n: ")

    if ready_to_sync == 'y':
        for target_garden in active_gardens:
            # first upload all image files from images folder
            for image in images:
                path = p
                path += "\\"
                path += image
                print(path)
                try:
                    with open(str(path), "rb") as f:
                        response = s3_client.upload_file(path, target_garden, str(image),
                                                         ExtraArgs={"ContentType": "image/jpeg"})
                except ClientError as e:
                    logging.error(e)
                    return False
            # finally upload the timestamp for this sync
            try:
                try:
                    fp = open("time_stamp.txt", "w")
                    fp.write(strftime("%a-%d-%b-%Y_%H:%M:%S_+0000", gmtime()))
                    fp.close()
                except FileNotFoundError:
                    fp = open("time_stamp.txt", "w")
                    fp.write(strftime("%a-%d-%b-%Y_%H:%M:%S_+0000", gmtime()))
                    fp.close()
                with open(str('time_stamp.txt'), "rb") as f:
                    response = s3_client.upload_file('time_stamp.txt', target_garden, str("time_stamp.txt"),
                                                     ExtraArgs={"ContentType": "text/html"})
            except ClientError as e:
                logging.error(e)
                return False
        return True
    else:
        return False


if __name__ == '__main__':
    bad_sync = False
    sync = False
    user_input = ""
    while 'q' not in user_input:
        os.system('cls')
        menu()
        if bad_sync:
            print(
                bcolors.WARNING + "Garden data could not be synchronized, check 'View gardens' to activate gardens before "
                                  "synchronizing garden data." + bcolors.ENDC)
            time.sleep(.5)
        elif sync:
            print(bcolors.OKGREEN + "Garden data was successfully synchronized!" + bcolors.ENDC)
            time.sleep(.5)
        user_input = input("\n\n>    ")
        if user_input == '1':
            bad_sync = False
            sync = False
            select_garden(client)
        elif user_input == '2':
            bad_sync = False
            sync = False
            new_user_garden(client)
        elif user_input == '3':
            if sync_garden():
                sync = True
            else:
                bad_sync = True
        elif user_input == '4':
            me = tello.Tello()
            me.LOGGER.setLevel(logging.WARNING)
            me.connect()
            print(me.get_battery())
            if me.get_battery() <= 15:
                me.streamoff()
                print("Battery too low to fly.")
            else:
                me.streamon()
                monitor()
                me.streamoff()
                continue
        else:
            bad_sync = False
            sync = False
            continue
    print("goodbye!")