# this is sudo for the order of operations that our drone will take
from djitellopy import tello
import cv2
import cvzone
from time import sleep

#import given names that the user specifies each plant as.
#if user has not specified then give generic names.
plantGrid = [['plant1', 'plant2', 'plant3'], ['plant4', 'plant5', 'plant6'], ['plant7', 'plant8', 'plant9']]
rowCounter = 0
colCounter = 0
plant_x = 0
plant_y = 0

# drone will look for nearest plant.
# or it will have the coordinantes of the first plant to scan
def takeOffFromPad():
    # leave pad and obtain predetermined hight
    # drone will take off from pad.
    me.enable_mission_pads()
    me.set_mission_pad_detection_direction(2)#enables for both forward and downward detection
    me.takeoff()

# it will use object recognition to detect that it is looking at a plant
# it will take a picutre of the plant from a predetermined/consistant height
def takePicture(rowCounter, colCounter):
    #take picture and send it back to computer through wifi connection so it can be sent to the database
    me.CAMERA_FORWARD
    frame_read = tello.get_frame_read()
    # capture image and give it the name based on plantGrid
    cv2.imwrite(plantGrid[rowCounter,colCounter], frame_read.frame)

# based on the grid that was given by the user, the drone will go to the next plant in the row
# we can either use the object recogntion to find the plant,
# or we can have a predetermined spacing between the plants
# grid array[][]= import grid from app
# #3x3
# []  []  []
# []  []  []
# []  []  []
#           [pad]

# def nextPlant():
#     #maybe a for loop would work for this. setting it to the row length
#     go to next plant in row
#     #this will find the closest plant and then take a picture of it
#     findPlant()
#     if(no more in current row):
#         colCounter++
#         start on next row
#         if(last row):
#             rowCounter++
#             go back to landing pad

#used by objectRecog function
thres = 0.50
nmsThres = 0.2
classNames = []
classFile = 'ss.names' # Contains a totoal of 91 different objects which can be recognized by the code
with open(classFile, 'rt') as f:
    classNames = f.read().split('\n')

configPath = 'ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
weightsPath = "frozen_inference_graph.pb"

net = cv2.dnn_DetectionModel(weightsPath, configPath)
net.setInputSize(320, 320)
net.setInputScale(1.0 / 127.5)
net.setInputMean((127.5, 127.5, 127.5))
net.setInputSwapRB(True)

#taken from the Tello_OBJ-Recognition.py and placed into its own function.
#need to find a way to get a return if it see's a "potted plant"
def objectRecog():
    me.streamoff()
    me.streamon()
    while True:
        img = me.get_frame_read().frame
        classIds, confs, bbox = net.detect(img, confThreshold=thres, nmsThreshold=nmsThres)
        try:
            for classId, conf, box in zip(classIds.flatten(), confs.flatten(), bbox):
                if classNames[classId - 1] == "bottle":
                    x, y, w, h = box
                    plant_x = x + w/2
                    plant_y = y + h/2
                    move_to_object(plant_y)
                    return
        except:
            pass

# use object recognition function to find where the next plant is.
# when it finds a plant go to it and run function takePicture
# def findPlant():
#     rowCounter = 0
#     colCounter = 0
#     plant_x, plant_y = objectRecog()
#     if plant_x != 0 and plant_y != 0:
#         # Get the current position of the drone
#         current_x, current_y, current_z = me.get_xyz()
#         me.go_xyz_speed(plant_x, plant_y, current_z+15, 20)
#         sleep(5)
#         takePicture(rowCounter, colCounter)
#         # Move to the next plant in the grid
#         colCounter += 1
#         if colCounter >= len(plantGrid[rowCounter]):
#             colCounter = 0
#             rowCounter += 1
#         if rowCounter >= len(plantGrid):
#             # Go back to the landing pad
#             me.land()
#         else:
#             findPlant()

def move_to_object(plant_y):
    print("im in move_object")
    #print("plant x: ", plant_x)
    print("plant y: ", plant_y)
    #me.go_xyz_speed(plant_x.__floor__(), plant_y.__floor__() - 20, 50, 10)
    me.move_forward((plant_y.__floor__() - 20)/2)

def findAndTakePicture():
    if plant_x != 0 and plant_y != 0:
        # move drone to the position of the plant
        me.go_xyz(plant_x, plant_y, 50, 60)
        # take a picture
        takePicture(rowCounter, colCounter)

#instructions
me = tello.Tello()
me.connect()
print(me.get_battery())
#takeOffFromPad()
me.enable_mission_pads()
me.set_mission_pad_detection_direction(2)#enables for both forward and downward detection
me.takeoff()
# go to predetermined plant or use object detection to find it
findAndTakePicture()
while rowCounter != len(plantGrid) or colCounter != len(plantGrid[0]):

    rowCounter += 1
    colCounter += 1
    if rowCounter == len(plantGrid) and colCounter == len(plantGrid[0]):
        me.land()
    else:
        findAndTakePicture()
