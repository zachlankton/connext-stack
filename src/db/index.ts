import { getDefaultInstance, Ottoman, SearchConsistency } from "ottoman";
// eslint-disable-next-line no-unused-vars
import Models, { UserProfile } from "@/models/index";

console.log("setting up db...");
const ottoman =
  getDefaultInstance() ||
  new Ottoman({
    consistency: SearchConsistency.LOCAL,
  });

export type modelsType = { [key: string]: any };
const models: modelsType = ottoman.models;

export { ottoman, models };

const connectionOptions = {
  connectionString: process.env.COUCHBASE_CONNECTION as string,
  bucketName: process.env.COUCHBASE_BUCKET as string,
  username: process.env.COUCHBASE_USER as string,
  password: process.env.COUCHBASE_PW as string,
};
export { connectionOptions };

const db = {
  connect: async () => {
    console.log("connecting to db...");
    return await ottoman.connect(connectionOptions);
  },
};
export default db;
