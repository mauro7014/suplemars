import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export function AdminLogin() {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState(false)

  function handleLogin() {
    if (user === 'suplemars' && pass === '1234') {
      localStorage.setItem('ricatipa_admin', 'true')
      navigate('/admin/panel')
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-linen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-light tracking-widest text-ink mb-2">
            RICATIPA
          </h1>
          <p className="font-sans text-[10px] tracking-widest uppercase text-stone">
            Panel de administración
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={user}
              onChange={function(e) { setUser(e.target.value); setError(false) }}
              className="w-full bg-cream border border-sand px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-bark transition-colors duration-200"
              placeholder="usuario"
            />
          </div>

          <div>
            <label className="font-sans text-[10px] tracking-widest uppercase text-stone block mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={pass}
                onChange={function(e) { setPass(e.target.value); setError(false) }}
                onKeyDown={function(e) { if (e.key === 'Enter') handleLogin() }}
                className="w-full bg-cream border border-sand px-4 py-3 pr-12 font-sans text-sm text-ink focus:outline-none focus:border-bark transition-colors duration-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={function() { setShowPass(!showPass) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors duration-200 p-1"
              >
                {showPass
                  ? <EyeOff size={16} strokeWidth={1.5} />
                  : <Eye size={16} strokeWidth={1.5} />
                }
              </button>
            </div>
          </div>

          {error && (
            <p className="font-sans text-[10px] tracking-wider text-copper uppercase">
              Usuario o contraseña incorrectos
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-ink text-linen px-6 py-4 font-sans text-xs tracking-widest uppercase hover:bg-earth transition-colors duration-300 mt-2"
          >
            Ingresar
          </button>
        </div>

        <p className="font-sans text-[9px] tracking-wider text-stone/50 text-center mt-8 uppercase">
          Powered by <strong className="text-stone/70">NeoFlux</strong>
        </p>

      </div>
    </div>
  )
}