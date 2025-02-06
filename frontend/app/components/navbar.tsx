import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
            <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
                Quiz Quest
            </Link>
            </div>
            <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-gray-800 hover:text-blue-500">
                Login
            </Link>
            
            <Link href="/auth/signup" className="text-gray-800 hover:text-blue-500">
                Sign Up
            </Link>
            </div>
        </div>
        </div>
    </nav>
  );
}