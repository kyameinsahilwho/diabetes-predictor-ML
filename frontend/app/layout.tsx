import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 min-h-screen">
        <div>
          <div className="fixed top-0 font-bold w-full bg-gray-100 bg-opacity-50 backdrop-blur flex justify-center items-center z-10 py-4">
            <NavigationMenu>
              <NavigationMenuList className="container mx-auto flex justify-center items-center">
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="text-transparent bg-clip-text bg-gradient-to-tr from-gray-800 to-rose-600 px-6 py-3 rounded-md text-xl">
                      Diabetes Predictor
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/bmi" legacyBehavior passHref>
                    <NavigationMenuLink className="text-transparent bg-clip-text bg-gradient-to-tr from-gray-800 to-blue-500 px-6 py-3 rounded-md text-xl">
                      BMI
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="mt-16">{children}</div>
        </div>
      </body>
    </html>
  );
}
