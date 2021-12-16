import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CouchbaseAdapter, { adapterOptions } from "next-auth-couchbase-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import { ottoman, connectionOptions } from "@/db/index";
import Models from "@/models/index";
const { UserRoles, UserProfile } = Models;

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
      async signIn({ user }) {
        const userProfile = (await UserProfile.find({ userid: user.email }))
          .rows[0];

        if (!userProfile) {
          const newUserProfile = new UserProfile({
            userid: user.email as string,
            image: user.image,
            name: user.name,
          });
          // save(true) will fail if document exists <--- this is desired
          const test = await newUserProfile.save(true);
          console.log("TEST", newUserProfile, test);
        }

        const userRoles = (await UserRoles.find({ user: user.email })).rows[0]
          ?.roles;

        if (!userRoles || userRoles.length === 0) return false;

        return true;
      },
      async session({ session, user }: any) {
        const roles = (await UserRoles.find({ user: user.email })).rows[0]
          ?.roles;
        return { ...session, roles };
      },
    },
  });

  await nextAuthHandler(req, res);
}
