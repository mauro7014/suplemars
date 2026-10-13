import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../data/products'
import { CheckCircle, ChevronRight, Package, CreditCard, Truck, ShoppingBag } from 'lucide-react'

type Step = 1 | 2 | 3 | 4

interface FormData {
  email: string
  nombre: string
  telefono: string
  calle: string
  numero: string
  ciudad: string
  provincia: string
  codigoPostal: string
  envio: 'domicilio' | 'sucursal' | ''
  pago: 'tarjeta' | 'transferencia' | 'mercadopago' | 'efectivo' | ''
}

const provincias = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
  'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
  'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
  'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
  'Tierra del Fuego', 'Tucumán'
]

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>({
    email: '', nombre: '', telefono: '',
    calle: '', numero: '', ciudad: '', provincia: '', codigoPostal: '',
    envio: '', pago: '',
  })

  function update(field: keyof FormData, value: string) {
    setForm(function(prev) { return { ...prev, [field]: value } })
  }

  function canNext() {
    if (step === 1) return items.length > 0
    if (step === 2) return form.email !== '' && form.nombre !== '' && form.telefono !== '' && form.calle !== '' && form.ciudad !== '' && form.provincia !== '' && form.envio !== ''
    if (step === 3) return form.pago !== ''
    return true
  }

  function handleFinish() {
    clearCart()
    setStep(4)
  }

  const envioPrice = form.envio === 'domicilio' ? 3500 : 0

  const steps = [
    { n: 1, label: 'Carrito',  icon: ShoppingBag },
    { n: 2, label: 'Envio',    icon: Truck       },
    { n: 3, label: 'Pago',     icon: CreditCard  },
    { n: 4, label: 'Listo',    icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen py-12 px-6" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-2xl mx-auto">

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12">
          {steps.map(function(s, i) {
            const done = step > s.n
            const active = step === s.n
            return (
              <div key={s.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                    style={{
                      borderColor: done || active ? '#FF6B00' : '#2A2A2A',
                      backgroundColor: done ? '#FF6B00' : active ? 'transparent' : 'transparent',
                    }}
                  >
                    <s.icon size={16} strokeWidth={1.5} color={done || active ? '#FF6B00' : '#444444'} />
                  </div>
                  <span className="font-sans text-[9px] tracking-widest uppercase mt-1" style={{ color: done || active ? '#FF6B00' : '#444444' }}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px mx-2" style={{ backgroundColor: step > s.n ? '#FF6B00' : '#2A2A2A' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* PASO 1 — CARRITO */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-3xl tracking-widest mb-6" style={{ color: '#FFFFFF' }}>
              Tu carrito
            </h2>
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-sans text-sm mb-4" style={{ color: '#666666' }}>Tu carrito está vacío</p>
                <button onClick={function() { navigate('/') }} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border" style={{ borderColor: '#FF6B00', color: '#FF6B00' }}>
                  Ver productos
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map(function(item) {
                  return (
                    <div key={item.product.id + item.selectedSize} className="flex gap-4 p-4 border" style={{ borderColor: '#2A2A2A', backgroundColor: '#1C1C1C' }}>
                      <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-24 object-cover flex-shrink-0" style={{ backgroundColor: '#111111' }} />
                      <div className="flex-1">
                        <h4 className="font-display text-lg mb-1" style={{ color: '#FFFFFF' }}>{item.product.name}</h4>
                        <p className="font-sans text-[10px] tracking-wider uppercase mb-1" style={{ color: '#666666' }}>
                          Presentacion: {item.selectedSize} · Cantidad: {item.quantity}
                        </p>
                        <p className="font-display text-lg" style={{ color: '#F5A623' }}>
                          {formatPrice(item.product.price * item.quantity, item.product.currency)}
                        </p>
                      </div>
                    </div>
                  )
                })}
                <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: '#2A2A2A' }}>
                  <span className="font-sans text-xs tracking-widest uppercase" style={{ color: '#666666' }}>Subtotal</span>
                  <span className="font-display text-2xl" style={{ color: '#FFFFFF' }}>{formatPrice(totalPrice, 'ARS')}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PASO 2 — ENVIO */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-3xl tracking-widest mb-6" style={{ color: '#FFFFFF' }}>
              Datos de envio
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { field: 'email',    label: 'Email',          type: 'email' },
                { field: 'nombre',   label: 'Nombre completo', type: 'text' },
                { field: 'telefono', label: 'Telefono',        type: 'tel'  },
                { field: 'calle',    label: 'Calle',           type: 'text' },
                { field: 'numero',   label: 'Numero',          type: 'text' },
                { field: 'ciudad',   label: 'Ciudad',          type: 'text' },
                { field: 'codigoPostal', label: 'Codigo postal', type: 'text' },
              ].map(function(inp) {
                return (
                  <div key={inp.field}>
                    <label className="font-sans text-[10px] tracking-widest uppercase block mb-2" style={{ color: '#666666' }}>
                      {inp.label}
                    </label>
                    <input
                      type={inp.type}
                      value={form[inp.field as keyof FormData]}
                      onChange={function(e) { update(inp.field as keyof FormData, e.target.value) }}
                      className="w-full px-4 py-3 font-sans text-sm focus:outline-none border transition-colors duration-200"
                      style={{ backgroundColor: '#1C1C1C', borderColor: '#2A2A2A', color: '#FFFFFF' }}
                      onFocus={function(e) { e.target.style.borderColor = '#FF6B00' }}
                      onBlur={function(e) { e.target.style.borderColor = '#2A2A2A' }}
                    />
                  </div>
                )
              })}

              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase block mb-2" style={{ color: '#666666' }}>
                  Provincia
                </label>
                <select
                  value={form.provincia}
                  onChange={function(e) { update('provincia', e.target.value) }}
                  className="w-full px-4 py-3 font-sans text-sm focus:outline-none border"
                  style={{ backgroundColor: '#1C1C1C', borderColor: '#2A2A2A', color: form.provincia ? '#FFFFFF' : '#666666' }}
                >
                  <option value="">Selecciona tu provincia</option>
                  {provincias.map(function(p) { return <option key={p} value={p}>{p}</option> })}
                </select>
              </div>

              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase block mb-3" style={{ color: '#666666' }}>
                  Metodo de envio
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { value: 'domicilio', label: 'Envio a domicilio', desc: 'Recibis en tu casa — $3.500' },
                    { value: 'sucursal',  label: 'Retiro en sucursal', desc: 'Grand Bourg, Buenos Aires — Gratis' },
                  ].map(function(opt) {
                    return (
                      <button
                        key={opt.value}
                        onClick={function() { update('envio', opt.value) }}
                        className="flex items-start gap-3 p-4 border text-left transition-all duration-200"
                        style={{
                          borderColor: form.envio === opt.value ? '#FF6B00' : '#2A2A2A',
                          backgroundColor: form.envio === opt.value ? 'rgba(255,107,0,0.1)' : '#1C1C1C',
                        }}
                      >
                        <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5" style={{ borderColor: form.envio === opt.value ? '#FF6B00' : '#444444', backgroundColor: form.envio === opt.value ? '#FF6B00' : 'transparent' }} />
                        <div>
                          <p className="font-sans text-sm font-medium" style={{ color: '#FFFFFF' }}>{opt.label}</p>
                          <p className="font-sans text-xs" style={{ color: '#666666' }}>{opt.desc}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PASO 3 — PAGO */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-3xl tracking-widest mb-6" style={{ color: '#FFFFFF' }}>
              Metodo de pago
            </h2>
            <div className="flex flex-col gap-3 mb-8">
              {[
                { value: 'tarjeta',       label: 'Tarjeta de credito / debito', desc: 'Visa, Mastercard, Amex' },
                { value: 'mercadopago',   label: 'MercadoPago',                 desc: 'Pago con tu cuenta MP' },
                { value: 'transferencia', label: 'Transferencia bancaria',       desc: 'CVU / CBU — sin recargo' },
                { value: 'efectivo',      label: 'Efectivo',                     desc: 'Al retirar en sucursal' },
              ].map(function(opt) {
                return (
                  <button
                    key={opt.value}
                    onClick={function() { update('pago', opt.value) }}
                    className="flex items-start gap-3 p-4 border text-left transition-all duration-200"
                    style={{
                      borderColor: form.pago === opt.value ? '#FF6B00' : '#2A2A2A',
                      backgroundColor: form.pago === opt.value ? 'rgba(255,107,0,0.1)' : '#1C1C1C',
                    }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5" style={{ borderColor: form.pago === opt.value ? '#FF6B00' : '#444444', backgroundColor: form.pago === opt.value ? '#FF6B00' : 'transparent' }} />
                    <div>
                      <p className="font-sans text-sm font-medium" style={{ color: '#FFFFFF' }}>{opt.label}</p>
                      <p className="font-sans text-xs" style={{ color: '#666666' }}>{opt.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="p-4 border" style={{ borderColor: '#2A2A2A', backgroundColor: '#1C1C1C' }}>
              <p className="font-sans text-[10px] tracking-widest uppercase mb-3" style={{ color: '#666666' }}>Resumen del pedido</p>
              {items.map(function(item) {
                return (
                  <div key={item.product.id + item.selectedSize} className="flex justify-between mb-2">
                    <span className="font-sans text-xs" style={{ color: '#CCCCCC' }}>{item.product.name} x{item.quantity}</span>
                    <span className="font-sans text-xs" style={{ color: '#CCCCCC' }}>{formatPrice(item.product.price * item.quantity, item.product.currency)}</span>
                  </div>
                )
              })}
              <div className="flex justify-between mb-2 pt-2 border-t" style={{ borderColor: '#2A2A2A' }}>
                <span className="font-sans text-xs" style={{ color: '#666666' }}>Envio</span>
                <span className="font-sans text-xs" style={{ color: '#666666' }}>{envioPrice === 0 ? 'Gratis' : formatPrice(envioPrice, 'ARS')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: '#2A2A2A' }}>
                <span className="font-sans text-xs tracking-widest uppercase" style={{ color: '#FFFFFF' }}>Total</span>
                <span className="font-display text-xl" style={{ color: '#F5A623' }}>{formatPrice(totalPrice + envioPrice, 'ARS')}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-4 p-3" style={{ backgroundColor: 'rgba(255,107,0,0.05)', borderLeft: '2px solid #FF6B00' }}>
              <Package size={14} strokeWidth={1.5} color="#FF6B00" className="flex-shrink-0 mt-0.5" />
              <p className="font-sans text-[10px] leading-relaxed" style={{ color: '#999999' }}>
                Asegurate de que la direccion empiece por https:// y tenga el icono de candado antes de ingresar tus datos de pago.
              </p>
            </div>
          </div>
        )}

        {/* PASO 4 — CONFIRMACION */}
        {step === 4 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(255,107,0,0.1)', border: '2px solid #FF6B00' }}>
              <CheckCircle size={36} strokeWidth={1.5} color="#FF6B00" />
            </div>
            <h2 className="font-display text-4xl tracking-widest mb-3" style={{ color: '#FFFFFF' }}>
              Pedido recibido
            </h2>
            <p className="font-sans text-sm mb-2" style={{ color: '#999999' }}>
              Gracias {form.nombre}. Te enviamos la confirmacion a {form.email}
            </p>
            <p className="font-sans text-xs mb-8" style={{ color: '#666666' }}>
              En breve nos comunicamos con vos para coordinar el envio.
            </p>
            <div className="p-4 border mb-8 text-left" style={{ borderColor: '#2A2A2A', backgroundColor: '#1C1C1C' }}>
              <p className="font-sans text-[10px] tracking-widest uppercase mb-3" style={{ color: '#FF6B00' }}>Resumen</p>
              <div className="flex justify-between mb-1">
                <span className="font-sans text-xs" style={{ color: '#666666' }}>Envio</span>
                <span className="font-sans text-xs" style={{ color: '#CCCCCC' }}>{form.envio === 'domicilio' ? form.calle + ' ' + form.numero + ', ' + form.ciudad : 'Retiro en sucursal'}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="font-sans text-xs" style={{ color: '#666666' }}>Pago</span>
                <span className="font-sans text-xs" style={{ color: '#CCCCCC' }}>{form.pago}</span>
              </div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: '#2A2A2A' }}>
                <span className="font-sans text-xs" style={{ color: '#666666' }}>Total</span>
                <span className="font-display text-lg" style={{ color: '#F5A623' }}>{formatPrice(totalPrice + envioPrice, 'ARS')}</span>
              </div>
            </div>
            <button
              onClick={function() { navigate('/') }}
              className="font-sans text-xs tracking-widest uppercase px-8 py-4 transition-colors duration-200"
              style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
            >
              Seguir comprando
            </button>
          </div>
        )}

        {/* BOTONES DE NAVEGACION */}
        {step !== 4 && (
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={function() { setStep((step - 1) as Step) }}
                className="flex-1 font-sans text-xs tracking-widest uppercase px-6 py-4 border transition-colors duration-200"
                style={{ borderColor: '#2A2A2A', color: '#666666' }}
              >
                Volver
              </button>
            )}
            <button
              onClick={function() { step === 3 ? handleFinish() : setStep((step + 1) as Step) }}
              disabled={!canNext()}
              className="flex-1 flex items-center justify-center gap-2 font-sans text-xs tracking-widest uppercase px-6 py-4 transition-colors duration-200"
              style={{
                backgroundColor: canNext() ? '#FF6B00' : '#2A2A2A',
                color: '#FFFFFF',
                cursor: canNext() ? 'pointer' : 'not-allowed',
              }}
            >
              {step === 3 ? 'Confirmar pedido' : 'Continuar'}
              {step !== 3 && <ChevronRight size={14} strokeWidth={1.5} />}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}