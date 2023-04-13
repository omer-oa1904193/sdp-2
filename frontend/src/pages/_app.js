import "@/styles/reset.css"
import "@/styles/globals.css"
import Layout from "../components/layout"

export default function App({Component, pageProps}) {
    return (
        <Layout pageProps={pageProps}>
            <Component {...pageProps} />
        </Layout>
    )
}
