import { auth } from "@/auth";

import React from "react";
import ProfileForm from "./ProfileForm";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/lib/queries";
import { redirect } from "next/navigation";
import { userProps } from "@/types/types";
import ProfileProgress from "@/components/progress/profileProgress";
import { db } from "@/lib/db";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/user/signin");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id as string,
    },
    include: {
      address: true,
    },
  });

  return (
    <main className="space-y-6 w-full">
      <section className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <ProfileProgress user={user as userProps} />
      </section>
      <Separator />
      <ProfileForm user={user as userProps} />
    </main>
  );
};

export default page;
