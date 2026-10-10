import type { Product } from '../types'

export const products: Product[] = [
  {
    id: 'p001',
    name: 'Whey Protein Gold',
    subtitle: 'Proteina de suero, 30g por porcion',
    description: 'La proteina de suero de mayor calidad del mercado. 30g de proteina por porcion, baja en grasas y carbohidratos. Ideal para recuperacion muscular post entrenamiento. Disponible en sabor chocolate, vainilla y frutilla.',
    price: 45000,
    currency: 'ARS',
    category: 'proteinas',
    material: 'suero de leche',
    sizes: [
      { label: '1kg',  available: true  },
      { label: '2kg',  available: true  },
      { label: '5lbs', available: true  },
      { label: '10lbs',available: false },
    ],
    images: [
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80',
      'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&q=80',
    ],
    tags: ['proteina', 'whey', 'musculo'],
    isNew: false,
    isBestseller: true,
    stock: 50,
  },
  {
    id: 'p002',
    name: 'Creatina Monohidrato',
    subtitle: 'Creatina pura, maxima fuerza',
    description: 'Creatina monohidrato micronizada de maxima pureza. Aumenta la fuerza, potencia y masa muscular. Sin sabor, se mezcla facilmente con cualquier bebida. 5g por porcion, 60 porciones por envase.',
    price: 28000,
    currency: 'ARS',
    category: 'creatinas',
    material: 'creatina monohidrato',
    sizes: [
      { label: '300g', available: true },
      { label: '500g', available: true },
      { label: '1kg',  available: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    ],
    tags: ['creatina', 'fuerza', 'potencia'],
    isNew: false,
    isBestseller: true,
    stock: 30,
  },
  {
    id: 'p003',
    name: 'Pre-Workout Extreme',
    subtitle: 'Energia y foco maximos',
    description: 'Pre-entreno de ultima generacion con cafeina, beta-alanina, citrulina y arginina. Maxima energia, foco mental y pump muscular. Para atletas avanzados que buscan llevar su entrenamiento al siguiente nivel.',
    price: 38000,
    currency: 'ARS',
    category: 'pre-entreno',
    material: 'multi-ingrediente',
    sizes: [
      { label: '300g', available: true  },
      { label: '600g', available: true  },
    ],
    images: [
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    ],
    tags: ['pre-entreno', 'energia', 'foco'],
    isNew: true,
    isBestseller: false,
    stock: 20,
  },
  {
    id: 'p004',
    name: 'BCAA 2:1:1',
    subtitle: 'Aminoacidos esenciales, recuperacion',
    description: 'Aminoacidos de cadena ramificada en proporcion ideal 2:1:1 (leucina, isoleucina, valina). Reducen el catabolismo muscular, aceleran la recuperacion y mejoran la resistencia. Ideales durante y despues del entrenamiento.',
    price: 32000,
    currency: 'ARS',
    category: 'aminoacidos',
    material: 'aminoacidos',
    sizes: [
      { label: '300g', available: true  },
      { label: '500g', available: true  },
      { label: '1kg',  available: false },
    ],
    images: [
      'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    ],
    tags: ['bcaa', 'aminoacidos', 'recuperacion'],
    isNew: false,
    isBestseller: false,
    stock: 25,
  },
  {
    id: 'p005',
    name: 'Mass Gainer Pro',
    subtitle: 'Ganador de masa, hipercalorico',
    description: 'Hipercalorico profesional con 1250 calorias por porcion. 50g de proteina, 250g de carbohidratos complejos y vitaminas esenciales. Ideal para personas con dificultad para ganar peso y masa muscular.',
    price: 55000,
    currency: 'ARS',
    category: 'varios',
    material: 'multi-ingrediente',
    sizes: [
      { label: '3kg', available: true },
      { label: '6kg', available: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&q=80',
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80',
    ],
    tags: ['gainer', 'masa', 'hipercalorico'],
    isNew: true,
    isBestseller: false,
    stock: 15,
  },
  {
    id: 'p006',
    name: 'Omega 3 Ultra',
    subtitle: 'Acidos grasos esenciales, salud total',
    description: 'Aceite de pescado de alta concentracion con 1000mg de EPA y DHA por capsula. Reduce la inflamacion, mejora la salud cardiovascular y el rendimiento cognitivo. Certificado libre de metales pesados.',
    price: 22000,
    currency: 'ARS',
    category: 'varios',
    material: 'varios',
    sizes: [
      { label: '60 caps',  available: true },
      { label: '120 caps', available: true },
      { label: '240 caps', available: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    ],
    tags: ['omega3', 'salud', 'inflamacion'],
    isNew: false,
    isBestseller: false,
    stock: 40,
  },
]

export const getProductById = (id: string): Product | undefined =>
  products.find(p => p.id === id)

export const formatPrice = (price: number, currency: string): string => {
  if (currency === 'ARS') {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }
  return currency + ' ' + price.toLocaleString()
}
