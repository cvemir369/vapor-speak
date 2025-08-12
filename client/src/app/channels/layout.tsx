import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Channels - Vapor Speak",
  description: "Join the conversation in our channels.",
};

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
