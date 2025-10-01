import Link from 'next/link';
import "./seller-detail.css";
 
export default function NotFound() {
  return (
    <main className="notfound">
    
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested seller.</p>
      <Link
        href="/sellers"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}