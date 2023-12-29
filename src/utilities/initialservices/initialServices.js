import fs from "fs";
import { User } from "../schemas/users.js";
import { createSingleRecord } from "../db/dbwrapper.js";

export const path = `${process.cwd()}/uploads/`;

export const makeDirectories = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

export const seedServive = async () => {
  const FirstAdmin = {
    fullName: "Vikas",
    userId: "VikasT581",
    password: "$2a$10$m7SIm2zVkw.ONRgMWUEWZOimXGZ8DDk4wFwZihl230.98bZigF.bG",
    role: "manager",
    isDisabled: false,
  };
  try {
    const user = await createSingleRecord(User, FirstAdmin);

    console.log(`Document inserted with _id: ${user.resultSet}`);
  } catch (err) {
    console.log(err);
  }
};

export const initalServicesInit = () => {
  makeDirectories(path);
  seedServive();
};
