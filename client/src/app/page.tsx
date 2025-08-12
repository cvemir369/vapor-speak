import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

export default function Home() {
  return (
    <div className="flex flex-col items-left justify-center gap-4 p-6">
      <MobileMenu />

      <div className="flex flex-col justify-center gap-4 mb-6 mt-16 md:mt-0">
        <h1 className="font-bold text-5xl">Welcome to Vapor Speak</h1>
        <p className="text-xl italic">A freedom of speak platform.</p>
      </div>
      <div className="flex flex-col gap-2">
        <p>Explore live chat channels and express yourself.</p>
        <p>Chats and users are not saved or stored on servers.</p>
        <p>Anonymous mode is enabled.</p>
        <p>Registration is not required.</p>
        <Link
          href="/channels"
          className="rounded-full w-fit bg-neutral-800 text-white py-2 px-4 mt-3 hover:bg-neutral-700 cursor-pointer active:scale-95 transition-transform"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
}
