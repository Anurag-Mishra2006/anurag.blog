// import { withAccelerate } from "@prisma/extension-accelerate";
// import { PrismaClient } from "../generated/prisma/client.js";
// import { DATABASE_URL } from "../index.js";

// export const prisma = new PrismaClient({
//   accelerateUrl: DATABASE_URL as string
// }).$extends(withAccelerate());

import { PrismaClient } from "../generated/prisma/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

export const getPrisma = (databaseUrl: string) => {
  return new PrismaClient({
    // In Prisma 7, use accelerateUrl instead of datasourceUrl
    accelerateUrl: databaseUrl, 
  }).$extends(withAccelerate());
}