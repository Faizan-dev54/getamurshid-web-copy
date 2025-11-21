import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,

  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export const AppLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function Header() {
  const location = useLocation();
  const isAuth = location.pathname === "/auth";
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Customers", path: "/customers" },
    { name: "Integrations", path: "/integrations" },
  ];

  return (
    <Navbar
      isBordered
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors ${theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900"
        }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6">
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="GetAMurshid" className="h-10 w-10 mr-2" />	
            <p className="font-bold text-lg">GetAMurshid</p>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navLinks.map((link) => (
            <NavbarItem key={link.name} isActive={location.pathname === link.path}>
              <Link
                to={link.path}
                className={`text-sm transition ${location.pathname === link.path
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
              >
                {link.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent as="div" justify="end" className="items-center gap-3">
          {isAuth ? (
            <Link
              to="/"
              className="text-sm px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Back
            </Link>
          ) : (
            <Link
              to="/auth"
              className="text-sm px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
            >
              Login / Sign Up
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="text-lg hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                color="secondary"
                size="sm"
                name="User"
                src="https://i.pravatar.cc/150?u=user123"
                className="cursor-pointer"
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2 text-black">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">you@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings" className="text-black">Settings</DropdownItem>
              <DropdownItem key="help_and_feedback" className="text-black">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger" className="text-red-600">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
