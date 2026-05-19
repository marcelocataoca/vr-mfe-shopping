import './index.css'
import greenLogo from './assets/images/green-logo.png'

function App() {
  return (
    <footer className="w-full h-[115px] bg-white">
      
      {/* Container centralizado */}
      <div
        className="
          max-w-[1280px]
          h-full
          mx-auto
          px-[25px]
          flex
          items-center
        "
      >
        
        {/* Logo */}
        <img
          src={greenLogo}
          alt="VR Benefícios"
          className="w-[50px] h-[50px] object-contain rounded-md"
        />     

        {/* Texto */}
        <p
          className="
            ml-[30px]
            text-[16px]
            text-black
            leading-none
          "
        >
          © 2024 VR Benefícios - Todos os direitos reservados
        </p>

      </div>
    </footer>
  )
}

export default App