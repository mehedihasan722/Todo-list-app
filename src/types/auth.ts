// import { PrismaClient } from "@prisma/client";
// import { Lucia } from "lucia";
// import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

// const client = new PrismaClient();
// const adapter = new PrismaAdapter(client.session, client.user); // your adapter

// export const lucia = new Lucia(adapter, {
//   sessionCookie: {
//     attributes: {
//       // set to `true` when using HTTPS
//       secure: process.env.NODE_ENV === "production",
//     },
//   },
//   getUserAttributes: (attributes) => {
//     return {
//       // attributes has the type of DatabaseUserAttributes
//       username: attributes.username,
//     };
//   },
// });

// declare module "lucia" {
//   interface Register {
//     Lucia: typeof lucia;
//     DatabaseUserAttributes: DatabaseUserAttributes;
//   }
// }

// interface DatabaseUserAttributes {
//   username: string;
// }
