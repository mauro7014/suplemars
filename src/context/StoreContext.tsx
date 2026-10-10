import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { products as initialProducts } from '../data/products'
import type { Product } from '../types'

interface StoreState {
  products: Product[]
  heroImage: string
  heroTitle: string
  heroSubtitle: string
  heroTag: string
  materialesTexto: string
  materialesHero: string
  nosotrasTexto: string
  nosotrasHero: string
  nosotrasQuote: string
  galeriaImages: string[]
}

interface StoreContextValue {
  store: StoreState
  updateStore: (updates: Partial<StoreState>) => void
  updateProduct: (product: Product) => void
  addProduct: (product: Product) => void
}

const defaultStore: StoreState = {
  products: initialProducts,
  heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80',
  heroTitle: 'SUPLEMARS',
  heroSubtitle: 'Suplementos deportivos de alta performance',
  heroTag: 'Nueva coleccion',
  materialesTexto: 'En Suplemars trabajamos con los mejores laboratorios del mundo para traerte suplementos de la mas alta calidad.',
  materialesHero: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80',
  nosotrasTexto: 'Suplemars nacio en Rosario con un objetivo claro: llevar suplementos de calidad profesional a todos los deportistas argentinos.',
  nosotrasHero: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&q=80',
  nosotrasQuote: 'Cada rep cuenta. Cada suplemento importa. Suplemars es tu aliado.',
  galeriaImages: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
    'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=400&q=80',
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80',
    'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80',
    'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80',
  ],
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<StoreState>(function() {
    try {
      const saved = localStorage.getItem('suplemars_store')
      if (saved) return JSON.parse(saved)
    } catch(e) {}
    return defaultStore
  })

  useEffect(function() {
    localStorage.setItem('suplemars_store', JSON.stringify(store))
  }, [store])

  function updateStore(updates) {
    setStore(function(prev) { return { ...prev, ...updates } })
  }

  function updateProduct(product) {
    setStore(function(prev) {
      return {
        ...prev,
        products: prev.products.map(function(p) {
          return p.id === product.id ? product : p
        }),
      }
    })
  }

  function addProduct(product) {
    setStore(function(prev) {
      return { ...prev, products: [...prev.products, product] }
    })
  }

  return (
    <StoreContext.Provider value={{ store, updateStore, updateProduct, addProduct }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore debe usarse dentro de StoreProvider')
  return ctx
}
