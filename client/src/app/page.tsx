import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="font-bold text-4xl">Welcome to Love Hate Love</h1>
      <p className="text-lg">A platform to express your feelings.</p>
      <div className="flex flex-col gap-3 items-center sm:items-start">
        <p className="text-lg">
          Explore live chat channels and express yourself.
        </p>
        <p>Chats and users are not saved or stored.</p>
        <p>Anonymous mode is enabled.</p>
        <Link
          href="/channels"
          className="rounded-full w-fit bg-neutral-500 text-white py-2 px-4 hover:bg-neutral-600 cursor-pointer active:scale-95 transition-transform"
        >
          Get Started
        </Link>
      </div>
    </>
  );
}
