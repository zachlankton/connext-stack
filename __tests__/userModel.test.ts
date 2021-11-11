import { beforeAll, afterAll, expect } from "@jest/globals";

import db from "@/db/index";
import { start, close } from "ottoman";
import Models from "@/models/index";
const { UserProfile } = Models;

beforeAll(async () => {
  await db.connect();
  await start();
});

afterAll(async () => {
  await close();
});

describe("User Model Tests", () => {
  it("fails without userid set", async () => {
    const newUser = new UserProfile({
      //userid: "test",
      firstName: "Zachary",
      lastName: "Plankton",
      username: "zachPlankton",
      phone: "123-4516",
      email: "test@example.com",
    });

    expect.assertions(1);
    try {
      await newUser._validate();
    } catch (e: any) {
      expect(e.message).toMatch("Property 'userid' is required");
    }
  });

  it("fails with userid set to empty string", async () => {
    const newUser = new UserProfile({
      userid: "",
      firstName: "Zachary",
      lastName: "Plankton",
      username: "zachPlankton",
      phone: "123-4516",
      email: "test@example.com",
    });

    expect.assertions(1);
    try {
      await newUser._validate();
    } catch (e: any) {
      expect(e.message).toMatch("Property 'userid' is required");
    }
  });

  it("fails without email set", async () => {
    const newUser = new UserProfile({
      userid: "test",
      firstName: "Zachary",
      lastName: "Plankton",
      username: "zachPlankton",
      phone: "123-4516",
      //email: "test@example.com",
    });

    expect.assertions(1);
    try {
      await newUser._validate();
    } catch (e: any) {
      expect(e.message).toMatch("Property 'email' is required");
    }
  });

  it("invalid email fails", async () => {
    const newUser = new UserProfile({
      userid: "test",
      firstName: "Zachary",
      lastName: "Plankton",
      username: "zachPlankton",
      phone: "123-4516",
      email: "testexample.com",
    });

    expect.assertions(1);
    try {
      await newUser._validate();
    } catch (e: any) {
      expect(e.message).toMatch("Email Address is not valid!");
    }
  });

  it("invalid phone fails", async () => {
    const newUser = new UserProfile({
      userid: "test",
      firstName: "Zachary",
      lastName: "Plankton",
      username: "zachPlankton",
      phone: "67-4516",
      email: "test@example.com",
    });

    expect.assertions(1);
    try {
      await newUser._validate();
    } catch (e: any) {
      expect(e.message).toMatch("Phone Number is Invalid!");
    }
  });

  it("phone number can be blank", async () => {
    const newUser = new UserProfile({
      userid: "test",
      firstName: "Zachary",
      lastName: "Plankton",
      username: "zachPlankton",
      email: "test@example.com",
    });

    expect.assertions(1);
    try {
      await newUser._validate();
    } catch (e: any) {
      // console.log(e.message);
    }
    expect(newUser.phone).toBeUndefined();
  });

  it("can save new user (needs database)", async () => {
    const newUser: any = new UserProfile({
      userid: "test",
      firstName: "Zachary",
      lastName: "Plankton",
      username: "zachPlankton",
      phone: "123-4516",
      email: "test@example.com",
    });

    expect.assertions(1);
    try {
      await newUser.save();
    } catch (e: any) {
      // console.log(e.message);
    }
    expect(newUser._getId()).toMatch(newUser.userid);
  });

  it("can create a second user in the db", async () => {
    const newUser: any = new UserProfile({
      userid: "test2",
      firstName: "Shalary",
      lastName: "Menoduno",
      username: "ShalaryMenoduno",
      phone: "517-456-1234",
      email: "shal@menoduno.com",
    });

    expect.assertions(1);
    try {
      await newUser.save();
    } catch (e: any) {
      // console.log(e.message);
    }
    expect(newUser._getId()).toMatch(newUser.userid);
  });

  it("can fetch user from db", async () => {
    expect.assertions(1);
    let user: any = {};
    try {
      user = await UserProfile.findById("test");
    } catch (e: any) {
      // console.log(e.message);
    }
    expect(user.firstName).toMatch("Zachary");
  });

  it("can find all records", async () => {
    expect.assertions(1);
    let users: any = {};
    try {
      users = await UserProfile.find();
    } catch (e: any) {
      // console.log(e.message);
    }
    // console.log(users);
    expect(users.meta.metrics.resultCount).toBe(2);
  });

  it("can remove all records", async () => {
    expect.assertions(1);
    let users: any = {};
    try {
      users = await UserProfile.removeMany();
    } catch (e: any) {
      // console.log(e.message);
    }
    expect(users.message.success).toBe(2);
  });
});
