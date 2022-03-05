import Layout from '../components/Layout'
import '../styles/globals.css'
import SideBarProvider from '../contexts/SideBarContext'

function MyApp({ Component, pageProps }) {

  return (
    <SideBarProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SideBarProvider>
  )
}
export default MyApp
