import React from "react";
import { Navigation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import {
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useRouter } from "next/router";

export default function Navbarcomp() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Home", "Prediction", "Bmi"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-2xl">SugarSense</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            href="/home"
            color="foreground"
          >
            <span className="hover:text-pink-500 no-underline">Home</span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/prediction"
            color="danger"

          >
            Prediction
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/bmi"
          >
            BMI
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/trends"
          >
            Trends
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            className="font-semibold"
            color="danger"
            variant="flat"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: document.title,
                  url: window.location.href,
                });
              } else {
                // Fallback for browsers that don't support Web Share API
                alert("Sorry, your browser does not support sharing.");
              }
            }}
          >
            Share
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={`/${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
