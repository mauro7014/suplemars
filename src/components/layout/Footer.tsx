export function Footer() {
  const year = new Date().getFullYear()
  const legal = ['Terminos', 'Privacidad', 'Devoluciones']

  return (
    <footer className="bg-cream border-t border-sand/60 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col items-center gap-4 mb-6">
          <span className="font-sans text-[10px] tracking-widest uppercase text-stone">
            Medios de pago
          </span>

          <div className="flex flex-wrap justify-center items-center gap-4">

            {/* Visa */}
            <svg viewBox="0 0 780 500" width="48" height="30" xmlns="http://www.w3.org/2000/svg">
              <rect width="780" height="500" rx="40" fill="#1A1F71"/>
              <text x="390" y="330" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="220" fill="white" letterSpacing="-10">VISA</text>
            </svg>

            {/* Mastercard */}
            <svg viewBox="0 0 780 500" width="48" height="30" xmlns="http://www.w3.org/2000/svg">
              <rect width="780" height="500" rx="40" fill="#252525"/>
              <circle cx="290" cy="250" r="160" fill="#EB001B"/>
              <circle cx="490" cy="250" r="160" fill="#F79E1B"/>
              <path d="M390 135 A160 160 0 0 1 490 250 A160 160 0 0 1 390 365 A160 160 0 0 0 290 250 A160 160 0 0 0 390 135Z" fill="#FF5F00"/>
            </svg>

            {/* Amex */}
            <svg viewBox="0 0 780 500" width="48" height="30" xmlns="http://www.w3.org/2000/svg">
              <rect width="780" height="500" rx="40" fill="#2E77BC"/>
              <text x="390" y="310" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="140" fill="white" letterSpacing="2">AMEX</text>
            </svg>

            {/* PayPal */}
            <svg viewBox="0 0 780 500" width="48" height="30" xmlns="http://www.w3.org/2000/svg">
              <rect width="780" height="500" rx="40" fill="#F7F7F7" stroke="#e0e0e0" strokeWidth="8"/>
              <text x="390" y="290" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="130" fill="#003087">Pay</text>
              <text x="490" y="380" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="130" fill="#009CDE">Pal</text>
            </svg>

            {/* Transferencia */}
            <svg viewBox="0 0 780 500" width="48" height="30" xmlns="http://www.w3.org/2000/svg">
              <rect width="780" height="500" rx="40" fill="#1A1F71"/>
              <text x="390" y="280" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="100" fill="white">TRANSFER</text>
              <text x="390" y="390" textAnchor="middle" fontFamily="Arial" fontSize="80" fill="#aac4ff">bancaria</text>
            </svg>

          </div>

          <p className="font-sans text-[10px] tracking-wider mt-1" style={{ color: '#3a3a3a' }}>
            Powered by <strong style={{ color: '#111111', fontWeight: 700 }}>NeoFlux</strong>
          </p>
        </div>

        <div className="w-16 h-px bg-sand mx-auto mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] tracking-wider text-stone uppercase">
            {year} CommerceFlux - Todos los derechos reservados
          </p>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {legal.map(function(l) {
              return (
                <a key={l} href="#" className="font-sans text-[10px] tracking-wider text-stone hover:text-bark transition-colors duration-300 uppercase">
                  {l}
                </a>
              )
            })}
          </nav>
        </div>

      </div>
    </footer>
  )
}