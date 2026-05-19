import React, { Suspense } from 'react'
import CartModal from './components/CartModal'

const Header = React.lazy(() => import('header/Header'))
const Footer = React.lazy(() => import('footer/Footer'))
const Cards = React.lazy(() => import('cards/Cards'))

function App() {
  return (
    <div>
      <Suspense fallback={<p>Loading Header...</p>}><Header /></Suspense>
      <Suspense fallback={<p>Loading Cards...</p>}><Cards /></Suspense>
      <Suspense fallback={<p>Loading Footer...</p>}><Footer /></Suspense>
      <CartModal />
    </div>
  )
}

export default App