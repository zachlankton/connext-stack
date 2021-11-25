/* eslint-disable no-unused-vars */
require("dotenv").config({ path: `.env.local` });
import db, { ottoman, connectionOptions } from "./index";
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
import CouchbaseAdapter from "next-auth-couchbase-adapter";

import { exit } from "process";
import readline from "readline";
import { Ottoman } from "ottoman";

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
  await confirm();

  console.log("Starting DB Seed...");
  try {
    const cnx: Cluster = await couchConnect();
    await tryDropBucket(cnx, "travel-sample");
    await tryDropBucket(cnx, process.env.COUCHBASE_BUCKET as string);
    await createBucket(cnx);

    const otCnx = await db.connect();
    await setupNextAuthModels(otCnx);
    console.log("Ensuring Collections...");
    await otCnx.ensureCollections();
    console.log("Ensuring Indexes...");
    await otCnx.ensureIndexes();
    console.log("All Collections and Indexes are ready!");
  } catch (e) {
    console.error(e);
  }

  exit(0);
};

async function confirm() {
  if (!process.argv.includes("--yes-destroy-all-my-data")) {
    const ans: string =
      await askQuestion(`Seeding the database will DESTROY EVERYTHING !!! DO NOT DO THIS TO A PRODUCTION DATABASE !!!
        This will create dummy data, are you sure?? (TYPE: 'YES' to continue): `);
    if (ans.toLowerCase() != "yes") {
      console.log("Safe Choice! BYE!");
      exit(0);
    }
  }
  await wait(10);
}

async function couchConnect() {
  // eslint-disable-next-line react-redux/connect-prefer-named-arguments
  return await connect(process.env.COUCHBASE_CONNECTION as string, {
    username: process.env.COUCHBASE_USER,
    password: process.env.COUCHBASE_PW,
  });
}

async function tryDropBucket(cnx: any, bucketName: string) {
  try {
    console.log(`Attempting to drop ${bucketName} if it exists`);
    await cnx.buckets().dropBucket(bucketName as string);
  } catch (e: any) {
    if (e.message === "bucket not found") {
      console.log(`No ${bucketName} to Drop... continuing...`);
    } else {
      throw new Error(e);
    }
  }
}

async function createBucket(cnx: any) {
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
}

async function setupNextAuthModels(otCnx: Ottoman) {
  const nextAuthAdapter = CouchbaseAdapter({
    instance: otCnx,
    ...connectionOptions,
  });
  // running a function in the adapter to force bootstrapping models
  try {
    await nextAuthAdapter.getUser("");
  } catch (e: any) {
    if (e.message === "doc not found" || e.message.includes("timeout")) {
      console.log("continuing...");
    } else {
      throw new Error(e);
    }
  }
}

function wait(n: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, n);
  });
}

seed();
