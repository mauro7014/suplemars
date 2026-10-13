import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../data/products'
import { useNavigate } from 'react-router-dom'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, totalPrice, removeItem, updateQty } = useCart()
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col animate-slide-in-right" style={{ backgroundColor: '#1C1C1C' }}>

        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: '#2A2A2A' }}>
          <div className="flex items-center gap-3">
            <ShoppingCart size={18} strokeWidth={1.5} color="#FFFFFF" />
            <span className="font-sans text-xs tracking-widest uppercase" style={{ color: '#FFFFFF' }}>
              Carrito
            </span>
            {totalItems > 0 && (
              <span className="text-[9px] font-medium w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}>
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 transition-colors duration-200" style={{ color: '#666666' }}>
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingCart size={40} strokeWidth={1} color="#2A2A2A" />
              <p className="font-sans text-xs tracking-widest uppercase" style={{ color: '#666666' }}>
                Tu carrito esta vacio
              </p>
              <button
                onClick={onClose}
                className="font-sans text-[10px] tracking-widest uppercase underline underline-offset-4 transition-colors duration-200"
                style={{ color: '#FF6B00' }}
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map(function(item) {
                return (
                  <div key={item.product.id + item.selectedSize} className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover flex-shrink-0"
                      style={{ backgroundColor: '#111111' }}
                    />
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display text-lg leading-tight" style={{ color: '#FFFFFF' }}>
                            {item.product.name}
                          </h4>
                          <p className="font-sans text-[10px] tracking-wider uppercase mt-0.5" style={{ color: '#666666' }}>
                            {item.selectedSize}
                          </p>
                        </div>
                        <button
                          onClick={function() { removeItem(item.product.id, item.selectedSize) }}
                          className="p-1 transition-colors duration-200 flex-shrink-0"
                          style={{ color: '#444444' }}
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3">
                        <div className="flex items-center border" style={{ borderColor: '#2A2A2A' }}>
                          <button
                            onClick={function() { updateQty(item.product.id, item.selectedSize, item.quantity - 1) }}
                            className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
                            style={{ color: '#666666' }}
                          >
                            <Minus size={12} strokeWidth={1.5} />
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center font-sans text-xs" style={{ color: '#FFFFFF' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={function() { updateQty(item.product.id, item.selectedSize, item.quantity + 1) }}
                            className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
                            style={{ color: '#666666' }}
                          >
                            <Plus size={12} strokeWidth={1.5} />
                          </button>
                        </div>
                        <span className="font-display text-lg" style={{ color: '#F5A623' }}>
                          {formatPrice(item.product.price * item.quantity, item.product.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-6 border-t flex flex-col gap-4" style={{ borderColor: '#2A2A2A' }}>
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] tracking-widest uppercase" style={{ color: '#666666' }}>
                Total
              </span>
              <span className="font-display text-2xl" style={{ color: '#FFFFFF' }}>
                {formatPrice(totalPrice, 'ARS')}
              </span>
            </div>
            <p className="font-sans text-[9px] tracking-wider uppercase" style={{ color: '#444444' }}>
              Envio calculado al finalizar la compra
            </p>
            <button
              onClick={function() { onClose(); navigate('/checkout') }}
              className="w-full px-6 py-4 font-sans text-xs tracking-widest uppercase transition-colors duration-300"
              style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
            >
              Finalizar compra
            </button>
            <button
              onClick={onClose}
              className="w-full border px-6 py-3 font-sans text-xs tracking-widest uppercase transition-colors duration-300"
              style={{ borderColor: '#2A2A2A', color: '#666666' }}
            >
              Seguir comprando
            </button>
          </div>
        )}

      </div>
    </>
  )
}