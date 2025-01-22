export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/category/sparklers">Sparklers</a></li>
              <li><a href="/category/ground-chakkar">Ground Chakkar</a></li>
              <li><a href="/category/rockets">Rockets</a></li>
              <li><a href="/category/combo-boxes">Combo Boxes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@bijilicrackers.co</li>
              <li>Phone: +91-XXXXXXXXXX</li>
              <li>Address: Sivakasi, Tamil Nadu</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-sm">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; 2025 Bijili Crackers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
