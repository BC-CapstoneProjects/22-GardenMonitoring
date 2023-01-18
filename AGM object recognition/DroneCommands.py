# this is sudo for the order of operations that our drone will take

# drone will take off from pad.

# drone will look for nearest plant.
# or it will have the coordinantes of the first plant to scan
fun takeOff(){
    leave pad and obtain predetermined hight
    go to predetermined plant or use object detection to find it
}

# it will use object recognition to detect that it is looking at a plant
# it will take a picutre of the plant from a predetermined/consistant height
fun takePicture(){
    take picture and send it back to computer through wifi connection so it can be sent to the database
}

# based on the grid that was given by the user, the drone will go to the next plant in the row
# we can either use the object recogntion to find the plant,
# or we can have a predetermined spacing between the plants
grid array[][]= import grid from app
#3x3
[]  []  []
[]  []  []
[]  []  []
          [pad]

fun nextPlant(){
    #maybe a for loop would work for this. setting it to the row length
    go to next plant in row
    takePicture()
    if(no more in current row){
        start on next row
        if(last row){
            go back to landing pad
        }
    }
}