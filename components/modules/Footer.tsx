import { SocialPanel } from "@components/elements/SocialPanel";
import Link from "next/link";
import { ReactNode } from "react";
import { NewsletterSignUpPanel } from "@components/elements/NewsletterSignUpPanel";

/**
 * Creates a footer to be displayed at the bottom of every page
 * @returns new footer
 */
export const Footer = (props: { extraRightColumn?: ReactNode }) => {
  return (
    <>
      <hr className="w-full h-1 bg-black border-none" />

      <footer className="flex flex-col items-stretch w-full p-2 md:flex-row">
        {/* Display email */}
        <div className="flex flex-col items-center flex-none px-2 md:items-start">
          <p className="font-serif text-2xl">Contact Us:</p>
          <div className="flex flex-row flex-wrap items-center m-1">
            <SocialPanel
              options={{
                linkedinLink:
                  "https://www.linkedin.com/company/emergingfinsights/",
                instagramLink: "https://www.instagram.com/emergingfinsights/",
              }}
              iconFrameClass="xl:w-8 xl:h-8"
              containerClass="mx-auto xl:gap-3"
            />

            <div className="flex flex-row items-center mx-auto">
              <svg
                viewBox="0 0 30 30"
                width="30"
                className="flex-none m-1 ml-4"
              >
                <image xlinkHref="/svg/mail-icon.svg" width="30" height="30" />
              </svg>
              <Link href="mailto:admin@emergingfinsights.co.uk" passHref>
                <a className="block font-thin sm:font-xs hover:underline">
                  admin@emergingfinsights.co.uk
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center flex-grow px-2 pt-5 md:pt-0">
          <p className="font-serif text-xl text-center">
            Subscribe to our weekly newsletter here:
          </p>
          <NewsletterSignUpPanel />
        </div>

        {/*  About us and privacy notice */}
        <div className="flex flex-col items-center flex-none px-2 pt-5 md:pt-0">
          <Link href="/about-us" passHref>
            <a className="font-thin hover:underline"> About Us </a>
          </Link>

          <Link href="/privacy-policy" passHref>
            <a className="font-thin hover:underline">Privacy Policy</a>
          </Link>
          {props.extraRightColumn}
        </div>

        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-1 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 15l-6 -6l-6 6h12" />
          </svg>
        </span>
      </footer>
    </>
  );
};
