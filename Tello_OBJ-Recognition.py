import time

import cv2
from djitellopy import tello
import cvzone

thres = 0.50
nmsThres = 0.2

# Code for webcam
# cap = cv2.VideoCapture(0)
# cap.set(3, 640)
# cap.set(4, 480)

classNames = []
classFile = 'ss.names' # Contains a totoal of 91 different objects which can be recognized by the code
with open(classFile, 'rt') as f:
    classNames = f.read().split('\n')


print(classNames)
configPath = 'ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
weightsPath = "frozen_inference_graph.pb"

net = cv2.dnn_DetectionModel(weightsPath, configPath)
net.setInputSize(320, 320)
net.setInputScale(1.0 / 127.5)
net.setInputMean((127.5, 127.5, 127.5))
net.setInputSwapRB(True)

me = tello.Tello()
me.connect()
print(me.get_battery())
me.streamoff()
me.streamon()
# me.enable_mission_pads()
# me.set_mission_pad_detection_direction(2)#enables for both forward and downward detection


me.takeoff()

plantGrid = [['plant1', 'plant2', 'plant3'], ['plant4', 'plant5', 'plant6'], ['plant7', 'plant8', 'plant9']]
rowCounter = 0
colCounter = 0
plant_x = 0
plant_y = 0
# it will use object recognition to detect that it is looking at a plant
# it will take a picutre of the plant from a predetermined/consistant height
def takePicture(rowCounter, colCounter):
    #take picture and send it back to computer through wifi connection so it can be sent to the database
    me.CAMERA_FORWARD
    frame_read = tello.get_frame_read()
    # capture image and give it the name based on plantGrid
    cv2.imwrite(plantGrid[rowCounter,colCounter], frame_read.frame)

def move_to_object(plant_y):
    print("im in move_object")
    #print("plant x: ", plant_x)
    print("plant y: ", plant_y)
    #me.go_xyz_speed(plant_x.__floor__(), plant_y.__floor__() - 20, 50, 10)
    me.move_forward((plant_y.__floor__() - 20)/2)
forWhileLoop = True
while forWhileLoop:
    img = me.get_frame_read().frame
    classIds, confs, bbox = net.detect(img, confThreshold=thres, nmsThreshold=nmsThres)
    try:
        for classId, conf, box in zip(classIds.flatten(), confs.flatten(), bbox):
            cvzone.cornerRect(img, box)
            cv2.putText(img, f'{classNames[classId - 1].upper()} {round(conf * 100, 2)}',
                        (box[0] + 10, box[1] + 30), cv2.FONT_HERSHEY_COMPLEX_SMALL,
                        1, (0, 255, 0), 2)
            if classNames[classId - 1] == "bottle":
                print("Found bottle")
                x, y, w, h = box
                plant_x = x + w / 2
                plant_y = y + h / 2
                print("plant x: ", plant_x)
                print("plant y: ", plant_y)

                move_to_object(plant_y)
                time.sleep(5)
                # move drone to the position of the plant
                # move drone 20cm away from the plant's position and at the same height as the plant
                #me.go_xyz(plant_x, plant_y - 20, 50, 60)
                #me.go_xyz_speed(plant_x, plant_y - 20, 50, 10)
                #me.wait_for_stabilization()

                # take a picture
                takePicture(rowCounter, colCounter)
                forWhileLoop = False


                # increment the counter
                # colCounter += 1
                # if colCounter > 2:
                #     colCounter = 0
                #     rowCounter += 1
                # if rowCounter > 2:
                #     rowCounter = 0
    except :
        pass
    #me.send_rc_control(0, 0, 0, 0)
    cv2.imshow("Image", img)
    cv2.waitKey(1)

print("im in move_object")
# print("plant x: ", plant_x)
print("plant y: ", plant_y)
#me.go_xyz_speed(plant_x.__floor__(), plant_y.__floor__() - 20, 50, 10)
me.move_forward(plant_y.__floor__() - 20)
me.land()