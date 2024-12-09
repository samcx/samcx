import Image from 'next/image'
import retro from './retro.svg'

export default function Home() {
  return (
    <main>
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
      <div className="sleeve">
        <Image
          alt="logo"
          height={20}
          priority
          src={retro}
          style={{ transform: 'rotate(-90deg)' }}
          unoptimized
        />
        <Image
          alt="logo"
          height={20}
          priority
          src={retro}
          style={{ transform: 'rotate(-90deg)' }}
          unoptimized
        />
      </div>
    </main>
  )
}
