import { useEffect, useState } from 'react'
import './StartupLoader.css'

const ringCount = 21

export function StartupLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(false), 2600)
    return () => window.clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="startup-loader" aria-label="Loading ZeroNext" role="status">
      <div className="loader-rings" aria-hidden="true">
        {Array.from({ length: ringCount }, (_, index) => (
          <span className="loader-ring" key={index} style={{ '--ring-index': index }} />
        ))}
      </div>
    </div>
  )
}
