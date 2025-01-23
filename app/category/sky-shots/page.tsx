"use client";
import CategoryPage from '../../components/CategoryPage';

const skyShotsProducts = [
  {
    id: 'sky1',
    name: 'Multi-Shot Aerial',
    price: 999,
    discount: 15,
    image: '/products/sky-shot-1.jpg',
    rating: 4.7,
    description: 'Multiple aerial shots with spectacular effects',
    category: 'Sky Shots',
    features: [
      'Multiple shots',
      'Aerial display',
      'Various effects',
      'Long duration'
    ],
    specifications: {
      'Duration': '60-90 seconds',
      'Effects': 'Multi-color aerial bursts',
      'Shots': '25 shots',
      'Safety Rating': '4/5'
    },
    safetyInstructions: [
      'Place on flat surface',
      'Clear area before use',
      'Keep away from buildings',
      'Adult supervision required'
    ],
    stock: 30,
    isNew: false
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

export default function SkyShotsPage() {
  return (
    <CategoryPage
      title="Sky Shots Collection"
      description="Create spectacular aerial displays with our premium sky shots"
      products={skyShotsProducts}
    />
  );
}
