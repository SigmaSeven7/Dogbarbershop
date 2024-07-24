"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import AuthDialog from "../auth-modal/index.tsx";
import useStore from "@/stores/useStore";
import { Button } from "@/components/ui/button";
import { HiMenu, HiX } from "react-icons/hi"; // For hamburger and close icons

const Header: React.FC = () => {
  const { user, session, setUser, setSession, setClientId } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const sessionCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("session="));
      if (sessionCookie) {
        const name = sessionCookie.split("=")[1];
        setUser(name);
        setSession(true);
      } else {
        setUser(null);
        setSession(false);
      }
      setIsLoading(false);
    };

    checkSession();
  }, [setUser, setSession, setClientId]);

  const handleLogout = () => {
    document.cookie =
      "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    setSession(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <header className="w-full flex justify-between items-center p-4 mb-12 bg-white shadow-md rounded-lg">
        <div className="flex items-center">
          <Image
            src="/8317858.jpg"
            alt="לוגו מספרת כלבים"
            width={80}
            height={80}
            priority
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-blue-800">
            Doggy Perfect
          </span>
        </div>
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <Link href="#services-section" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    שירותים
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#gallery" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    גלריה
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    צור קשר
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#testimonials-section" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    לקוחות מספרים
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                {!isLoading &&
                  ((!session || !user )? (
                    <AuthDialog />
                  ) : (
                    <div className="flex justify-between gap-4 items-center">
                      <span className="text-blue-800 font-semibold">
                        היי {user}
                      </span>
                      <Button onClick={handleLogout}>התנתק</Button>
                    </div>
                  ))}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="lg:hidden">
          <Button onClick={toggleDrawer}>
            {isDrawerOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </Button>
        </div>
      </header>
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 p-4">
            <nav className="flex flex-col space-y-4">
              <NavigationMenu>
                <NavigationMenuList className="flex flex-col space-y-4">
                  <NavigationMenuItem>
                    {!isLoading &&
                      (!session ? (
                        <AuthDialog />
                      ) : (
                        <div className="flex flex-col gap-4 items-center">
                          <span className="text-blue-800 font-semibold">
                            Hi {user}
                          </span>
                          <Button onClick={handleLogout}>התנתק</Button>
                        </div>
                      ))}
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="#services-section" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        onClick={toggleDrawer}
                      >
                        שירותים
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="#gallery" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        onClick={toggleDrawer}
                      >
                        גלריה
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="#contact" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        onClick={toggleDrawer}
                      >
                        צור קשר
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="#testimonials-section" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        onClick={toggleDrawer}
                      >
                        לקוחות מספרים
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
