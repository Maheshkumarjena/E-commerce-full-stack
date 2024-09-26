import React from "react";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import User from "@/models/user"; // Assuming you have a type IUser for the User schema
import { connectToDatabase } from "@/lib/mongoDb";

// Define the type for FormData
interface FormData {
  get(key: string): FormDataEntryValue | null;
}

// Email Sending Logic using Nodemailer
const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Account Verification",
    html: `
      <h2>Account Verification</h2>
      <p>Click on the link below to verify your account:</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}">Verify Email</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Sign-up Logic
const verify = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string | undefined;
  const code = formData.get("code") as string | undefined;

  // Check for missing fields
  if (!email || !code) {
    console.error("All fields are required");
    return;
  }

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      var verificationToken = existingUser.verificationToken;
      console.log(verificationToken);
    } else {
      console.error("user doesn't exist");
    }

    const isMatch = await bcrypt.compare(code, verificationToken);

    if (isMatch) {
      // Update the user's isVerified field to true
        existingUser.isVerified = true;
        await existingUser.save();
      console.log(
        "verified"
      )
      // Optionally return the updated user or a success message
    } else {
      console.log("Verification code is incorrect")
      return { success: false, message: "Verification code is incorrect" };
    }

    // Create a new user in the database
    // Send verification email

    // Redirect to the sign-in page after sign-up
  } catch (error) {
    console.error("Error during verification:", error);
  }
           redirect("/signIn");


};

const Verify: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-[hsl(var(--foreground))] flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-background shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-[hsl(var(--muted-foreground))] tracking-wide font-medium bg-background transform translate-y-[-5px]">
                  Verify your email address.
                </div>
              </div>
              <form action={verify} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-[hsl(var(--input))] border border-[hsl(var(--border))] placeholder-gray-500 text-sm focus:outline-none focus:border-[hsl(var(--foreground))] focus:bg-[hsl(var(--background))] mt-5"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-[hsl(var(--input))] border border-[hsl(var(--border))] placeholder-gray-500 text-sm focus:outline-none focus:border-[hsl(var(--foreground))] focus:bg-[hsl(var(--background))] mt-5"
                  type="password"
                  placeholder="Verification code"
                  name="code"
                />
                <button className="mt-5 tracking-wide font-semibold bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] w-full py-4 rounded-lg hover:bg-[hsl(var(--ring))] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="ml-1">Verify</span>
                </button>
                <p className="mt-6 text-xs text-[hsl(var(--muted-foreground))] text-center">
                  By signing up, you agree to the{" "}
                  <a
                    href="#"
                    className="border-b border-[hsl(var(--border))] border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="border-b border-[hsl(var(--border))] border-dotted"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[hsl(var(--muted))] text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://drive.google.com/uc?export=view&id=1KZ_Ub_2lZ0dHbKV0fAIhxVhiQA183RCz')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
