import logo from '../assets/logo.png'

export function BrandLogo({ className = 'h-8 w-8' }) {
  return (
    <img
      src={logo}
      alt="ZeroNext"
      className={`object-contain drop-shadow-[0_0_5px_rgba(56,189,248,0.4)] ${className}`}
    />
  )
}
