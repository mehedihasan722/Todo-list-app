import { Heading, Html, Tailwind, Text, Button } from "@react-email/components";
import React from "react";

type VerifyTemplateProps = {
  name: string;
  email: string;
  code: string;
};

const VerifyTemplate = ({ name, email, code }: VerifyTemplateProps) => {
  return (
    <Tailwind>
      <Html className="flex flex-col items-center justify-center h-full ">
        <Heading as="h2">Verify your email </Heading>
        <Text className="text-lg font-semibold font-sans ">Hey,{name} 🙋‍♂️</Text>
        <Text className="text-md font-sans">
          Thanks for signing up !!! 🎉🎉🎉
        </Text>
        <Text className="text-md font-sans">
          To complete the process, we just need to verify your email address :
          {email}
        </Text>

        <Text className="text-lg font-sans font-medium">
          Your verification code is:
        </Text>
        <Button className="bg-sky-300 rounded-lg tracking-widest   p-3 font-sans text-center text-black font-semibold">
          {code}
        </Button>
        <Text className="font-sans">
          If you didn't create an account using this email address, please
          ignore this email.
        </Text>
      </Html>
    </Tailwind>
  );
};

export default VerifyTemplate;
