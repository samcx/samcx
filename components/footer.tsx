import Link from 'next/link'
import Image from 'next/image'
import GitHub from '@/svgs/github.svg'
import X from '@/svgs/x.svg'
import LinkedIn from '@/svgs/linkedin.svg'
import Instagram from '@/svgs/instagram.svg'

export default function Footer() {
  return (
    <footer>
      <div>
        <Link href="https://github.com/samcx/" target="_blank">
          <Image
            src={GitHub}
            alt="GitHub icon"
            height={12}
            width={17}
            priority
            unoptimized
          />
        </Link>
        <Link href="https://x.com/samko_cx/" target="_blank">
          <Image
            src={X}
            alt="X icon"
            height={18}
            width={18}
            priority
            unoptimized
          />
        </Link>
        <Link href="https://www.linkedin.com/in/samcx/" target="_blank">
          <Image
            src={LinkedIn}
            alt="LinkedIn icon"
            height={13}
            width={20}
            priority
            unoptimized
          />
        </Link>
        <Link href="https://www.instagram.com/samko_cx/" target="_blank">
          <Image
            src={Instagram}
            alt="Instagram icon"
            height={20}
            width={20}
            priority
            unoptimized
          />
        </Link>
      </div>
    </footer>
  )
}
