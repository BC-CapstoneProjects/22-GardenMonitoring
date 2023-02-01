from djitellopy import tello
from time import sleep
import cv2


plantGrid = [['plant1', 'plant2', 'plant3'], ['plant4', 'plant5', 'plant6'], ['plant7', 'plant8', 'plant9']]
rowCounter = 0
colCounter = 0

me = tello.Tello()
me.connect()
print(me.get_battery())
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

#this is for non object recognition
#we will assume that all plants are placed equal lengths away from eachother
#plant 1 will be diagonally placed to the drone mission pad.
#mission pad location is 0,0,0,0
#[] [] []
#[] [] []
#[] [] [] [<]
#
me.move_forward(10)


# for grids of 1x1
if len(plantGrid[0]) == 1:
    takePicture(0,0)
    me.move_back(10)

# for grids of 2x2
if len(plantGrid[0]) == 2:
    # first row
    takePicture(0, 0)
    me.move_right(20)
    takePicture(0, 1)
    me.move_right(15)
    # get to second row
    me.move_forward(20)
    me.move_left(15)
    # second row
    takePicture(1, 2)
    me.move_left(20)
    takePicture(1, 1)
    me.move_left(20)
    # return to pad
    me.move_back(30)
    me.move_right(5)

# for grids of 3x3
if len(plantGrid[0]) == 3:
    #first row
    takePicture(0,0)
    me.move_right(20)
    takePicture(0, 1)
    me.move_right(20)
    takePicture(0, 2)
    #get to second row
    me.move_right(15)
    me.move_forward(20)
    me.move_left(15)
    #second row
    takePicture(1, 2)
    me.move_left(20)
    takePicture(1, 1)
    me.move_left(20)
    takePicture(1, 0)
    me.move_left(20)
    #get to third row
    me.move_forward(20)
    me.move_right(20)
    #third row
    takePicture(2, 0)
    me.move_right(20)
    takePicture(2, 1)
    me.move_right(20)
    takePicture(2, 2)
    #return to pad
    me.move_right(20)
    me.rotate_clockwise(180)
    me.move_forward(45)
    me.rotate_clockwise(90)
    me.move_forward(55)

# for grids of 4x4
elif len(plantGrid[0]) == 4:
    # first row
    takePicture(0, 0)
    me.move_right(20)
    takePicture(0, 1)
    me.move_right(20)
    takePicture(0, 2)
    me.move_right(20)
    takePicture(0, 3)
    # get to second row
    me.move_right(15)
    me.move_forward(20)
    me.move_left(15)
    # second row
    takePicture(1, 3)
    me.move_left(20)
    takePicture(1, 2)
    me.move_left(20)
    takePicture(1, 1)
    me.move_left(20)
    takePicture(1, 0)
    me.move_left(20)
    # get to third row
    me.move_forward(20)
    me.move_right(20)
    # third row
    takePicture(2, 0)
    me.move_right(20)
    takePicture(2, 1)
    me.move_right(20)
    takePicture(2, 2)
    me.move_right(20)
    takePicture(2, 3)
    # move to fourth row
    me.move_right(20)
    me.move_forward(20)
    me.move_left(20)
    # fourth row
    takePicture(3, 3)
    me.move_left(20)
    takePicture(3, 2)
    me.move_left(20)
    takePicture(3, 1)
    me.move_left(20)
    takePicture(3, 0)
    me.move_left(20)
    # return to pad
    me.rotate_clockwise(180)
    me.move_forward(75)
    me.rotate_counter_clockwise(90)
    me.move_forward(10)

# for grids of 5x5
elif len(plantGrid[0]) == 5:
    # first row
    takePicture(0, 0)
    me.move_right(20)
    takePicture(0, 1)
    me.move_right(20)
    takePicture(0, 2)
    me.move_right(20)
    takePicture(0, 3)
    me.move_right(20)
    takePicture(0, 4)
    # get to second row
    me.move_right(15)
    me.move_forward(20)
    me.move_left(15)
    # second row
    takePicture(1, 4)
    me.move_left(20)
    takePicture(1, 3)
    me.move_left(20)
    takePicture(1, 2)
    me.move_left(20)
    takePicture(1, 1)
    me.move_left(20)
    takePicture(1, 0)
    me.move_left(20)
    # get to third row
    me.move_forward(20)
    me.move_right(20)
    # third row
    takePicture(2, 0)
    me.move_right(20)
    takePicture(2, 1)
    me.move_right(20)
    takePicture(2, 2)
    me.move_right(20)
    takePicture(2, 3)
    me.move_right(20)
    takePicture(2, 4)
    # move to fourth row
    me.move_right(20)
    me.move_forward(20)
    me.move_left(20)
    # fourth row
    takePicture(3, 4)
    me.move_left(20)
    takePicture(3, 3)
    me.move_left(20)
    takePicture(3, 2)
    me.move_left(20)
    takePicture(3, 1)
    me.move_left(20)
    takePicture(3, 0)
    me.move_left(20)
    # move to fifth row
    me.move_forward(20)
    me.move_right(20)
    # fifth row
    takePicture(4, 0)
    me.move_right(20)
    takePicture(4, 1)
    me.move_right(20)
    takePicture(4, 2)
    me.move_right(20)
    takePicture(4, 3)
    me.move_right(20)
    takePicture(4, 4)
    # return to pad
    me.move_right(20)
    me.rotate_clockwise(180)
    me.move_forward(90)
    me.rotate_clockwise(90)
    me.move_forward(85)

#land on mission pad
me.go_xyz_speed_mid(0,0,0,0,1)