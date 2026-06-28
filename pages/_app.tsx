import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AdvertisementModal from '../components/AdvertisementModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AdvertisementModal />
      <Component {...pageProps} />
    </>
  );
}
