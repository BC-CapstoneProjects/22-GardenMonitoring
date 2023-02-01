This is documentation for the code in this project.
BasicMovements.py - this is for non object recognition scanning of plants. it accounts for grid sizes from 1x1 to 5x5. all plants will be equally
spaced from eachother and the drone will maintain a consistant height. this will improve getting metrics of growth since we will have pictures of the plants
that were taking from the exact same spot every time. 

DroneCommands.py - this is code for implementing the object recognition. placed the object recognition into a function, but it gets stuck in an infinate loop

Tello_OBJ-Recognition.py - code i found on youtube that will help with object recognition. might build our code on it, or take pieces of it and place into DroneCommands.py
made modifications to the code to see if it was possible to command the drone to go toward an object it recognizes. does not seem possible without making our own
object recognition format. the x and y coordinates received from the loop are not consistant, so building a function to keep track of the plants already visited would
be impossible without having qr codes on each pot so that we can differentiate them. the best course of action is to use the BasicMovements.py because it will give
us the best consistancy.