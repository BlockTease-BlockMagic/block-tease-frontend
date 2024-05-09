
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const BorderGlowButton = ({ buttonFor }: { buttonFor: string }) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: '-100%', y: '-100%' })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x: `${x}px`, y: `${y}px` })
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <motion.button
      className="relative overflow-hidden rounded-md bg-transparent"
      ref={ref}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 20,
      }}
    >
      <span
        className={`absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(#FF3CD4_0%,transparent_70%)] `}
        style={
          {
            left: mousePosition.x,
            top: mousePosition.y,
          } as any
        }
      ></span>

      <div className="relative flex items-center gap-1 z-10 m-[1px] rounded-sm border-[#FF008E] text-white border  px-4 py-1 text-xs  backdrop-blur-sm">
        {buttonFor}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>

      </div>
    </motion.button>
  )
}

export default BorderGlowButton