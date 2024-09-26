import React from "react";
import Image from "next/image";
import User from "@/models/user";
import { CredentialsSignin } from "next-auth";
import { connectToDatabase } from "@/lib/mongoDb";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import bcrypt, { compare } from "bcrypt";

const SignIn = () => {

  return (
    <div className="min-h-screen bg-background text-[hsl(var(--foreground))] flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-background shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            {/* Use Next.js Image component for optimized loading */}
            {/* <Image
              src="/logo.png"
              alt="Logo"
              width={1}
              height={1}
              className="w-auto mx-auto"
            /> */}
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="flex gap-4 flex-col items-center">
                <form
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-[hsl(var(--input))] text-[hsl(var(--muted-foreground))] flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  action={async () => {
                    "use server";
                    await signIn("google");
                  }}
                >
                  <button
                    className="flex flex-row items-center w-full h-full mx-auto justify-center "
                    type="submit"
                  >
                    <div className="bg-[hsl(var(--card))] p-2  mr-3 rounded-full w-fit">
                      {/* Google SVG Logo */}
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <p>Signin with google</p>
                  </button>
                </form>{" "}
              </div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-[hsl(var(--muted-foreground))] tracking-wide font-medium bg-background items-center transform translate-y-2.5">
                  Or sign In with E-mail
                </div>
              </div>

              <form
                action={async (formData) => {
                  "use server";

                  // console.log(formData.get("password"));
                  // console.log("formdata");
                  // Sign in with credentials
                  const result = await signIn("credentials", {
                    redirect: false,
                    email: formData.get("email"),
                    password: formData.get("password"),
                  });

                  if (result.error) {
                    console.error("Sign-in error: ", result.error);
                    return;
                  }

                  // Find user by email
                  const user = await User.findOne({
                    email: formData.get("email")
                  }).select("+password");
                  console.log(user);

                  const password=formData.get("password");
                  console.log(password);
                  console.log("password");
                  // Compare passwords
                  const comparePassword =  compare(password,
                    user.password
                  );

                  if (comparePassword) {
                    // Create and save verification token in cookies
                    const verificationToken = user.verificationToken;

                    // Set cookie (you can use a library like `cookie` to set cookies in headers)
                    // document.cookie = `verificationToken=${verificationToken}; path=/; secure;`;

                    

                    // Log the user formData after successful login
                    setTimeout(() => {
                      console.log(formData);
                    }, 1000);

                    redirect("/")
                  } else {
                    console.error("Password mismatch");
                  }
                }}
                className="mx-auto max-w-xs"
              >
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-[hsl(var(--input))] border border-[hsl(var(--border))] placeholder-gray-500 text-sm focus:outline-none focus:border-[hsl(var(--foreground))] focus:bg-[hsl(var(--background))]"
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-[hsl(var(--input))] border border-[hsl(var(--border))] placeholder-gray-500 text-sm focus:outline-none focus:border-[hsl(var(--foreground))] focus:bg-[hsl(var(--background))] mt-5"
                  placeholder="Password"
                  type="password"
                  name="password"
                  required
                />
                <button
                  className="mt-5 tracking-wide font-semibold bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] w-full py-4 rounded-lg hover:bg-[hsl(var(--ring))] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="submit"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-1">Sign In</span>
                </button>
                <p className="mt-6 text-xs text-[hsl(var(--muted-foreground))] text-center">
                  I agree to abide by Cartesian Kinetics
                  <a
                    href="#"
                    className="border-b border-[hsl(var(--border))] border-dotted"
                  >
                    Terms of Service
                  </a>
                  and its
                  <a
                    href="#"
                    className="border-b border-[hsl(var(--border))] border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[hsl(var(--input))] text-center hidden lg:flex">
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

export default SignIn;
