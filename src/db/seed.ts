require("dotenv").config({ path: `.env.local` });
import db from "./index";
import { start } from "ottoman";
import Models from "../models/index";
const { User } = Models;
import { exit } from "process";
import readline from "readline";

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

const seed = async () => {
  const ans: string =
    await askQuestion(`Seeding the database will DESTROY EVERYTHING !!! DO NOT DO THIS TO A PRODUCTION DATABASE !!!
        This will create dummy data, are you sure?? (TYPE: 'YES' to continue): `);
  if (ans.toLowerCase() != "yes") {
    console.log("Safe Choice! BYE!");
    exit();
  }

  console.log("Starting DB Seed...");
  try {
    await db.connect();
    await start();
    await User.removeMany();
    const newUser = new User({
      userid: "test",
      firstName: "Zachary",
      lastName: "Lankton",
      username: "zachlankton",
      phone: "667-4516",
      email: "zach@mmpmg.com",
    });
    await newUser.save();
    console.log(newUser);
  } catch (e) {
    console.error(e);
  }

  exit();
};

seed();