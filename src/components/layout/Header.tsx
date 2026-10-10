import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { useNavigate, useLocation } from 'react-router-dom'

interface HeaderProps {
  onCartOpen: () => void
}

const categories = ['Todos', 'Proteinas', 'Creatinas', 'Pre-entreno', 'Colageno', 'Quemadores', 'Aminoacidos', 'Barritas', 'Varios']

export function Header({ onCartOpen }: HeaderProps) {
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [colOpen, setColOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function handleCategory(cat: string) {
    setColOpen(false)
    setMenuOpen(false)
    if (location.pathname !== '/') navigate('/')
    const event = new CustomEvent('filter-category', { detail: cat.toLowerCase() })
    window.dispatchEvent(event)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: '#111111', borderColor: '#2A2A2A' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <a href="/" className="flex items-center gap-3">
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-widest" style={{ color: '#FF6B00' }}>
                SUPLEMARS
              </span>
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase mt-0.5" style={{ color: '#666666' }}>
                suplementos deportivos
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <div className="relative">
              <button
                onClick={function() { setColOpen(!colOpen) }}
                className="flex items-center gap-1 font-sans text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: '#999999' }}
                onMouseEnter={function(e) { (e.target as HTMLElement).style.color = '#FF6B00' }}
                onMouseLeave={function(e) { (e.target as HTMLElement).style.color = '#999999' }}
              >
                Productos
                <ChevronDown size={12} strokeWidth={1.5} className={colOpen ? 'rotate-180 transition-transform duration-200' : 'transition-transform duration-200'} />
              </button>
              {colOpen && (
                <div className="absolute top-8 left-0 py-2 min-w-44 z-50 border" style={{ backgroundColor: '#1C1C1C', borderColor: '#2A2A2A' }}>
                  {categories.map(function(cat) {
                    return (
                      <button
                        key={cat}
                        onClick={function() { handleCategory(cat) }}
                        className="w-full text-left px-4 py-2 font-sans text-[10px] tracking-widest uppercase transition-colors duration-200"
                        style={{ color: '#666666' }}
                        onMouseEnter={function(e) { (e.target as HTMLElement).style.color = '#FF6B00' }}
                        onMouseLeave={function(e) { (e.target as HTMLElement).style.color = '#666666' }}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <button
              onClick={function() { navigate('/materiales') }}
              className="font-sans text-xs tracking-widest uppercase transition-colors duration-300"
              style={{ color: '#999999' }}
              onMouseEnter={function(e) { (e.target as HTMLElement).style.color = '#FF6B00' }}
              onMouseLeave={function(e) { (e.target as HTMLElement).style.color = '#999999' }}
            >
              Nosotros
            </button>

            <button
              onClick={function() { navigate('/nosotras') }}
              className="font-sans text-xs tracking-widest uppercase transition-colors duration-300"
              style={{ color: '#999999' }}
              onMouseEnter={function(e) { (e.target as HTMLElement).style.color = '#FF6B00' }}
              onMouseLeave={function(e) { (e.target as HTMLElement).style.color = '#999999' }}
            >
              Contacto
            </button>

            <button
              onClick={function() { navigate('/admin') }}
              className="font-sans text-xs tracking-widest uppercase transition-colors duration-300"
              style={{ color: '#666666' }}
              onMouseEnter={function(e) { (e.target as HTMLElement).style.color = '#FFFFFF' }}
              onMouseLeave={function(e) { (e.target as HTMLElement).style.color = '#666666' }}
            >
              Panel
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onCartOpen}
              className="relative p-2 transition-colors duration-300"
              style={{ color: '#FFFFFF' }}
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}>
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
            <button
              onClick={function() { setMenuOpen(!menuOpen) }}
              className="md:hidden p-2"
              style={{ color: '#FFFFFF' }}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>

        </div>
      </header>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 border-b md:hidden" style={{ backgroundColor: '#1C1C1C', borderColor: '#2A2A2A' }}>
          <nav className="flex flex-col px-6 py-6 gap-5">
            <div className="flex flex-col gap-2">
              <p className="font-sans text-[10px] tracking-widest uppercase" style={{ color: '#666666' }}>Productos</p>
              {categories.map(function(cat) {
                return (
                  <button key={cat} onClick={function() { handleCategory(cat) }} className="font-sans text-sm tracking-widest uppercase text-left pl-3" style={{ color: '#999999' }}>
                    {cat}
                  </button>
                )
              })}
            </div>
            <button onClick={function() { setMenuOpen(false); navigate('/materiales') }} className="font-sans text-sm tracking-widest uppercase text-left" style={{ color: '#999999' }}>Nosotros</button>
            <button onClick={function() { setMenuOpen(false); navigate('/nosotras') }} className="font-sans text-sm tracking-widest uppercase text-left" style={{ color: '#999999' }}>Contacto</button>
            <button onClick={function() { setMenuOpen(false); navigate('/admin') }} className="font-sans text-sm tracking-widest uppercase text-left" style={{ color: '#666666' }}>Panel</button>
          </nav>
        </div>
      )}
    </>
  )
}
