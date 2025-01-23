"use client"
import CategoryPage from '../../components/CategoryPage';

const rocketsProducts = [
  {
    id: 'r1',
    name: 'Sky Blazer Rocket',
    price: 299,
    discount: 5,
    image: '/demo.jpg',
    rating: 4.6,
    description: 'High-flying rocket with spectacular aerial display',
    category: 'Rockets',
    features: [
      'High altitude',
      'Colorful burst',
      'Whistling effect',
      'Easy to launch'
    ],
    specifications: {
      'Height': '100-150 meters',
      'Effects': 'Multi-color burst',
      'Quantity': '5 pieces',
      'Safety Rating': '4/5'
    },
    safetyInstructions: [
      'Launch from stable base',
      'Clear area before launch',
      'Keep away from buildings',
      'Adult supervision required'
    ],
    stock: 60,
    isNew: false
  },
  {
    id: 'r2',
    name: 'Thunder King Rocket',
    price: 499,
    discount: 10,
    image: '/demo.jpg',
    rating: 4.7,
    description: 'Premium rocket with thunderous sound and dazzling display',
    category: 'Rockets',
    features: [
      'Extra height',
      'Thunder effect',
      'Premium burst',
      'Multiple effects'
    ],
    specifications: {
      'Height': '150-200 meters',
      'Effects': 'Thunder with color burst',
      'Quantity': '5 pieces',
      'Safety Rating': '4/5'
    },
    safetyInstructions: [
      'Launch from stable base',
      'Clear area before launch',
      'Keep away from buildings',
      'Adult supervision required'
    ],
    stock: 40,
    isNew: true
  }
];

export default function RocketsPage() {
  return (
    <CategoryPage
      title="Rockets Collection"
      description="Experience the thrill of our high-flying rockets with spectacular effects"
      products={rocketsProducts}
    />
  );
}
