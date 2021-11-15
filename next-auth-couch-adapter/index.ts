import {
  getDefaultInstance,
  Ottoman,
  model,
  Schema,
  ModelTypes,
  SearchConsistency,
} from "ottoman";
import { Adapter } from "next-auth/adapters";
import { ConnectOptions } from "ottoman/lib/types/ottoman/ottoman";

export interface collectionNames {
  User?: string;
  Account?: string;
  Session?: string;
  VerificationToken?: string;
}

export interface adapterOptions extends ConnectOptions {
  ensureCollections?: boolean;
  ensureIndexes?: boolean;
  collectionNames?: collectionNames;
}

interface sessionProps {
  sessionToken: string;
  userId?: string;
  expires?: Date;
}

const UserSchema = new Schema({
  name: String,
  email: String,
  emailVerified: Schema.Types.Date,
  image: String,
});

UserSchema.index.findByEmail = {
  by: "email",
  type: "n1ql",
};

const AccountSchema = new Schema({
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  oauth_token_secret: String,
  oauth_token: String,
  session_state: String,
});

const SessionSchema = new Schema({
  expires: Schema.Types.Date,
  sessionToken: String,
});
SessionSchema.index.findBySessionToken = {
  by: "sessionToken",
  type: "n1ql",
};

// const UserVerifcationSchema = new Schema({
//   token: String,
//   expires: Schema.Types.Date,
//   identifier: String,
// });

let modelsNeedSetup = true;
let UserModel: ModelTypes;
let AccountModel: ModelTypes;
let SessionModel: ModelTypes;
//let VerificationTokenModel: ModelTypes;

/** @return { import("next-auth/adapters").Adapter } */
export default function MyAdapter(options: adapterOptions): Adapter {
  const collectionNames: collectionNames = {
    User: "User",
    Account: "UserAccount",
    Session: "UserSession",
    VerificationToken: "UserVerificationToken",
    ...options.collectionNames,
  };

  async function getInstance() {
    const ot_opts = { consistency: SearchConsistency.LOCAL };
    const db =
      getDefaultInstance() || (await new Ottoman(ot_opts).connect(options));
    modelsNeedSetup && (await setupModels(db));
  }

  async function setupModels(db: Ottoman) {
    console.log("Setting up Next Auth Couchbase/Ottoman Models");
    const models: { [key: string]: any } = getDefaultInstance().models;
    const { User, Account, Session } = collectionNames;

    // Add Model Relationships
    UserSchema.add({
      accounts: [{ type: AccountSchema, ref: Account! }],
    });
    AccountSchema.add({ user: { type: UserSchema, ref: User! } });
    SessionSchema.add({ user: { type: UserSchema, ref: User! } });

    AccountModel = models[Account!] || model(Account!, AccountSchema);
    UserModel = models[User!] || model(User!, UserSchema);
    SessionModel = models[Session!] || model(Session!, SessionSchema);

    // const VerificationTokenModel =
    //   models.[VerificationToken!] ||
    //   model(VerificationToken!, UserVerifcationSchema);
    options.ensureCollections && (await db.ensureCollections());
    options.ensureIndexes && (await db.ensureIndexes());
    if (options.ensureCollections || options.ensureIndexes)
      console.warn(
        "WARNING: Do not use `ensureCollections` or `ensureIndexes` in production"
      );
    modelsNeedSetup = false;
    console.log("Next Auth Model Setup Completed Successfully!");
  }

  return {
    async createUser(user) {
      await getInstance();
      const newUser = new UserModel(user);
      const res = await newUser.save();
      return res;
    },

    async getUser(id: string) {
      await getInstance();
      const res = await UserModel.findById(id);
      return res;
    },

    async getUserByEmail(email) {
      await getInstance();
      const res = (await UserModel.findByEmail(email)).rows[0] || null;
      return res;
    },

    async getUserByAccount(provider) {
      await getInstance();
      const res = await AccountModel.findOne(provider, {
        populate: "user",
      }).catch((reason: any) => {
        if (reason.message === "document not found") return null;
        throw new Error(reason);
      });
      return res?.user || null;
    },

    async updateUser(user: any) {
      await getInstance();
      const res = await UserModel.findOneAndUpdate({ id: user.id }, user);
      return res;
    },

    // TODO (Will be required in a future release of next/auth):
    // async deleteUser(userId) {
    //   return;
    // },

    async linkAccount(account: any) {
      await getInstance();
      const user = await UserModel.findById(account.userId);
      const newAcc = new AccountModel({ ...account, user });
      const res = await newAcc.save();
      user.accounts = user.accounts ? [...user.accounts, account] : [account];
      await user.save();
      return res;
    },

    // TODO (Will be required in a future release of next/auth):
    // async unlinkAccount({ provider, id }) {
    //   return;
    // },

    async createSession({ sessionToken, userId, expires }: sessionProps) {
      await getInstance();
      const user = await UserModel.findById(userId!);
      const newSess = new SessionModel({
        sessionToken,
        user,
        expires,
      });
      const res = await newSess.save();
      return { ...res, userId };
    },

    async getSessionAndUser(sessionToken: string) {
      await getInstance();
      const res = await SessionModel.findOne(
        { sessionToken },
        { populate: "user" }
      ).catch((reason: any) => {
        if (reason.message === "document not found") return null;
        throw new Error(reason);
      });
      if (res === null) return null;
      const t = {
        session: { ...res, userId: res.user.id },
        user: { ...res.user },
      };
      return t;
    },

    async updateSession({ sessionToken, expires }: sessionProps) {
      await getInstance();
      const res = await SessionModel.findOneAndUpdate(
        { sessionToken },
        { sessionToken, expires }
      );
      return res;
    },

    async deleteSession(sessionToken: string) {
      await getInstance();
      const res = await SessionModel.findOneAndRemove({ sessionToken });
      return res;
    },

    // TODO (OPTIONAL):
    // async createVerificationToken({ identifier, expires, token }) {
    //   return;
    // },
    // async useVerificationToken({ identifier, token }) {
    //   return;
    // },
  };
}
