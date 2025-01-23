"use client";
import CategoryPage from '../../components/CategoryPage';

const singleSoundProducts = [
  {
    id: 'ss1',
    name: 'Classic Thunder',
    price: 199,
    discount: 5,
    image: '/demo.jpg',
    rating: 4.3,
    description: 'Classic single sound cracker with powerful effect',
    category: 'Single Sound Crackers',
    features: [
      'Loud sound',
      'Quick ignition',
      'Consistent performance',
      'Safe design'
    ],
    specifications: {
      'Sound Level': 'High',
      'Effects': 'Single bang',
      'Quantity': '10 pieces',
      'Safety Rating': '4/5'
    },
    safetyInstructions: [
      'Light and move away quickly',
      'Use in open areas only',
      'Keep away from people',
      'Adult supervision required'
    ],
    stock: 100,
    isNew: false
  },
  {
    id: 'ss2',
    name: 'Mega Bang',
    price: 299,
    discount: 8,
    image: '/demo.jpg',
    rating: 4.5,
    description: 'Extra powerful single sound cracker for maximum impact',
    category: 'Single Sound Crackers',
    features: [
      'Extra loud',
      'Premium quality',
      'Enhanced safety',
      'Reliable performance'
    ],
    specifications: {
      'Sound Level': 'Very High',
      'Effects': 'Single powerful bang',
      'Quantity': '10 pieces',
      'Safety Rating': '4/5'
    },
    safetyInstructions: [
      'Light and move away quickly',
      'Use in open areas only',
      'Keep away from people',
      'Adult supervision required'
    ],
    stock: 80,
    isNew: true
  }
];

export default function SingleSoundPage() {
  return (
    <CategoryPage
      title="Single Sound Crackers"
      description="Experience the power of our single sound crackers"
      products={singleSoundProducts}
    />
  );
}
