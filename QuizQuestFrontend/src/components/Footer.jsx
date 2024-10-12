import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className={cn("bg-[#cff466] text-black py-6")}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="mb-4 sm:mb-0">
          <h2 className="text-xl font-bold">QuizQuest</h2>
          <p className="text-sm">© 2024 QuizQuest. All rights reserved.</p>
        </div>

        {/* Middle Section */}
        <div className="flex gap-6 mb-4 sm:mb-0">
          <Link
            to="/about"
            className="text-sm hover:text-gray-600 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm hover:text-gray-600 transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            className="text-sm hover:text-gray-600 transition-colors duration-300"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Right Section: Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M24 4.557a9.905 9.905 0 01-2.828.775A4.932 4.932 0 0023.337 3.2a9.865 9.865 0 01-3.127 1.195A4.918 4.918 0 0016.616 3a4.922 4.922 0 00-4.917 4.917c0 .384.044.76.127 1.12C7.728 8.64 4.1 6.9 1.67 4.148a4.9 4.9 0 00-.665 2.473c0 1.707.87 3.213 2.194 4.097a4.907 4.907 0 01-2.23-.616v.061c0 2.384 1.693 4.373 3.946 4.826a4.92 4.92 0 01-2.223.084 4.923 4.923 0 004.599 3.417A9.876 9.876 0 010 21.534a13.946 13.946 0 007.548 2.211c9.142 0 14.307-7.721 14.307-14.419 0-.22-.005-.439-.014-.657A10.243 10.243 0 0024 4.557z" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M22.676 0H1.324C.595 0 0 .594 0 1.324v21.352C0 23.405.595 24 1.324 24h11.506v-9.294H9.514V10.5h3.316V7.797c0-3.293 2.015-5.089 4.963-5.089 1.411 0 2.625.105 2.978.152v3.457l-2.042.001c-1.599 0-1.909.76-1.909 1.874v2.456h3.815l-.496 3.206h-3.319V24h6.51c.729 0 1.324-.595 1.324-1.324V1.324C24 .595 23.405 0 22.676 0z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M22.225 0H1.771C.792 0 0 .792 0 1.771v20.454C0 23.208.792 24 1.771 24h20.454C23.208 24 24 23.208 24 22.225V1.771C24 .792 23.208 0 22.225 0zM7.125 20.452H3.707V9.05h3.418v11.402zM5.417 7.608c-1.09 0-1.973-.885-1.973-1.974a1.973 1.973 0 113.946 0c0 1.089-.883 1.974-1.973 1.974zM20.452 20.452h-3.418v-5.795c0-1.382-.026-3.156-1.922-3.156-1.924 0-2.219 1.503-2.219 3.055v5.896H9.475V9.05h3.282v1.557h.046c.457-.867 1.571-1.78 3.233-1.78 3.457 0 4.096 2.275 4.096 5.232v6.393z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
