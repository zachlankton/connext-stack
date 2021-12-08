import { beforeAll, afterAll, expect } from "@jest/globals";

import db from "@/db/index";
import { close } from "ottoman";
import Models from "@/models/index";
const { UserProfile } = Models;

beforeAll(async () => {
  await db.connect();
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
    });

    expect.assertions(1);
    try {
      await newUser._validate();
    } catch (e: any) {
      expect(e.message).toMatch("Property 'userid' is required");
    }
  });

  it("invalid email fails", async () => {
    const newUser = new UserProfile({
      userid: "test",
      firstName: "Zachary",
      lastName: "Plankton",
      username: "zachPlankton",
      phone: "123-4516",
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
      userid: "test@test.com",
      firstName: "Zachary",
      lastName: "Plankton",
      username: "zachPlankton",
    });

    expect.assertions(1);

    await newUser._validate();

    expect(newUser.phone).toBeUndefined();
  });

  it("can save new user (needs database)", async () => {
    const newUser: any = new UserProfile({
      userid: "test@test.com",
      firstName: "Zachary",
      lastName: "Plankton",
      username: "zachPlankton",
      phone: "123-4516",
    });

    expect.assertions(1);

    await newUser.save(true);

    expect(newUser._getId()).toMatch(newUser.userid);
  });

  it("cannot create a user with duplicate email", async () => {
    const newUser: any = new UserProfile({
      userid: "test@test.com",
      firstName: "Shalary",
      lastName: "Menoduno",
      username: "ShalaryMenoduno",
      phone: "517-456-1234",
    });

    expect.assertions(1);
    try {
      await newUser.save(true);
    } catch (e: any) {
      expect(e.message).toMatch("document exists");
    }
  });

  it("can create a second user in the db", async () => {
    const newUser: any = new UserProfile({
      userid: "test2@test.com",
      firstName: "Shalary",
      lastName: "Menoduno",
      username: "ShalaryMenoduno",
      phone: "517-456-1234",
    });

    expect.assertions(1);

    await newUser.save(true);

    expect(newUser._getId()).toMatch(newUser.userid);
  });

  it("can fetch user from db", async () => {
    expect.assertions(1);
    let user: any = {};

    user = await UserProfile.findById("test@test.com");

    expect(user.firstName).toMatch("Zachary");
  });

  it("can find all records", async () => {
    expect.assertions(1);
    let users: any = {};

    users = await UserProfile.find();

    expect(users.meta.metrics.resultCount).toBe(2);
  });

  it("can remove all records", async () => {
    expect.assertions(1);
    let users: any = {};

    users = await UserProfile.removeMany();
    expect(users.message.success).toBe(2);
  });
});
