import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../clg-prisma/generated/prisma/client.js";
import { v4 } from "uuid";
import { username } from "better-auth/plugins";

const prisma = new PrismaClient(); // ✅ correctly instantiated
console.log("i am auth from api")

async function testConnection() {
  try {
    // Test if we can access the User model
    console.log("Testing Prisma connection...");
    const userCount = await prisma.userLogin.count();
    console.log("User count:", userCount);
    console.log("✅ Prisma client is working!");
  } catch (error) {
    console.error("❌ Prisma error:", error);
  } finally {
    await prisma.$disconnect();
  }
}


testConnection()
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
     usePlural: true,
     
  }),
  
  trustedOrigins: [process.env.HOST!],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    database: {
      generateId: () => v4(),
    },
  },
  plugins: [username()],
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
