export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-6 text-center">
      <p>&copy; {new Date().getFullYear()} BlogVerse. All rights reserved.</p>
      <div className="mt-2 text-sm">
        <a href="#" className="mx-2 hover:underline">About</a>|
        <a href="#" className="mx-2 hover:underline">Contact</a>|
        <a href="#" className="mx-2 hover:underline">Terms</a>
      </div>
    </footer>
  );
}
