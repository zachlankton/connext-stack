import NextAuth, { Profile } from "next-auth";
import { OAuthConfig } from "next-auth/providers";
import Google from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }) as OAuthConfig<Profile>,
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("User: ", user);
      console.log("Account ", account);
      console.log("Profile: ", profile);
      console.log("Email: ", email);
      console.log("Creds: ", credentials);
      return true;
    },
    async session({ session, user, token }) {
      console.log("User:", user);
      console.log("Token:", token);
      return session;
    },
  },
});
