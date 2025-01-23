"use client";
import CategoryPage from '../../components/CategoryPage';

// Collect new products from all categories
const newArrivalsProducts = [
  {
    id: 'fp2',
    name: 'Premium Color Shower',
    price: 599,
    discount: 15,
    image: '/products/flower-pot-2.jpg',
    rating: 4.8,
    description: 'Premium flower pot with extended duration and vibrant colors',
    category: 'Flower Pots',
    features: [
      'Extended duration',
      'Premium effects',
      'Enhanced safety',
      'Vibrant colors'
    ],
    specifications: {
      'Duration': '60-70 seconds',
      'Effects': 'Premium color shower',
      'Quantity': '1 piece',
      'Safety Rating': '5/5'
    },
    safetyInstructions: [
      'Place on flat surface',
      'Keep at safe distance',
      'Use in open areas only',
      'Adult supervision required'
    ],
    stock: 30,
    isNew: true
  },
  {
    id: 'r2',
    name: 'Thunder King Rocket',
    price: 499,
    discount: 10,
    image: '/products/rocket-2.jpg',
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
  },
  {
    id: 'sky2',
    name: 'Premium Sky Display',
    price: 1499,
    discount: 10,
    image: '/products/sky-shot-2.jpg',
    rating: 4.9,
    description: 'Professional grade aerial display with synchronized effects',
    category: 'Sky Shots',
    features: [
      'Synchronized shots',
      'Premium effects',
      'Extended duration',
      'Professional grade'
    ],
    specifications: {
      'Duration': '90-120 seconds',
      'Effects': 'Premium aerial display',
      'Shots': '36 shots',
      'Safety Rating': '4/5'
    },
    safetyInstructions: [
      'Place on flat surface',
      'Clear area before use',
      'Keep away from buildings',
      'Adult supervision required'
    ],
    stock: 20,
    isNew: true
  }
];

export default function NewArrivalsPage() {
  return (
    <CategoryPage
      title="New Arrivals"
      description="Discover our latest and most exciting firework products"
      products={newArrivalsProducts}
    />
  );
}
