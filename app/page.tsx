import Image from 'next/image'
import retro from '../public/retro.svg'

export default function Page() {
  return (
    <main>
      <div className="sleeve">
        <Image
          alt="logo"
          height={20}
          src={retro}
          style={{ transform: 'rotate(90deg)' }}
        />
        <Image
          alt="logo"
          height={20}
          src={retro}
          style={{ transform: 'rotate(90deg)' }}
        />
      </div>
      <div className="sleeve">
        <Image
          alt="logo"
          height={20}
          src={retro}
          style={{ transform: 'rotate(-90deg)' }}
        />
        <Image
          alt="logo"
          height={20}
          src={retro}
          style={{ transform: 'rotate(-90deg)' }}
        />
      </div>
    </main>
  )
}
