import MobileMenu from "@/components/MobileMenu";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Vapor Speak",
  description: "Learn more about our platform and mission.",
};

export default function About() {
  return (
    <div className="flex flex-col gap-4 p-6 w-full">
      <MobileMenu />

      <div className="flex flex-col gap-4 my-2">
        <h1 className="font-bold text-4xl">About Us</h1>
        <ul className="list-disc list-outside ml-4 pl-2 space-y-1">
          <li>Vapor Speak is a platform for anonymous communication.</li>
          <li>We prioritize user privacy and data security.</li>
          <li>Our goal is to foster open and honest conversations.</li>
          <li>We are committed to continuous improvement and innovation.</li>
          <li>
            We are a platform dedicated to helping you express your feelings.
          </li>
          <li>
            {" "}
            Our mission is to provide a safe and anonymous space for open
            communication.
          </li>
          <li>
            We believe in the power of conversation and the importance of mental
            health.
          </li>
          <li>Together, we can make a difference.</li>
          <li>All messages are anonymous and not stored.</li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mt-auto">
        <Link
          href="/channels"
          className="text-center rounded-full w-full sm:w-sm bg-neutral-800 text-white py-2 px-4 mt-3 hover:bg-neutral-700 cursor-pointer active:scale-95 transition-transform"
        >
          Explore Channels
        </Link>
        <Link
          href="/"
          className="text-center rounded-full w-full sm:w-sm bg-neutral-800 text-white py-2 px-4 mt-3 hover:bg-neutral-700 cursor-pointer active:scale-95 transition-transform"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
