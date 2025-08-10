export default function Footer() {
  return (
    <footer className="flex items-center justify-center p-4">
      <p className="text-gray-500">
        &copy; {new Date().getFullYear()} Love Hate Love. All rights reserved.
      </p>
    </footer>
  );
}
