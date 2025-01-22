import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#e31837] text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">Bijili Crackers</span>
          </div>
          <nav className="flex space-x-6">
            <Link href="/" className="text-white hover:text-yellow-300">Home</Link>
            <Link href="/products" className="text-white hover:text-yellow-300">Products</Link>
            <Link href="/cart" className="text-white hover:text-yellow-300">Cart</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
