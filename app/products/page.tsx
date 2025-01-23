import CategoryPage from '../components/CategoryPage';

// Import all products from different categories
const allProducts = [
  // Ground Chakkar
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
  // Flower Pots
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
  // Add more products from other categories...
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
  }
];

export default function ProductsPage() {
  return (
    <CategoryPage
      title="All Products"
      description="Browse our complete collection of premium quality crackers"
      products={allProducts}
    />
  );
}
