import Head from "next/head"
import { useRouter } from "next/router"
import { useCallback, useContext, useEffect, useState } from "react"

import Card from "../components/Card"
import Carousel from "../components/Carousel"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ModalSearch from "../components/ModalSearch"
import { SideBarContext } from "../contexts/SideBarContext"
import { apiFetcher } from "../services/api"

export default ({carousel, seriesData}) => {
    const { pathname } = useRouter()
    const [page, setPage] = useState(3)
    const [series, setSeries] = useState(seriesData)
    const [activeModal, setActiveModal] = useState(false)
    const { setImageSideBar } = useContext(SideBarContext)

    const handleLoadMoreSeries = useCallback(async () => {
      const {results} = await apiFetcher("tv/top_rated", `&page=${page}&language=pt-BR`)
      setPage(prev => prev + 1)
      setSeries([...series, ...results])
    },[page, series])

    const handleActiveModal = () => {
      setActiveModal(prev => !prev)
    }

    useEffect(() => {
      setImageSideBar("")
    },[])

    return (
        <div className="w-full">
          <Head>
            <title>Séries</title>
          </Head>
          {activeModal && <ModalSearch type={"tv"} handleActiveModal={handleActiveModal}/>}
          <Header title={"Todas as Séries"} path={pathname}/>
          <div className="p-5">
              <h2 className="text-gray-400 text-xl">Séries recomendadas</h2>
              <Carousel items={carousel}/>
              <div className="w-full flex justify-between items-center px-5">
                <h3 className="text-gray-400 text-xl py-6">Últimas séries adicionadas</h3>
                <button className="outline-none px-4 py-1 bg-background-700 text-gray-300 rounded-sm
                hover:bg-gray-300 hover:text-gray-900"
                onClick={handleActiveModal}>
                  Pesquisar
                </button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-6">
                {series?.map(serie => (<Card key={serie.id} item={serie} type={"tv"} />))}
              </div>
              <div className="w-full flex justify-center mt-3">
                <button onClick={handleLoadMoreSeries}
                  className="outline-none p-2 rounded-full shadow-xl bg-background-700 text-white animate-bounce">
                  mais
                </button>
              </div>
          </div>
          
          <Footer />
        </div>
    )
}

export const getStaticProps = async () => {
  const carousel = await apiFetcher("tv/top_rated", "&language=pt-BR")
  const seriesData = await apiFetcher("tv/top_rated", "&page=2&language=pt-BR")
  return { 
    props:{
      carousel: carousel.results || [],
      seriesData: seriesData.results || []
    },
    revalidate: 60 * 60 * 6 // 6 hrs
  }
} 