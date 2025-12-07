import React from "react";
import Logo from "../../../components/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-base-100 py-6 shadow-sm rounded-2xl">
      <div className=" px-6 flex flex-col md:flex-row justify-between gap-10">

        {/* Left Section */}
        <aside className="flex flex-col items-center md:items-start text-center md:text-left">
          <Logo />

          <p className="font-semibold mt-3">
            Providing reliable tech since 1992
          </p>

          
        </aside>

        {/* Right Section */}
        <nav className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3">Follow Me</h3>

          <ul className="space-y-2 flex gap-5 text-center md:text-left">
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                className="hover:text-primary duration-200"
              >
                GitHub
              </a>
            </li>

            <li>
              <a
                href="https://linkedin.com/"
                target="_blank"
                className="hover:text-primary duration-200"
              >
                LinkedIn
              </a>
            </li>

            <li>
              <a
                href="https://x.com/"
                target="_blank"
                className="hover:text-primary duration-200"
              >
                X (Twitter)
              </a>
            </li>

            <li>
              <a
                href="https://facebook.com/"
                target="_blank"
                className="hover:text-primary duration-200"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>

      </div>
      <p className="text-sm mt-1 items-center justify-center text-center  text-gray-500">
            Copyright © {new Date().getFullYear()}
            {" "}— All rights reserved
          </p>
    </footer>
  );
};

export default Footer;
 

