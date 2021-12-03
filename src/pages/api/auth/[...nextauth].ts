import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CouchbaseAdapter, { adapterOptions } from "next-auth-couchbase-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import { ottoman, connectionOptions } from "@/db/index";
import Models from "@/models/index";
const { UserRoles } = Models;

const options: adapterOptions = {
  instance: ottoman,
  ...connectionOptions,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
    throw new Error(
      "Need to setup google oauth and add id and secret to .env.local (https://next-auth.js.org/providers/google)"
    );
  }

  const nextAuthHandler = NextAuth({
    // Configure one or more authentication providers
    providers: [
      Google({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
    ],
    secret: process.env.SECRET as string,

    adapter: CouchbaseAdapter(options),
    callbacks: {
      //   async signIn({ user, account, profile, email, credentials }) {
      //     console.log("User: ", user);
      //     console.log("Account ", account);
      //     console.log("Profile: ", profile);
      //     console.log("Email: ", email);
      //     console.log("Creds: ", credentials);
      //     return true;
      //   },
      async session({ session, user }: any) {
        const roles = (await UserRoles.find({ user: user.email })).rows[0]
          ?.roles;
        return { ...session, roles };
      },
    },
  });

  await nextAuthHandler(req, res);
}
