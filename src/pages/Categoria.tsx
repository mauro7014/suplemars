import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingBag, X, ArrowLeft } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../data/products'
import type { Product } from '../types'

const categoryLabels: Record<string, string> = {
  'proteinas':   'Proteinas',
  'creatinas':   'Creatinas',
  'pre-entreno': 'Pre-Entreno',
  'colageno':    'Colageno Hidrolizado',
  'quemadores':  'Quemadores de Grasa',
  'aminoacidos': 'Aminoacidos',
  'barritas':    'Barritas Proteicas',
  'varios':      'Varios',
}

const categoryImages: Record<string, string> = {
  'proteinas':   'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1600&q=80',
  'creatinas':   'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1600&q=80',
  'pre-entreno': 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1600&q=80',
  'colageno':    'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=1600&q=80',
  'quemadores':  'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=1600&q=80',
  'aminoacidos': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80',
  'barritas':    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&q=80',
  'varios':      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80',
}

export function Categoria() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { store } = useStore()
  const { addItem } = useCart()
  const [selected, setSelected] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState('')

  const cat = slug || 'todos'
  const label = categoryLabels[cat] || cat
  const heroImage = categoryImages[cat] || store.heroImage
  const filtered = store.products.filter(function(p) { return p.category === cat })

  function handleAddToCart() {
    if (!selected || !selectedSize) return
    addItem(selected, selectedSize)
    setSelected(null)
    setSelectedSize('')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#111111' }}>

      <div className="relative w-full" style={{ height: '35vh' }}>
        <img src={heroImage} alt={label} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8))' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase mb-3" style={{ color: '#FF6B00' }}>
            Suplemars
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-widest" style={{ color: '#FFFFFF' }}>
            {label}
          </h1>
          <p className="font-sans text-sm mt-3" style={{ color: '#999999' }}>
            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>
        <button
          onClick={function() { navigate('/') }}
          className="absolute top-6 left-6 flex items-center gap-2 font-sans text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ color: '#999999' }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Volver
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="font-display text-3xl tracking-widest" style={{ color: '#333333' }}>
              Sin productos todavia
            </p>
            <p className="font-sans text-sm" style={{ color: '#666666' }}>
              Proximamente agregamos productos en esta categoria
            </p>
            <button
              onClick={function() { navigate('/') }}
              className="font-sans text-xs tracking-widest uppercase px-6 py-3 border transition-colors duration-200"
              style={{ borderColor: '#FF6B00', color: '#FF6B00' }}
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(function(product) {
              return (
                <div
                  key={product.id}
                  className="relative cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: '#1C1C1C' }}
                  onClick={function() { setSelected(product); setSelectedSize('') }}
                >
                  <div className="relative overflow-hidden" style={{ height: '240px' }}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                    {product.isNew && (
                      <div className="absolute top-2 left-2 font-sans text-[9px] tracking-widest uppercase px-2 py-1" style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}>
                        Nuevo
                      </div>
                    )}
                    {product.isBestseller && (
                      <div className="absolute top-2 left-2 font-sans text-[9px] tracking-widest uppercase px-2 py-1" style={{ backgroundColor: '#F5A623', color: '#111111' }}>
                        Top Ventas
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg tracking-wide mb-1 leading-tight" style={{ color: '#FFFFFF' }}>
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs mb-3 leading-relaxed" style={{ color: '#666666' }}>
                      {product.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg" style={{ color: '#F5A623' }}>
                        {formatPrice(product.price, product.currency)}
                      </span>
                      <div className="font-sans text-[9px] tracking-widest uppercase px-2 py-1 border" style={{ borderColor: '#FF6B00', color: '#FF6B00' }}>
                        Ver
                      </div>
                    </div>
                    <div className="flex gap-1 mt-3 flex-wrap">
                      {product.sizes.filter(function(s) { return s.available }).slice(0, 3).map(function(size) {
                        return (
                          <span key={size.label} className="font-sans text-[9px] tracking-wider uppercase px-1.5 py-0.5 border" style={{ borderColor: '#2A2A2A', color: '#666666' }}>
                            {size.label}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }} onClick={function() { setSelected(null) }} />
          <div className="relative z-10 w-full h-full md:w-auto md:h-auto md:max-w-4xl md:max-h-[90vh] flex flex-col md:flex-row overflow-hidden" style={{ backgroundColor: '#1C1C1C' }}>
            <div className="relative w-full md:w-1/2 h-64 md:h-auto" style={{ backgroundColor: '#111111' }}>
              <img src={selected.images[0]} alt={selected.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col p-8 overflow-y-auto">
              <button onClick={function() { setSelected(null) }} className="absolute top-4 right-4 p-2" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <X size={18} strokeWidth={1.5} color="#FFFFFF" />
              </button>
              <p className="font-sans text-[9px] tracking-widest uppercase mb-2" style={{ color: '#FF6B00' }}>
                {selected.category} — {selected.material}
              </p>
              <h2 className="font-display text-3xl tracking-wide mb-1" style={{ color: '#FFFFFF' }}>
                {selected.name}
              </h2>
              <p className="font-sans text-xs tracking-wider mb-4" style={{ color: '#999999' }}>
                {selected.subtitle}
              </p>
              <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: '#CCCCCC' }}>
                {selected.description}
              </p>
              <p className="font-display text-3xl mb-6" style={{ color: '#F5A623' }}>
                {formatPrice(selected.price, selected.currency)}
              </p>
              <div className="mb-6">
                <p className="font-sans text-[9px] tracking-widest uppercase mb-3" style={{ color: '#666666' }}>
                  Presentacion
                </p>
                <div className="flex gap-2 flex-wrap">
                  {selected.sizes.map(function(size) {
                    return (
                      <button
                        key={size.label}
                        disabled={!size.available}
                        onClick={function() { setSelectedSize(size.label) }}
                        className="px-4 py-2 font-sans text-xs tracking-wider border transition-all duration-200"
                        style={{
                          borderColor: !size.available ? '#2A2A2A' : selectedSize === size.label ? '#FF6B00' : '#444444',
                          backgroundColor: selectedSize === size.label ? '#FF6B00' : 'transparent',
                          color: !size.available ? '#333333' : selectedSize === size.label ? '#FFFFFF' : '#999999',
                          textDecoration: !size.available ? 'line-through' : 'none',
                          cursor: !size.available ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {size.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="flex items-center justify-center gap-3 px-6 py-4 font-sans text-xs tracking-widest uppercase transition-colors duration-300 mt-auto"
                style={{
                  backgroundColor: selectedSize ? '#FF6B00' : '#2A2A2A',
                  color: '#FFFFFF',
                  cursor: selectedSize ? 'pointer' : 'not-allowed',
                }}
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                {selectedSize ? 'Agregar al carrito' : 'Selecciona una presentacion'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
