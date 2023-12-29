import {
  formatToRFC3339,
  insertEvent,
} from "../../../services/googlecalender/calender.js";
import { sendEmail } from "../../../services/nodemailer/sendEmail.js";
import {
  BAD_REQUEST,
  SERVER_ERROR,
  SUCCESS,
} from "../../../utilities/constants/http-constants.js";

export const ScheduleEventController = async (req, res) => {
  const { eventStartAt, eventClosesAt, emailId } = req.body;

  try {
    console.log("start");
    if (eventStartAt && eventClosesAt && emailId) {
      const dateTime = {
        start: formatToRFC3339(eventStartAt),
        end: formatToRFC3339(eventClosesAt),
      };
      console.log(dateTime, 1);
      // Event Summary for Google Calendar
      let event = {
        summary: `this is a test event by Node.`,
        description: `i integrated Calender API with node.`,
        start: {
          dateTime: dateTime["start"],
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: dateTime["end"],
          timeZone: "Asia/Kolkata",
        },
      };
      const isEventCreated = await insertEvent(event);

      console.log(isEventCreated, 2);

      if (isEventCreated) {
        const emailBody = `An Event has been created for you from ${eventStartAt}to ${eventClosesAt} please let us know if you will join`;

        await sendEmail(emailId, "Event Created for you", emailBody);
        // schedule calender event

        return res.status(SUCCESS).json({
          eventStartAt,
          eventClosesAt,
          emailId,
          message: "Event Created",
        });
      }
      return res
        .status(BAD_REQUEST)
        .json({ message: "Toruble creating calender event " });
    }

    return res.status(BAD_REQUEST).json({ message: "Invalid Request" });
  } catch (error) {
    console.log(error);
    res.status(SERVER_ERROR).json({ error });
  }
};
