import express from "express";
import cors from "cors";

import bodyParser from "body-parser";
import { CalendarRouter } from "./apis/events/calender/calendar.router.js";

const app = express();

const port = 5000;
app.use(bodyParser.json());
app.use(cors());

//  routes

app.use("/calendar", CalendarRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
