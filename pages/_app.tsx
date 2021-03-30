import App from 'next/app'
import type { AppProps, AppContext } from 'next/app'
import '~/styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)

    return { ...appProps }
}

export default MyApp
