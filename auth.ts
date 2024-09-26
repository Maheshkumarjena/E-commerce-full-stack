import NextAuth, { CredentialsSignin } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import User from "./models/user";
import { connectToDatabase } from "./lib/mongoDb";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers:
        [
            GoogleProvider({
                clientId: process.env.AUTH_GOOGLE_ID,
                clientSecret: process.env.AUTH_GOOGLE_SECRET,
            }),


            Credentials({
                // You can specify which fields should be submitted, by adding keys to the `credentials` object.
                // e.g. domain, username, password, 2FA token, etc.
                // name: Credentials,
                credentials: {
                    email: {
                        label: "email",
                        type: "email"
                    },
                    password: {
                        label: "password",
                        type: "password"
                    },
                },

                authorize: async (credentials) => {

                    console.log(credentials.email, credentials.password);

                    const email = credentials.email as string | undefined;
                    const password = credentials.password as string | undefined;

                    let user = null;


                    try {

                        if (!email || !password) {
                            throw new CredentialsSignin({
                                cause: "enter both email and password",
                                
                            })
                            
                        }

                        if (typeof email !== "string")
                            throw new CredentialsSignin({
                                cause: "Email is not valid",
                            })


                        connectToDatabase();


                        // Logic to retrieve user from DB
                        user = await User.findOne({ email }).select("+password");

                        if (!user) {
                            console.error("invalid user or Password ");

                            return "invalid user or password" ;
                        }

                        // Logic to compare password using bcrypt
                        const isValidPassword = await bcrypt.compare
                            (password, user.password);


                        if (!isValidPassword) {
                            console.error("Invalid credentials.");
                        }
                        else{
                            console.log("login successful")
                            // Return user object if credentials are valid
                            console.log(user.name, user.email, user._id);
                            return { name: user.name, email: user.email, id: user._id };
                        }   
                    } 
                    
                    catch (error) {
                        console.error(error);
                        return null; // Returning null means authentication failed
                    }
                },
            }),

        ],

    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                // Connect to MongoDB
                await connectToDatabase();

                // Check if user already exists in the database
                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    // Create a new user document in the "users" collection
                    const newUser = new User({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        createdAt: new Date(),
                    });

                    await newUser.save();
                }

                return true; // Continue with login
            } catch (error) {
                console.error('Error storing user data in MongoDB:', error);
                return false; // Reject login on error
            }
        },
        async session({ session, token }) {
            // Pass additional user data to the session
            session.user.id = token.sub;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },

    secret: process.env.AUTH_SECRET,
 
})


