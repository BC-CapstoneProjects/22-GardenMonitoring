"""
Tech-Talk : Autonomous Garden Monitoring (AGM)
Capstone (CS481), Fall, 10-19-2022, Bellevue College, Prof : Sara Farag
Group 7 : Charles Biffin, Hyungmin Jeon, Tedros Tsegay, Ben Van Cise
"""
import os
from os import path
import cv2, time
from djitellopy import Tello

# initialize Tello
tello = Tello()

# establish udp connection
if not tello.connect():
    tello.connect()

# set some stuff... can't get this to work yet :(
# tello.set_video_bitrate(Tello.BITRATE_5MBPS)
# tello.set_video_resolution(Tello.RESOLUTION_720P)
# tello.set_video_fps(Tello.FPS_30)

# turn on video stream for front-facing camera
tello.streamon()

# take off and print some state-data, capture an image of jared (he's a little over 4ft), land
tello.takeoff()
while(tello.get_height() != 70):
    time.sleep(0.5)
    #os.system('cls')
    print("Battery @ ",tello.get_battery(), "%")
    print("Temperature = ",tello.get_temperature())
    print("Barometric pressure = ",tello.get_barometer())
    print("Height = ",tello.get_height())
    print("Pitch =",tello.get_pitch())
    print("Roll =",tello.get_roll())
    print("Yaw =",tello.get_yaw())
    #move() range must be between 20 and 500
    if (tello.get_height() > 70):
        tello.move_down(tello.get_height()-20)
    elif(tello.get_height() < 70):
        tello.move_up(tello.get_height()+20)

#final printout of state after exiting loop
print("Battery @ ",tello.get_battery(), "%")
print("Temperature = ",tello.get_temperature())
print("Barometric pressure = ",tello.get_barometer())
print("Height = ",tello.get_height())
print("Pitch =",tello.get_pitch())
print("Roll =",tello.get_roll())
print("Yaw =",tello.get_yaw())
time.sleep(2)
frame_read = tello.get_frame_read()
# capture image
cv2.imwrite("jared_giraffe.png", frame_read.frame)
# check if image is written
if(path.isfile('C:/Users/benva/PycharmProjects/Tello/jared_giraffe.png')):
    print("=============LANDING==============")
    print("||  Image successfully captured! ||")
    print("==================================")
#cv2.waitKey(1000)
tello.land()
tello.streamoff()

print("==========LANDED==============")
exit()