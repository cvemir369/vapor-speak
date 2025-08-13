import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

export default function Home() {
  return (
    <div className="flex flex-col items-left justify-center gap-4 p-6">
      <MobileMenu />

      <div className="flex flex-col justify-center gap-4 my-2 md:mt-0">
        <h1 className="font-bold text-5xl">Welcome to Vapor Speak</h1>
        <p className="text-xl italic">A freedom of speak platform.</p>
      </div>
      <div className="flex flex-col gap-2">
        <ul className="list-disc list-outside ml-4 pl-2 space-y-1">
          <li>Explore live chat channels and express yourself.</li>
          <li>Chats and users are not saved or stored on servers.</li>
          <li>Anonymous mode is enabled.</li>
          <li>Registration is not required.</li>
          <li>
            Respect privacy and feelings and don&apos;t share personal
            information.
          </li>
        </ul>
        <Link
          href="/channels"
          className="text-center rounded-full w-full bg-neutral-800 text-white py-2 px-4 mt-3 hover:bg-neutral-700 cursor-pointer active:scale-95 transition-transform"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
}
