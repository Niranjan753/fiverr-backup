"use client";
import CategoryPage from '../../components/CategoryPage';

const flowerPotsProducts = [
  {
    id: 'fp1',
    name: 'Classic Flower Pot',
    price: 399,
    discount: 10,
    image: '/products/flower-pot-1.jpg',
    rating: 4.5,
    description: 'Beautiful aerial fountain with multi-colored sparks',
    category: 'Flower Pots',
    features: [
      'Multi-colored sparks',
      'Long duration',
      'Safe to use',
      'Fountain effect'
    ],
    specifications: {
      'Duration': '40-50 seconds',
      'Effects': 'Multi-color fountain',
      'Quantity': '1 piece',
      'Safety Rating': '4/5'
    },
    safetyInstructions: [
      'Place on flat surface',
      'Keep at safe distance',
      'Use in open areas only',
      'Adult supervision required'
    ],
    stock: 45,
    isNew: false
  },
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
  }
];

export default function FlowerPotsPage() {
  return (
    <CategoryPage
      title="Flower Pots Collection"
      description="Experience the beauty of aerial fountains with our premium flower pots"
      products={flowerPotsProducts}
    />
  );
}
