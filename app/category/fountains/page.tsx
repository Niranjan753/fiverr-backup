"use client";
import CategoryPage from '../../components/CategoryPage';

const fountainsProducts = [
  {
    id: 'f1',
    name: 'Classic Fountain',
    price: 349,
    discount: 5,
    image: '/demo.jpg',
    rating: 4.6,
    description: 'Beautiful fountain with long-lasting colorful effects',
    category: 'Fountains',
    features: [
      'Long duration',
      'Colorful sparks',
      'Stable base',
      'Safe design'
    ],
    specifications: {
      'Duration': '90-120 seconds',
      'Effects': 'Multi-color fountain',
      'Height': '3-4 meters',
      'Safety Rating': '5/5'
    },
    safetyInstructions: [
      'Place on flat surface',
      'Keep at safe distance',
      'Use outdoors only',
      'Adult supervision required'
    ],
    stock: 40,
    isNew: false
  },
  {
    id: 'f2',
    name: 'Premium Color Cascade',
    price: 599,
    discount: 10,
    image: '/demo.jpg',
    rating: 4.8,
    description: 'Premium fountain with changing colors and extended duration',
    category: 'Fountains',
    features: [
      'Color changing',
      'Extended duration',
      'High reach',
      'Premium effects'
    ],
    specifications: {
      'Duration': '150-180 seconds',
      'Effects': 'Color changing cascade',
      'Height': '4-5 meters',
      'Safety Rating': '5/5'
    },
    safetyInstructions: [
      'Place on flat surface',
      'Keep at safe distance',
      'Use outdoors only',
      'Adult supervision required'
    ],
    stock: 25,
    isNew: true
  }
];

export default function FountainsPage() {
  return (
    <CategoryPage
      title="Fountains Collection"
      description="Experience the magic of our long-lasting fountain fireworks"
      products={fountainsProducts}
    />
  );
}
