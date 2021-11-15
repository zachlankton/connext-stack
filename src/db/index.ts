import { getDefaultInstance, Ottoman, SearchConsistency } from "ottoman";

console.log("setting up db...");
const ottoman =
  getDefaultInstance() ||
  new Ottoman({
    consistency: SearchConsistency.LOCAL,
  });

export { ottoman };

const db = {
  connect: async () => {
    console.log("connecting to db...");
    return await ottoman.connect({
      connectionString: process.env.COUCHBASE_CONNECTION as string,
      bucketName: process.env.COUCHBASE_BUCKET as string,
      username: process.env.COUCHBASE_USER as string,
      password: process.env.COUCHBASE_PW as string,
    });
  },
};

export default db;
