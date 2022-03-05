import Head from "next/head"
import { useRouter } from "next/router"
import { useCallback, useContext, useEffect, useState } from "react"

import Card from "../components/Card"
import Carousel from "../components/Carousel"
import Header from '../components/Header'
import Footer from '../components/Footer'
import ModalSearch from "../components/ModalSearch"
import {SideBarContext} from "../contexts/SideBarContext"
import { apiFetcher } from "../services/api"

export default ({carousel, moviesData}) => {
  const { pathname } = useRouter()
  const [page, setPage] = useState(3)
  const [movies, setMovies] = useState(moviesData)
  const [activeModal, setActiveModal] = useState(false)
  const { setImageSideBar } = useContext(SideBarContext)

  const handleLoadMoreMovies = useCallback(async () => {
    console.log(movies)
    const {results} = await apiFetcher("movie/top_rated", `&page=${page}&language=pt-BR`)
    setPage(prev => prev + 1)
    setMovies([...movies, ...results])
  },[page, movies])

  const handleActiveModal = () => {
    setActiveModal(prev => !prev)
  }

  useEffect(() => {
    setImageSideBar("")
  },[])

  return (
    <div className="w-full">
      <Head>
				<title>Filmes</title>
			</Head>
      {activeModal && <ModalSearch type={"movie"} handleActiveModal={handleActiveModal}/>}
      <Header title={"Todos os Filmes"} path={pathname}/>
      <div className="p-5">
        <h2 className="text-gray-400 text-xl">Filmes recomendados</h2>
        <Carousel items={carousel}/>
        <div className="w-full flex justify-between items-center px-5">
          <h3 className="text-gray-400 text-xl py-6">Últimos filmes adicionados</h3>
            <button className="outline-none px-4 py-1 bg-background-700 text-gray-300 rounded-sm
            hover:bg-gray-300 hover:text-gray-900"
            onClick={handleActiveModal}>
              Pesquisar
            </button>
        </div>
        <div className="flex gap-4 w-full flex-wrap p-2 justify-center">
          {movies?.map(movie => (<Card  key={movie.id} item={movie} />))}
        </div>
        <div className="w-full flex justify-center mt-3">
          <button onClick={handleLoadMoreMovies}
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
  const carousel = await apiFetcher("movie/top_rated", "&language=pt-BR")
  const moviesData = await apiFetcher("movie/top_rated", "&page=2&language=pt-BR")

  return { 
    props:{
      carousel: carousel.results || [],
      moviesData: moviesData.results || []
    },
    revalidate: 60 * 60 * 6 // 6 hrs 
  }
} 

