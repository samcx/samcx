import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <main className="page">
        <div>
          <p className="quote">
            <em>Eat at a local resturant tonight.</em> Get the cream sauce. Have
            a cold pint at 4 o&apos;clock in a mostly empty bar.{' '}
            <em>Go somewhere you&apos;ve never been.</em> Listen to someone you
            think may have nothing in common with you. Order the steak rare. Eat
            an oyster. <em>Be open to a world</em> where you may not understand
            or agree with the person next to you,{' '}
            <em>but have a drink with them anyways.</em> Eat slowly. Tip your
            server. Check in on your [family and] friends. Check in on yourself.{' '}
            <em>Enjoy the ride.</em>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
