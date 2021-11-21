/* eslint-disable no-unused-vars */
require("dotenv").config({ path: `.env.local` });
import db from "./index";
import { start } from "ottoman";
import {
  Cluster,
  connect,
  DurabilityLevel,
  BucketType,
  CompressionMode,
  EvictionPolicy,
  ConflictResolutionType,
} from "couchbase";
import Models from "../models/index";
const { UserProfile } = Models;

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
  if (!process.argv.includes("--yes-destroy-all-my-data")) {
    const ans: string =
      await askQuestion(`Seeding the database will DESTROY EVERYTHING !!! DO NOT DO THIS TO A PRODUCTION DATABASE !!!
        This will create dummy data, are you sure?? (TYPE: 'YES' to continue): `);
    if (ans.toLowerCase() != "yes") {
      console.log("Safe Choice! BYE!");
      exit(0);
    }
  }

  console.log("Starting DB Seed...");
  try {
    // eslint-disable-next-line react-redux/connect-prefer-named-arguments
    const cnx: Cluster = await connect(
      process.env.COUCHBASE_CONNECTION as string,
      {
        username: process.env.COUCHBASE_USER,
        password: process.env.COUCHBASE_PW,
      }
    );
    try {
      console.log("Attempting to drop travel-sample if it exists");
      await cnx.buckets().dropBucket("travel-sample" as string);
    } catch (e) {
      console.log(
        "No travel-sample to Drop... continuing to create new bucket..."
      );
    }
    try {
      console.log("Attempting to drop bucket if it exists");
      await cnx.buckets().dropBucket(process.env.COUCHBASE_BUCKET as string);
    } catch (e) {
      console.log("No Bucket to Drop... continuing to create new bucket...");
    }
    console.log("Bucket Deleted... waiting a few seconds for cleanup");
    console.log("Creating a new bucket: " + process.env.COUCHBASE_BUCKET);
    await cnx.buckets().createBucket({
      conflictResolutionType: ConflictResolutionType.SequenceNumber,
      ejectionMethod: EvictionPolicy.ValueOnly,
      name: process.env.COUCHBASE_BUCKET as string,
      flushEnabled: false,
      ramQuotaMB: 500,
      numReplicas: 1,
      replicaIndexes: false,
      bucketType: BucketType.Couchbase,
      evictionPolicy: EvictionPolicy.ValueOnly,
      maxExpiry: 0,
      compressionMode: CompressionMode.Passive,
      minimumDurabilityLevel: DurabilityLevel.None,
      maxTTL: 0,
      durabilityMinLevel: "none",
    });
    await cnx.close();
    console.log("Forcing a 5 second Pause to let the bucket get setup");
    await wait(5000);
    const otCnx = await db.connect();
    console.log("Ensuring Collections");
    console.log(otCnx.getCollection("UserProfile"));
    await otCnx.ensureCollections();
    console.log(
      "collections should be done... the line before Ensuring Indexes should be blank"
    );
    console.log(" ");
    console.log("Ensuring Indexes...");
    await otCnx.ensureIndexes();
    // await start();
    // const user = new UserModel({ email: "asdf" });
    // await user.save();
    // const account = new AccountModel({ user });
    // await account.save();
    // user.accounts = user.accounts ? [...user.accounts, account] : [account];
    // user.save();
    // const session = new SessionModel({ user });
    // await session.save();
    // const verify = new VerificationTokenModel({ token: "asdf" });
    // await verify.save();
    console.log("CREATING DUMMY USER PROFILE...");
    const newUser = new UserProfile({
      userid: "test",
      firstName: "Zachary",
      lastName: "Lankton",
      username: "zachlankton",
      phone: "321-4567",
      email: "test@example.com",
    });
    console.log("SAVING DUMMY USER PROFILE...");
    await newUser.save();
    console.log(newUser);
  } catch (e) {
    console.error(e);
  }

  exit(0);
};

function wait(n: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, n);
  });
}

seed();
