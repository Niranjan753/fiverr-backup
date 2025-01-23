"use client";
import CategoryPage from '../../components/CategoryPage';

const sparklersProducts = [
  {
    id: 'sp1',
    name: 'Golden Sparkler',
    price: 149,
    discount: 0,
    image: '/demo.jpg',
    rating: 4.8,
    description: 'Classic golden sparkler for safe and beautiful celebrations',
    category: 'Sparklers',
    features: [
      'Long duration',
      'Golden sparks',
      'Smokeless',
      'Kid-friendly'
    ],
    specifications: {
      'Duration': '3-4 minutes',
      'Effects': 'Golden sparkles',
      'Quantity': '10 pieces',
      'Safety Rating': '5/5'
    },
    safetyInstructions: [
      'Hold at arm\'s length',
      'Use outdoors',
      'Keep away from face',
      'Adult supervision required'
    ],
    stock: 200,
    isNew: false
  },
  {
    id: 'sp2',
    name: 'Color Sparkler',
    price: 199,
    discount: 5,
    image: '/demo.jpg',
    rating: 4.9,
    description: 'Multi-colored sparkler with changing effects',
    category: 'Sparklers',
    features: [
      'Color changing',
      'Extended duration',
      'Smokeless',
      'Kid-friendly'
    ],
    specifications: {
      'Duration': '4-5 minutes',
      'Effects': 'Multi-color sparkles',
      'Quantity': '10 pieces',
      'Safety Rating': '5/5'
    },
    safetyInstructions: [
      'Hold at arm\'s length',
      'Use outdoors',
      'Keep away from face',
      'Adult supervision required'
    ],
    stock: 150,
    isNew: true
  }
];

export default function SparklersPage() {
  return (
    <CategoryPage
      title="Sparklers Collection"
      description="Safe and beautiful sparklers for all celebrations"
      products={sparklersProducts}
    />
  );
}
