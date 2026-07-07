import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

import { DATABASE_URL } from "./config.js"

const connectionString = `${DATABASE_URL}`;

// console.log("cwd:", process.cwd());
// console.log("DATABASE_URL:", process.env.DATABASE_URL);

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
// console.log("hello world")