import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CALENDER_CREDENTIALS);
const calendarId = process.env.CALENDER_ID;

// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = "+05:30";

// Insert new event to Google Calendar
export const insertEvent = async (event) => {
  try {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event,
    });

    if (response["status"] == 200 && response["statusText"] === "OK") {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at insertEvent, ${error}`);
    return 0;
  }
};
// change date format
export function formatToRFC3339(dateString) {
  const dateObject = new Date(dateString);
  dateObject.setHours(dateObject.getHours() + 5);
  dateObject.setMinutes(dateObject.getMinutes() + 30);
  return dateObject.toISOString();
}
