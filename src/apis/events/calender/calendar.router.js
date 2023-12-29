import express from "express";
import { ScheduleEventController } from "./calender.controller.js";

export const CalendarRouter = express.Router();
CalendarRouter.post("/eventcreate", ScheduleEventController);
