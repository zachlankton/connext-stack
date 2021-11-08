import { Ottoman } from "ottoman";

console.log("setting up db...");
const cnxStr = "couchbase://localhost/mmp@Administrator:1234567890";
const ottoman = new Ottoman();

const db = {
  connect: async () => {
    console.log("connecting to db...");
    return await ottoman.connect(cnxStr);
  },
};

export default db;
