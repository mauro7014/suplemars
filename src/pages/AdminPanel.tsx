import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Image, Package, Type, Users, Plus, Camera } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import type { Product } from '../types'

type Tab = 'hero' | 'productos' | 'materiales' | 'nosotras' | 'textos'

const emptyProduct: Product = {
  id: '',
  name: '',
  subtitle: '',
  description: '',
  price: 0,
  currency: 'ARS',
  category: 'proteinas',
  material: 'suero de leche',
  sizes: [
    { label: 'XS', available: true },
    { label: 'S',  available: true },
    { label: 'M',  available: true },
    { label: 'L',  available: true },
    { label: 'XL', available: true },
  ],
  images: [''],
  tags: [],
  isNew: false,
  isBestseller: false,
  stock: 10,
}

function ImageUploader({
  currentImage,
  onImageChange,
  label,
  aspect,
}: {
  currentImage: string
  onImageChange: (url: string) => void
  label: string
  aspect?: string
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = function(ev) {
      const result = ev.target?.result
      if (typeof result === 'string') onImageChange(result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="font-sans text-[10px] tracking-widest uppercase text-stone block">
        {label}
      </label>
      <div
        className="relative group cursor-pointer overflow-hidden bg-sand"
        style={{ aspectRatio: aspect || '16/9', maxHeight: '240px' }}
        onClick={function() { fileRef.current?.click() }}
      >
        {currentImage ? (
          <img src={currentImage} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera size={24} className="text-stone" strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
            <Camera size={24} className="text-linen" strokeWidth={1.5} />
            <span className="font-sans text-[10px] tracking-widest uppercase text-linen">
              Tocar para cambiar
            </span>
          </div>
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <div className="flex gap-2 items-center">
        <div className="flex-1 h-px bg-sand" />
        <span className="font-sans text-[9px] tracking-widest uppercase text-stone/50">o pegá una URL</span>
        <div className="flex-1 h-px bg-sand" />
      </div>
      <input
        type="text"
        value={currentImage.startsWith('data:') ? '' : currentImage}
        onChange={function(e) { onImageChange(e.target.value) }}
        placeholder="https://..."
        className="w-full bg-cream border border-sand px-4 py-2 font-sans text-xs text-ink focus:outline-none focus:border-bark"
      />
    </div>
  )
}

export function AdminPanel() {
  const navigate = useNavigate()
  const { store, updateStore, updateProduct, addProduct } = useStore()
  const [tab, setTab] = useState<Tab>('productos')
  const [editing, setEditing] = useState<Product | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newProduct, setNewProduct] = useState<Product>({ ...emptyProduct, id: 'p' + Date.now() })
  const [saved, setSaved] = useState(false)

  function handleLogout() {
    localStorage.removeItem('suplemars_admin')
    navigate('/admin')
  }

  function showSaved() {
    setSaved(true)
    setTimeout(function() { setSaved(false) }, 2000)
  }

  function handleSaveProduct() {
    if (!editing) return
    updateProduct(editing)
    setEditing(null)
    showSaved()
  }

  function handleAddProduct() {
    if (!newProduct.name || !newProduct.images[0]) return
    addProduct({ ...newProduct, id: 'p' + Date.now() })
    setIsAdding(false)
    setNewProduct({ ...emptyProduct, id: 'p' + Date.now() })
    showSaved()
  }

  const tabs = [
    { id: 'hero',       label: 'Hero',       icon: Image   },
    { id: 'productos',  label: 'Productos',  icon: Package },
    { id: 'materiales', label: 'Materiales', icon: Type    },
    { id: 'nosotras',   label: 'Nosotras',   icon: Users   },
  ]

  return (
    <div className="min-h-screen bg-linen">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-ink text-linen px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg tracking-widest">Suplemars</span>
          <span className="font-sans text-[9px] tracking-widest uppercase text-linen/40">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          {saved && (
            <span className="font-sans text-[10px] tracking-widest uppercase text-sage animate-fade-in">
              ✓ Guardado
            </span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase text-linen/60 hover:text-linen transition-colors duration-200"
          >
            <LogOut size={14} strokeWidth={1.5} />
            Salir
          </button>
        </div>
      </header>

      <div className="pt-14 flex h-screen">

        {/* Sidebar */}
        <aside className="w-48 bg-charcoal text-linen flex flex-col pt-6 flex-shrink-0">
          {tabs.map(function(item) {
            return (
              <button
                key={item.id}
                onClick={function() { setTab(item.id as Tab); setEditing(null); setIsAdding(false) }}
                className={
                  'flex items-center gap-3 px-6 py-4 font-sans text-[10px] tracking-widest uppercase transition-colors duration-200 text-left ' +
                  (tab === item.id ? 'bg-bark text-linen' : 'text-linen/50 hover:text-linen hover:bg-linen/5')
                }
              >
                <item.icon size={14} strokeWidth={1.5} />
                {item.label}
              </button>
            )
          })}
        </aside>

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto p-8">

          {/* TAB HERO */}
          {tab === 'hero' && (
            <div className="max-w-2xl flex flex-col gap-6">
              <h2 className="font-display text-2xl font-light text-ink">Foto Hero</h2>

              <ImageUploader
                currentImage={store.heroImage}
                onImageChange={function(url) { updateStore({ heroImage: url }) }}
                label="Imagen principal (pantalla completa)"
                aspect="16/9"
              />

              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Etiqueta superior</label>
                <input
                  type="text"
                  value={store.heroTag}
                  onChange={function(e) { updateStore({ heroTag: e.target.value }) }}
                  className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                />
              </div>

              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Título principal</label>
                <input
                  type="text"
                  value={store.heroTitle}
                  onChange={function(e) { updateStore({ heroTitle: e.target.value }) }}
                  className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                />
              </div>

              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Subtítulo</label>
                <input
                  type="text"
                  value={store.heroSubtitle}
                  onChange={function(e) { updateStore({ heroSubtitle: e.target.value }) }}
                  className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                />
              </div>

              <button
                onClick={showSaved}
                className="bg-ink text-linen px-6 py-3 font-sans text-[10px] tracking-widest uppercase hover:bg-earth transition-colors duration-200"
              >
                Guardar cambios
              </button>
            </div>
          )}

          {/* TAB PRODUCTOS — lista */}
          {tab === 'productos' && !editing && !isAdding && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-light text-ink">Productos</h2>
                <button
                  onClick={function() { setIsAdding(true) }}
                  className="flex items-center gap-2 bg-ink text-linen px-4 py-2 font-sans text-[10px] tracking-widest uppercase hover:bg-earth transition-colors duration-200"
                >
                  <Plus size={14} strokeWidth={1.5} />
                  Agregar producto
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {store.products.map(function(product) {
                  return (
                    <div key={product.id} className="bg-cream border border-sand">
                      <div
                        className="relative group cursor-pointer overflow-hidden h-40"
                        onClick={function() { setEditing(product) }}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1">
                            <Camera size={20} className="text-linen" strokeWidth={1.5} />
                            <span className="font-sans text-[9px] tracking-widest uppercase text-linen">Editar</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-lg font-light text-ink mb-1">{product.name}</h3>
                        <p className="font-sans text-[10px] tracking-wider text-stone uppercase mb-3">{product.category}</p>
                        <button
                          onClick={function() { setEditing(product) }}
                          className="w-full bg-ink text-linen px-4 py-2 font-sans text-[10px] tracking-widest uppercase hover:bg-earth transition-colors duration-200"
                        >
                          Editar producto
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* EDITOR PRODUCTO */}
          {tab === 'productos' && editing && (
            <div className="max-w-2xl">
              <button
                onClick={function() { setEditing(null) }}
                className="font-sans text-[10px] tracking-widest uppercase text-stone hover:text-ink transition-colors duration-200 mb-6"
              >
                ← Volver
              </button>
              <h2 className="font-display text-2xl font-light text-ink mb-6">Editar: {editing.name}</h2>

              <div className="flex flex-col gap-5">
                <ImageUploader
                  currentImage={editing.images[0]}
                  onImageChange={function(url) {
                    const imgs = [...editing.images]
                    imgs[0] = url
                    setEditing({ ...editing, images: imgs })
                  }}
                  label="Foto del producto — tocá para cambiar"
                  aspect="3/4"
                />

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Nombre</label>
                  <input
                    type="text"
                    value={editing.name}
                    onChange={function(e) { setEditing({ ...editing, name: e.target.value }) }}
                    className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Subtítulo</label>
                  <input
                    type="text"
                    value={editing.subtitle}
                    onChange={function(e) { setEditing({ ...editing, subtitle: e.target.value }) }}
                    className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Descripción</label>
                  <textarea
                    value={editing.description}
                    onChange={function(e) { setEditing({ ...editing, description: e.target.value }) }}
                    rows={4}
                    className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark resize-none"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Precio (ARS)</label>
                  <input
                    type="number"
                    value={editing.price}
                    onChange={function(e) { setEditing({ ...editing, price: Number(e.target.value) }) }}
                    className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Categoría</label>
                  <select
                    value={editing.category}
                    onChange={function(e) { setEditing({ ...editing, category: e.target.value as Product['category'] }) }}
                    className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                  >
                    {['proteinas','creatinas','pre-entreno','colageno','quemadores','aminoacidos','barritas','varios'].map(function(c) {
                      return <option key={c} value={c}>{c}</option>
                    })}
                  </select>
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-3">Talles disponibles</label>
                  <div className="flex gap-2 flex-wrap">
                    {editing.sizes.map(function(size, i) {
                      return (
                        <button
                          key={size.label}
                          onClick={function() {
                            const sizes = [...editing.sizes]
                            sizes[i] = { ...size, available: !size.available }
                            setEditing({ ...editing, sizes })
                          }}
                          className={
                            'px-4 py-2 font-sans text-xs tracking-wider border transition-all duration-200 ' +
                            (size.available ? 'border-ink bg-ink text-linen' : 'border-sand text-stone/40 line-through')
                          }
                        >
                          {size.label}
                        </button>
                      )
                    })}
                  </div>
                  <p className="font-sans text-[9px] text-stone/50 mt-2">Tocá para activar o desactivar cada talle</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSaveProduct}
                    className="flex-1 bg-ink text-linen px-6 py-3 font-sans text-[10px] tracking-widest uppercase hover:bg-earth transition-colors duration-200"
                  >
                    Guardar cambios
                  </button>
                  <button
                    onClick={function() { setEditing(null) }}
                    className="flex-1 border border-sand text-stone px-6 py-3 font-sans text-[10px] tracking-widest uppercase hover:border-bark hover:text-bark transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AGREGAR PRODUCTO */}
          {tab === 'productos' && isAdding && (
            <div className="max-w-2xl">
              <button
                onClick={function() { setIsAdding(false) }}
                className="font-sans text-[10px] tracking-widest uppercase text-stone hover:text-ink transition-colors duration-200 mb-6"
              >
                ← Volver
              </button>
              <h2 className="font-display text-2xl font-light text-ink mb-6">Nuevo producto</h2>

              <div className="flex flex-col gap-5">
                <ImageUploader
                  currentImage={newProduct.images[0]}
                  onImageChange={function(url) { setNewProduct({ ...newProduct, images: [url] }) }}
                  label="Foto del producto — tocá para subir"
                  aspect="3/4"
                />

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Nombre</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={function(e) { setNewProduct({ ...newProduct, name: e.target.value }) }}
                    className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Subtítulo</label>
                  <input
                    type="text"
                    value={newProduct.subtitle}
                    onChange={function(e) { setNewProduct({ ...newProduct, subtitle: e.target.value }) }}
                    className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Descripción</label>
                  <textarea
                    value={newProduct.description}
                    onChange={function(e) { setNewProduct({ ...newProduct, description: e.target.value }) }}
                    rows={4}
                    className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark resize-none"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Precio (ARS)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={function(e) { setNewProduct({ ...newProduct, price: Number(e.target.value) }) }}
                    className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Categoría</label>
                  <select
                    value={newProduct.category}
                    onChange={function(e) { setNewProduct({ ...newProduct, category: e.target.value as Product['category'] }) }}
                    className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark"
                  >
                    {['proteinas','creatinas','pre-entreno','colageno','quemadores','aminoacidos','barritas','varios'].map(function(c) {
                      return <option key={c} value={c}>{c}</option>
                    })}
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleAddProduct}
                    className="flex-1 bg-ink text-linen px-6 py-3 font-sans text-[10px] tracking-widest uppercase hover:bg-earth transition-colors duration-200"
                  >
                    Agregar producto
                  </button>
                  <button
                    onClick={function() { setIsAdding(false) }}
                    className="flex-1 border border-sand text-stone px-6 py-3 font-sans text-[10px] tracking-widest uppercase hover:border-bark hover:text-bark transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB MATERIALES */}
          {tab === 'materiales' && (
            <div className="max-w-2xl flex flex-col gap-6">
              <h2 className="font-display text-2xl font-light text-ink">Página Materiales</h2>

              <ImageUploader
                currentImage={store.materialesHero}
                onImageChange={function(url) { updateStore({ materialesHero: url }) }}
                label="Imagen hero de Materiales"
                aspect="16/9"
              />

              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Texto principal</label>
                <textarea
                  value={store.materialesTexto}
                  onChange={function(e) { updateStore({ materialesTexto: e.target.value }) }}
                  rows={5}
                  className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark resize-none"
                />
              </div>

              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-3">Galería de fotos</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  {store.galeriaImages.map(function(img, i) {
                    return (
                      <div key={i} className="relative group">
                        <div
                          className="aspect-square overflow-hidden bg-sand cursor-pointer"
                          onClick={function() {
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = 'image/*'
                            input.onchange = function(e) {
                              const file = (e.target as HTMLInputElement).files?.[0]
                              if (!file) return
                              const reader = new FileReader()
                              reader.onload = function(ev) {
                                const result = ev.target?.result
                                if (typeof result === 'string') {
                                  const imgs = [...store.galeriaImages]
                                  imgs[i] = result
                                  updateStore({ galeriaImages: imgs })
                                }
                              }
                              reader.readAsDataURL(file)
                            }
                            input.click()
                          }}
                        >
                          <img src={img} alt={'Galería ' + (i+1)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-all duration-300 flex items-center justify-center">
                            <Camera size={16} className="text-linen opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button
                  onClick={function() {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'image/*'
                    input.onchange = function(e) {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (!file) return
                      const reader = new FileReader()
                      reader.onload = function(ev) {
                        const result = ev.target?.result
                        if (typeof result === 'string') {
                          updateStore({ galeriaImages: [...store.galeriaImages, result] })
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                    input.click()
                  }}
                  className="flex items-center gap-2 border border-dashed border-stone text-stone px-4 py-2 font-sans text-[10px] tracking-widest uppercase hover:border-bark hover:text-bark transition-colors duration-200"
                >
                  <Plus size={14} strokeWidth={1.5} />
                  Agregar foto a la galería
                </button>
              </div>

              <button onClick={showSaved} className="bg-ink text-linen px-6 py-3 font-sans text-[10px] tracking-widest uppercase hover:bg-earth transition-colors duration-200">
                Guardar cambios
              </button>
            </div>
          )}

          {/* TAB NOSOTRAS */}
          {tab === 'nosotras' && (
            <div className="max-w-2xl flex flex-col gap-6">
              <h2 className="font-display text-2xl font-light text-ink">Página Nosotras</h2>

              <ImageUploader
                currentImage={store.nosotrasHero}
                onImageChange={function(url) { updateStore({ nosotrasHero: url }) }}
                label="Imagen hero de Nosotras"
                aspect="16/9"
              />

              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Historia de la marca</label>
                <textarea
                  value={store.nosotrasTexto}
                  onChange={function(e) { updateStore({ nosotrasTexto: e.target.value }) }}
                  rows={6}
                  className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark resize-none"
                />
              </div>

              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">Cita / Frase de Romina</label>
                <textarea
                  value={store.nosotrasQuote}
                  onChange={function(e) { updateStore({ nosotrasQuote: e.target.value }) }}
                  rows={3}
                  className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark resize-none"
                />
              </div>

              <button onClick={showSaved} className="bg-ink text-linen px-6 py-3 font-sans text-[10px] tracking-widest uppercase hover:bg-earth transition-colors duration-200">
                Guardar cambios
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}