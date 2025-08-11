import MobileMenu from "@/components/MobileMenu";

export default function About() {
  return (
    <div className="flex flex-col items-left justify-center gap-4 p-6">
      <MobileMenu />

      <div className="flex flex-col gap-4 mt-16 md:mt-0">
        <h1 className="font-bold text-4xl">About Us</h1>
        <p>We are a platform dedicated to helping you express your feelings.</p>
        <p>
          Our mission is to provide a safe and anonymous space for open
          communication.
        </p>
        <p>
          We believe in the power of conversation and the importance of mental
          health.
        </p>
        <p>
          Join us in creating a supportive community where everyone can share
          their thoughts and feelings.
        </p>
        <p>Together, we can make a difference.</p>
        <p>All messages are anonymous and not stored.</p>
      </div>
    </div>
  );
}
