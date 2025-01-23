"use client";
import CategoryPage from '../../components/CategoryPage';

const groundChakkarProducts = [
  {
    id: 'gc1',
    name: 'Classic Ground Chakkar',
    price: 299,
    discount: 10,
    image: '/products/ground-chakkar-1.jpg',
    rating: 4.5,
    description: 'Traditional ground spinner with colorful sparks and long-lasting performance',
    category: 'Ground Chakkar',
    features: [
      'Colorful sparks',
      'Long duration',
      'Safe to use',
      'Multiple effects'
    ],
    specifications: {
      'Duration': '30-40 seconds',
      'Effects': 'Multi-color',
      'Quantity': '1 piece',
      'Safety Rating': '4/5'
    },
    safetyInstructions: [
      'Light and step back immediately',
      'Use in open areas only',
      'Keep away from flammable materials',
      'Adult supervision required'
    ],
    stock: 50,
    isNew: false
  },
  {
    id: 'gc2',
    name: 'Premium Chakkar Deluxe',
    price: 499,
    discount: 15,
    image: '/products/ground-chakkar-2.jpg',
    rating: 4.8,
    description: 'Premium ground chakkar with extended duration and enhanced effects',
    category: 'Ground Chakkar',
    features: [
      'Extended duration',
      'Premium effects',
      'Enhanced safety',
      'Bright colors'
    ],
    specifications: {
      'Duration': '45-60 seconds',
      'Effects': 'Premium multi-color',
      'Quantity': '1 piece',
      'Safety Rating': '5/5'
    },
    safetyInstructions: [
      'Light and step back immediately',
      'Use in open areas only',
      'Keep away from flammable materials',
      'Adult supervision required'
    ],
    stock: 30,
    isNew: true
  },
  // Add more products as needed
];

export default function GroundChakkarPage() {
  return (
    <CategoryPage
      title="Ground Chakkar Collection"
      description="Explore our range of high-quality ground chakkars with spectacular effects"
      products={groundChakkarProducts}
    />
  );
}
