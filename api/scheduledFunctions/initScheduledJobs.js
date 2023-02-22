import CronJob from 'node-cron';
import fetch from 'node-fetch';


export const initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule("*/1 * * * *", async function() {
    console.log("Downloading garden images");
    const response = await fetch('http://localhost:9000/getImage');
    const body = await response.json();
    console.log('End of get garden images cron function', body);
  });

  scheduledJobFunction.start();
}