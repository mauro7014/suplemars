import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../types'
import { formatPrice } from '../data/products'
import { ShoppingBag, X, ZoomIn, ChevronRight } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useStore } from '../context/StoreContext'

const categories = [
  { slug: 'proteinas',   label: 'Proteinas',          color: '#FF6B00' },
  { slug: 'creatinas',   label: 'Creatinas',          color: '#0066CC' },
  { slug: 'pre-entreno', label: 'Pre-Entreno',        color: '#F5A623' },
  { slug: 'colageno',    label: 'Colageno',           color: '#FF6B00' },
  { slug: 'quemadores',  label: 'Quemadores',         color: '#0066CC' },
  { slug: 'aminoacidos', label: 'Aminoacidos',        color: '#F5A623' },
  { slug: 'barritas',    label: 'Barritas Proteicas', color: '#FF6B00' },
  { slug: 'varios',      label: 'Varios',             color: '#0066CC' },
]

const filterCategories = ['todos', 'proteinas', 'creatinas', 'pre-entreno', 'colageno', 'quemadores', 'aminoacidos', 'barritas', 'varios']

export function Home() {
  const { store } = useStore()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [activeCategory, setActiveCategory] = useState('todos')
  const { addItem } = useCart()

  useEffect(function() {
    function handleFilter(e: Event) {
      const detail = (e as CustomEvent).detail
      setActiveCategory(detail)
    }
    window.addEventListener('filter-category', handleFilter)
    return function() { window.removeEventListener('filter-category', handleFilter) }
  }, [])

  function handleAddToCart() {
    if (!selected || !selectedSize) return
    addItem(selected, selectedSize)
    setSelected(null)
    setSelectedSize('')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#111111' }}>

      {/* HERO */}
      <div className="relative w-full" style={{ height: '65vh' }}>
        <img src={store.heroImage} alt="SUPLEMARS" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase mb-3" style={{ color: '#FF6B00' }}>
            {store.heroTag}
          </p>
          <h1 className="font-display text-6xl md:text-8xl tracking-widest mb-4" style={{ color: '#FFFFFF' }}>
            {store.heroTitle}
          </h1>
          <p className="font-sans text-sm tracking-widest uppercase mb-8" style={{ color: '#999999' }}>
            {store.heroSubtitle}
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.slice(0, 3).map(function(cat) {
              return (
                <button
                  key={cat.slug}
                  onClick={function() { navigate('/categoria/' + cat.slug) }}
                  className="font-sans text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-300 hover:opacity-80"
                  style={{ borderColor: cat.color, color: cat.color }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* GRILLA DE CATEGORIAS */}
      <div className="px-6 pt-12 pb-6">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#FF6B00' }}>
          Categorias
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(function(cat) {
            const count = store.products.filter(function(p) { return p.category === cat.slug }).length
            return (
              <button
                key={cat.slug}
                onClick={function() { navigate('/categoria/' + cat.slug) }}
                className="relative group flex flex-col items-start p-4 border transition-all duration-300 text-left"
                style={{ borderColor: '#2A2A2A', backgroundColor: '#1C1C1C' }}
                onMouseEnter={function(e) { (e.currentTarget as HTMLElement).style.borderColor = cat.color }}
                onMouseLeave={function(e) { (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A' }}
              >
                <span className="font-display text-lg tracking-wide mb-1" style={{ color: '#FFFFFF' }}>
                  {cat.label}
                </span>
                <span className="font-sans text-[10px] tracking-wider" style={{ color: '#666666' }}>
                  {count} {count === 1 ? 'producto' : 'productos'}
                </span>
                <ChevronRight size={14} className="absolute bottom-3 right-3 transition-transform duration-300 group-hover:translate-x-1" style={{ color: cat.color }} strokeWidth={1.5} />
              </button>
            )
          })}
        </div>
      </div>

      {/* FILTROS */}
      <div className="px-6 pt-8 pb-4">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#FF6B00' }}>
          Todos los productos
        </p>
        <div className="flex gap-2 overflow-x-scroll hide-scrollbar pb-2">
          {filterCategories.map(function(cat) {
            return (
              <button
                key={cat}
                onClick={function() { setActiveCategory(cat) }}
                className="flex-shrink-0 font-sans text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-300"
                style={{
                  borderColor: activeCategory === cat ? '#FF6B00' : '#2A2A2A',
                  backgroundColor: activeCategory === cat ? '#FF6B00' : 'transparent',
                  color: activeCategory === cat ? '#FFFFFF' : '#666666',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* GALERIA */}
      <div className="px-6 pb-10">
        <div className="flex gap-4 overflow-x-scroll hide-scrollbar pb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {store.products.map(function(product) {
            const isActive = activeCategory === 'todos' || product.category === activeCategory
            return (
              <div
                key={product.id}
                className="flex-shrink-0 relative cursor-pointer group transition-all duration-500"
                style={{
                  width: '260px',
                  height: '360px',
                  scrollSnapAlign: 'start',
                  opacity: isActive ? 1 : 0.25,
                  transform: isActive ? 'scale(1)' : 'scale(0.96)',
                }}
                onClick={function() { if (isActive) { setSelected(product); setSelectedSize('') } }}
              >
                <div className="w-full h-full overflow-hidden" style={{ backgroundColor: '#1C1C1C' }}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }} />
                </div>
                {product.isNew && (
                  <div className="absolute top-3 left-3 font-sans text-[9px] tracking-widest uppercase px-2 py-1" style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}>
                    Nuevo
                  </div>
                )}
                {product.isBestseller && (
                  <div className="absolute top-3 left-3 font-sans text-[9px] tracking-widest uppercase px-2 py-1" style={{ backgroundColor: '#F5A623', color: '#111111' }}>
                    Top Ventas
                  </div>
                )}
                {isActive && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2" style={{ backgroundColor: 'rgba(255,107,0,0.2)' }}>
                    <ZoomIn size={14} color="#FF6B00" strokeWidth={1.5} />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-sans text-[9px] tracking-widest uppercase mb-1" style={{ color: '#FF6B00' }}>
                    {product.category}
                  </p>
                  <h3 className="font-display text-xl tracking-wide mb-1" style={{ color: '#FFFFFF' }}>
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs mb-2" style={{ color: '#999999' }}>
                    {product.subtitle}
                  </p>
                  <p className="font-display text-lg" style={{ color: '#F5A623' }}>
                    {formatPrice(product.price, product.currency)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* MODAL */}
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