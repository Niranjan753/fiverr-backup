"use client";
import CategoryPage from '../../components/CategoryPage';

const repeatingShotsProducts = [
  {
    id: 'rs1',
    name: 'Classic Repeater',
    price: 799,
    discount: 10,
    image: '/products/repeating-1.jpg',
    rating: 4.7,
    description: 'Multiple shots with consistent performance',
    category: 'Repeating Shots',
    features: [
      'Multiple shots',
      'Consistent effects',
      'Good duration',
      'Safe design'
    ],
    specifications: {
      'Duration': '45-60 seconds',
      'Effects': 'Repeating bursts',
      'Shots': '20 shots',
      'Safety Rating': '4/5'
    },
    safetyInstructions: [
      'Place on flat surface',
      'Clear area before use',
      'Keep away from buildings',
      'Adult supervision required'
    ],
    stock: 35,
    isNew: false
  },
  {
    id: 'rs2',
    name: 'Premium Multi-Shot',
    price: 1299,
    discount: 15,
    image: '/products/repeating-2.jpg',
    rating: 4.8,
    description: 'Professional grade repeating shots with varied effects',
    category: 'Repeating Shots',
    features: [
      'Varied effects',
      'Extended duration',
      'Premium quality',
      'Professional grade'
    ],
    specifications: {
      'Duration': '60-90 seconds',
      'Effects': 'Multiple varied bursts',
      'Shots': '30 shots',
      'Safety Rating': '4/5'
    },
    safetyInstructions: [
      'Place on flat surface',
      'Clear area before use',
      'Keep away from buildings',
      'Adult supervision required'
    ],
    stock: 25,
    isNew: true
  }
];

export default function RepeatingShotsPage() {
  return (
    <CategoryPage
      title="Repeating Shots Collection"
      description="Experience continuous excitement with our repeating shot fireworks"
      products={repeatingShotsProducts}
    />
  );
}
