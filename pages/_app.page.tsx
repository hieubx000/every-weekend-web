import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { wrapper } from '@/redux/store';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)
