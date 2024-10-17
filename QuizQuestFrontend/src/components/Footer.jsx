import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils"; // Ensure this utility works as expected

export default function Footer() {
  return (
    <footer
      className={cn("text-white py-8 shadow-lg")}
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 10, 0, 0.98) 85%, rgba(0, 50, 0, 0.9) 95%, rgba(0, 80, 0, 0.4) 100%)",
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-6 space-y-6 md:space-y-0">
        {/* Left Section */}
        <div className="footer-logo mb-6 md:mb-0 flex flex-col items-start md:items-start">
          <h2 className="text-3xl font-bold">
            <span className="text-[#cff466]">Quiz</span>
            <span className="text-white"> Quest</span>
          </h2>
          <p className="text-sm mt-2 max-w-xs">
            A web-based application designed to create, manage, and take quizzes seamlessly.
          </p>
          <div className="flex space-x-4 mt-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#cff466] transition-colors duration-300"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#cff466] transition-colors duration-300"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#cff466] transition-colors duration-300"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="footer-links flex flex-col md:flex-row gap-10 md:gap-20 mb-6 md:mb-0">
          {/* Features Section */}
          <div className="platform flex-1 flex flex-col">
            <h3 className="font-bold text-lg mb-2">Features</h3>
            <ul className="space-y-2">
              {[
                "Create and Manage Quizzes",
                "Multiple Question Types",
                "Real-time Quiz Results",
                "User Authentication",
                "User Profiles",
                "Analytics Dashboard",
                "Leaderboard System"
              ].map((feature) => (
                <li key={feature} className="whitespace-nowrap">
                  <Link to={`/${feature.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[#cff466] transition-colors duration-300">
                    {feature}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div className="about flex-1 flex flex-col">
            <h3 className="font-bold text-lg mb-2">About</h3>
            <ul className="space-y-2">
              {["Team", "Partners", "Contact Us", "FAQs", "Blog"].map((about) => (
                <li key={about}>
                  <Link to={`/${about.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[#cff466] transition-colors duration-300">
                    {about}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section: Contact */}
        <div className="footer-contactus flex flex-col items-start">
          <h2 className="text-lg font-bold ml-2">Contact Us</h2>
          <Link to="/contact" className="relative text-sm bg-[#cff466] text-black min-w-fit px-10 py-2 rounded-full mt-2 text-center">
            Get in Touch
          </Link>
        </div>
      </div>

      <div className="border-t border-[#cff466] mt-6 pt-4">
        <div className="flex justify-center space-x-4">
          <Link to="/privacy-policy" className="text-sm hover:text-[#cff466] transition-colors duration-300">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-sm hover:text-[#cff466] transition-colors duration-300">Terms of Service</Link>
        </div>
        <div className="copyright-tag text-center text-sm mt-4">
          &copy; {new Date().getFullYear()} QuizQuest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
