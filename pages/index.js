import Page from '@components/page'
import Retro from '@components/retro'

export default function Index() {
  return (
    <Page>
      <Retro />
    </Page>
  )
}

export const config = { unstable_runtimeJS: false }
