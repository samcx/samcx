import Image from 'next/image'
import retro from './retro.svg'

export default function Sleeve() {
  return (
    <div className="sleeve">
      <Image
        alt="logo"
        height={20}
        priority
        src={retro}
        style={{ transform: 'rotate(90deg)' }}
        unoptimized
      />
      <Image
        alt="logo"
        height={20}
        priority
        src={retro}
        style={{ transform: 'rotate(90deg)' }}
        unoptimized
      />
    </div>
  )
}
