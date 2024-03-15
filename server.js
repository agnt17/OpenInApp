import connectDB from "./db/mongoDB.js";
import { app } from "./app.js";
import cron from "node-cron";
import { updateTaskPriority } from "./cron_functionality/task_priority_cron.js";
cron.schedule("0 0 * * *", updateTaskPriority);
app.get("/", (req, res) => {
  res.send("hey!");
});
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
