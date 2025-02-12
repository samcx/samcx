import Link from 'next/link'
import Image from 'next/image'
import GitHub from '@/public/github.svg'
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
        𝕏
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
