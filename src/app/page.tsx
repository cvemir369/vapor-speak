export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="font-bold text-4xl">Welcome to Love Hate Love</h1>
        <p className="text-lg">A platform to express your feelings.</p>
        <div className="flex flex-col gap-3">
          <p className="text-lg">
            Explore live chat channels and express yourself.
          </p>
          <button className="rounded-full w-fit bg-neutral-500 text-white py-2 px-4 hover:bg-neutral-600 cursor-pointer active:scale-95 transition-transform">
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}
