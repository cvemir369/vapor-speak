export default function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 mt-auto">
      <p className="text-gray-500">
        &copy; {new Date().getFullYear()} Vapor Speak. All rights reserved.{" "}
        <a
          href="https://github.com/cvemir369"
          rel="noopener noreferrer"
          target="_blank"
        >
          Made by cvemir369
        </a>
      </p>
    </footer>
  );
}
