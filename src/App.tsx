import { useEffect, useState } from 'react'

declare global {
  interface Window {
    api?: { ping: () => string }
  }
}

export default function App() {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setMsg(window.api?.ping?.() ?? 'api not available')
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>Electron + React + Vite + TS</h1>
      <p>Preload says: <b>{msg}</b></p>
      <p>Edit <code>src/App.tsx</code> en bewaar om HMR te zien.</p>
    </div>
  )
}