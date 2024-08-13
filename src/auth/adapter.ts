import { db } from "@/lib/db";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

export const adapter = new PrismaAdapter(db.session, db.user);
