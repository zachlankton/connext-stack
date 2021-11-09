import { Ottoman, SearchConsistency } from "ottoman";

console.log("setting up db...");
console.log(process.env);
const cnxStr = process.env.COUCHBASE_CONNECTION as string;
const ottoman = new Ottoman({
  consistency: SearchConsistency.LOCAL,
});

const db = {
  connect: async () => {
    console.log("connecting to db...");
    return await ottoman.connect(cnxStr);
  },
};

export default db;
