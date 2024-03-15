
import cron from "node-cron";
import twilio from "twilio";
import { Task } from "./models/task.model.js";
import { User } from "./models/user.model.js";


const accountSid = 'TWILIO_ACCOUNT_SID';
const authToken = 'TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

const initiateVoiceCall = async (userPhoneNumber) => {
  try {
    await client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: userPhoneNumber,
      from: 'TWILIO_PHONE_NUMBER',
    });
    console.log(`Voice call initiated to ${userPhoneNumber}`);
  } catch (error) {
    console.error(`Error initiating voice call: ${error.message}`);
  }
};

cron.schedule('0 0 * * *', async () => {
  try {
    const overdueTasks = await Task.find({ due_date: { $lt: new Date() }, status: "TODO" });

    for (const task of overdueTasks) {
      const users = await User.find({ priority: task.priority }).sort('priority');

      for (const user of users) {
        await initiateVoiceCall(user.phoneNumber);
        break;
      }
    }
  } catch (error) {
    console.error(`Error in cron job: ${error.message}`);
  }
});
