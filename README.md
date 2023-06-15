![poster](https://github.com/BC-CapstoneProjects/22-GardenMonitoring/blob/integration/assets/Autonomous%20Garden%20Monitoring%20(2).svg)<br><br><br>
<img src="https://github.com/BC-CapstoneProjects/22-GardenMonitoring/blob/integration/assets/logo4.PNG" width="200" height="200" alt="logo-thumbnail">
<b>Summary</b>: Autonomous Garden Monitoring is software being developed for use with the DJI Tello drone and SDK.  Our mission is to help farmers and avid gardeners avoid losing crops. We do this by stopping Plant Diseases at its roots.  Utilizing autonomous flight and ML, our system gives alerts when plant health is decreasing due to lack of water, sun, or nutrients. The AGM Drone is made to be a vital part of your garden’s ecosystem, to improve the quality and quantity of plants. <br>

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
