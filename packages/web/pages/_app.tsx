import { config } from '@fortawesome/fontawesome-svg-core'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import SSRProvider from 'react-bootstrap/SSRProvider'
import AppFooter from '../fragments/footer/footer'
import AppNavbar from '../fragments/navbar/navbar'
import '../styles/globals.scss'


config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <SSRProvider>
      <DefaultSeo titleTemplate='%s | Daily ワトリ' defaultTitle='Daily ワトリ' />
      <AppNavbar />

      <Component {...pageProps} />

      <AppFooter />
    </SSRProvider>
  </>
}

export default MyApp
