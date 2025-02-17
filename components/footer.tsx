import Link from 'next/link'
import Image from 'next/image'
import GitHub from '@/public/github.svg'
import X from '@/public/x.svg'
import LinkedIn from '@/public/linkedin.svg'
import Instagram from '@/public/instagram.svg'

export default function Footer() {
  return (
    <footer>
      <Link href="https://github.com/samcx/" target="_blank">
        <Image
          src={GitHub}
          alt="GitHub icon"
          height={12}
          width={17}
          unoptimized
        />
      </Link>
      <Link href="https://x.com/samko_cx/" target="_blank">
        <Image
          src={X}
          alt="X icon"
          height={18}
          width={18}
          unoptimized
        />
      </Link>
      <Link href="https://www.linkedin.com/in/samcx/" target="_blank">
        <Image
          src={LinkedIn}
          alt="LinkedIn icon"
          height={13}
          width={20}
          unoptimized
        />
      </Link>
      <Link href="https://www.instagram.com/samko_cx/" target="_blank">
        <Image
          src={Instagram}
          alt="Instagram icon"
          height={20}
          width={20}
          unoptimized
        />
      </Link>
    </footer>
  )
}
