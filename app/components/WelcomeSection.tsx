import Image from 'next/image';

export default function WelcomeSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 leading-tight">
              SRT Crackers - Sivakasi<br />
              <span className="text-white">Online Crackers Shop</span>
            </h1>
            
            <p className="text-gray-300 text-lg">
              Welcome to SRT Crackers, where every moment is infused with the 
              magic of celebration and every corner holds the promise of delight! As 
              you step through our doors, you are greeted by a symphony of colors, 
              the tantalizing aroma of festive sweets, and the crackling anticipation of 
              joyous festivities to come.
            </p>

            <p className="text-gray-300 text-lg">
              Diwali, the festival of lights, is a time when families and friends come 
              together to celebrate the triumph of light over darkness, of good over 
              evil.
            </p>

            <p className="text-gray-300 text-lg">
              At our SRT Crackers Shop, we are honored to be part of this cherished 
              tradition, offering a treasure trove of fireworks that will elevate your 
              celebrations to new heights.
            </p>
          </div>

          {/* Image */}
          <div className="relative w-[80%] mx-auto md:w-full">
            <div className="relative aspect-[4/3] md:aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full" />
              <Image
                src="/demo.jpg"
                alt="Diwali Celebration"
                fill
                className="object-cover rounded-full p-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
