## <img src="https://github.com/BC-CapstoneProjects/22-GardenMonitoring/blob/integration/assets/logo4.PNG" width="200" height="200" alt="logo-thumbnail"> <a href="https://github.com/BC-CapstoneProjects/22-GardenMonitoring/wiki">Read the wiki here</a>

![poster](https://github.com/BC-CapstoneProjects/22-GardenMonitoring/blob/integration/assets/Autonomous%20Garden%20Monitoring%20(2).svg)<br>

### AGM is an innovative IoT solution committed to ensuring the health and vitality of your garden. By employing the capabilities of an autonomous drone, we are able to capture images of your garden and provide expert plant health analysis.

#### Our user-friendly interface allows you to navigate with ease, offering a personalized view of the wellness of individual plants and a holistic view of your garden's overall health. If a plant is identified as diseased, you'll receive immediate alerts, coupled with actionable advice based on the specific ailment detected.

#### In addition, AGM takes the mystery out of gardening by advising you on the optimal conditions necessary to keep each type of plant in your garden thriving. By harnessing the power of IoT and our autonomous garden monitoring system, we empower you to become the confident and knowledgeable gardener you aspire to be.

<Project Set Up GUIDELINE>

----------------------------Before you start--------------------------

Git Guideline 

<How to disconnect my local project from from current remote branch>:
1.git remote remove origin
2.git remote -v

<How to connect my local project to new remote git branch>:
git remote add origin https://github.com/BC-CapstoneProjects/22-GardenMonitoring.git
git checkout -b integration
git add .
git commit -m "integration"
git push -u origin integration


-Choose your option-

<How to connect my exisitng local project to new remote git branch>:
git remote add origin https://github.com/BC-CapstoneProjects/22-GardenMonitoring.git
git checkout -b integration

OR

<How to clone entire project>:
git clone https://github.com/BC-CapstoneProjects/22-GardenMonitoring.git -b integration

-------------------------------Project Set up--------------------------

<Api>

1)cd \22-GardenMonitoring\api> 
2) npm install debug
3) npm start



<React>

cd 22-GardenMonitoring\Autonomous-Garden-Monitor>


1)npm install --legacy-peer-deps
2)npm install -g @aws-amplify/cli

3)amplify configure
region:  us-west-2
accessKeyId:  **
secretAccessKey:  **
This would update/create the AWS Profile in your local machine
? Profile Name:  agm  (any name you want)

4) amplify init
Note: run this command from the root of your app directory (22-GardenMonitoring\Autonomous-Garden-Monitor>)
? Enter a name for the environment: agm (any name you want)
? Choose your default editor: Visual Studio Code
? Select the authentication method you want to use: AWS profile
? Please choose the profile you want to use: agm(choose your environment)

√ Select the User Pool you want to import: agm (select agm!)
Deployment completed.

5) amplify push 


-------Project Set up Completed-------

Now try to run "npm start"                          
=======
 ### Read the wiki here: [AGM-Wiki](https://github.com/BC-CapstoneProjects/22-GardenMonitoring/wiki)
<b>Summary</b>: Autonomous Garden Monitoring is software being developed for use with the DJI Tello drone and SDK.  Our mission is to help farmers and avid gardeners avoid losing crops. We do this by stopping Plant Diseases at its roots.  Utilizing autonomous flight and ML, our system gives alerts when plant health is decreasing due to lack of water, sun, or nutrients. The AGM Drone is made to be a vital part of your garden’s ecosystem, to improve the quality and quantity of plants.
>>>>>>> 754d0ef (Update README.md)
