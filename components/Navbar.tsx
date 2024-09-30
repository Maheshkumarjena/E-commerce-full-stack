import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./ui/theme-btn";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { SignOut } from "./signout-btn";


const Navbar: React.FC = ({userData}) => {

  console.log(userData);
  console.log("user data")
  // console.log(userData.name)

  return (
    <nav className=" z-50 bg-background/50 sticky top-0 border-b backdrop-blur-sm mx-auto  p-4">
      <div className=" flex justify-between lg:justify-around  items-center">
        {/* Logo */}
        <div className=" text-2xl font-bold flex flex-row gap-3">
          <div className="md:hidden flex flex-row items-center gap-8 ">
            <Sheet>
              <SheetTrigger>
                <button className=" focus:outline-none">
                  <svg
                    className={`w-12 h-8 text-primary transition-transform duration-300 `}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 32 32" // Increased the viewBox for larger paths
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round" // Uncommented for rounded line endings
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        "M2 8h28M2 16h28M2 24h28" // Hamburger icon with longer lines
                      }
                    />
                  </svg>
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <div className=" -mt-4 flex flex-col gap-8">
                    <SheetTitle>
                      {" "}
                      <p className="font-bold text-2xl">Menu</p>{" "}
                    </SheetTitle>
                    <hr className="border-none h-[0.4px] bg-gray-800 -mt-4" />

                    <SheetTitle className=" hover:text-primary  transition-all duration-300 ease-in-out hover:font-bold hover:scale-105">
                      <Link href="/">
                        <SheetTrigger>Home</SheetTrigger>
                      </Link>
                    </SheetTitle>

                    <SheetTitle className="hover:text-primary   transition-all duration-300 ease-in-out hover:font-bold hover:scale-105">
                      <Link href="/about">
                        <SheetTrigger>About</SheetTrigger>
                      </Link>
                    </SheetTitle>

                    <SheetTrigger>
                      <SheetTitle className=" hover:text-primary   transition-all duration-300 ease-in-out hover:font-bold hover:scale-105">
                        <Link href="/cart">
                          <SheetTrigger>Cart</SheetTrigger>
                        </Link>
                      </SheetTitle>
                    </SheetTrigger>




                    <Button variant="outline" className="w-fit mx-auto">
                      <Link href="/signIn">
                        <SheetTrigger>SignIn</SheetTrigger>
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-fit mx-auto">
                      <Link href="/signUp">
                        <SheetTrigger> SignUp</SheetTrigger>
                      </Link>
                    </Button>

                      <SignOut/>


                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/">
            <p>
              <Image
                src={"https://printify.com/pfh/media/logo-old-B5JY5YNQ.svg"}
                width="140"
                height="100"
              ></Image>
            </p>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center lg:space-x-12">
          <Link href="/">
            <p className="  transition-all duration-300 ease-in-out hover:font-bold hover:scale-105 ">
              Home
            </p>
          </Link>
          <Link href="/about">
            <p className=" transition-all duration-300 ease-in-out hover:font-bold hover:scale-105  ">
              About
            </p>
          </Link>
          <Link href="/cart">
            <p className=" transition-all duration-300 ease-in-out hover:font-bold hover:scale-105 ">
              Products
            </p>
          </Link>

          
          <Button variant="ghost">
            <Link href="/signIn">SignIn</Link>
          </Button>
          <Button variant="ghost">
            <Link href="/signUp">SignUp</Link>
          </Button>


          
        </div>

        <div className="flex flex-row gap-[3vw] items-center">
          <div className="flex flex-row items-center gap-2">
            {userData ? (
              <>
                <p>
                  <FaUser />
                </p>
                <p>{userData.name.slice(0, 6)}</p>
              </>
            ) : (
              " "
            )}
          </div>{" "}
          <ModeToggle />{" "}
        </div>
      </div>

      {/* Mobile Menu with opacity animation */}
    </nav>
  );
}; 

export default Navbar;
