import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { SideBarContext } from "../contexts/SideBarContext"

export default () => {
    const { pathname } = useRouter()
		const { setImageSideBar } = useContext(SideBarContext)

    useEffect(() => {
      setImageSideBar("")
    },[])

    return (
        <div className="w-full">
            <Head>
                <title>Favoritos</title>
            </Head>
            <Header title={"Seus Favoritos"} path={pathname}/>
            <h1 className="w-full h-screen text-center text-2xl text-gray-300 font-bold tracking-wider p-5">
                Em breve...
            </h1>
            <Footer />
        </div>
    )
}