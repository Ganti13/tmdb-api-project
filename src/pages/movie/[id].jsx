import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Head from "next/head"

import { apiFetcher } from "../../services/api"
import Header from "../../components/Header"
import {SideBarContext} from "../../contexts/SideBarContext"
import Carousel from "../../components/Carousel"
import Footer from "../../components/Footer"

export default ({video, movie, similar}) => {
  const { query: { id } } = useRouter()
  const {setImageSideBar} = useContext(SideBarContext)

  useEffect(() => {
    setImageSideBar(movie?.poster_path)
  },[id])

  return(
    <div className="w-full h-full">
      <Head>
				<title>{movie.title}</title>
			</Head>
      <Header title={movie.title}/>
      <main className="px-5  pb-2">
        <div className="flex justify-center py-4">
          <iframe width="560" 
            height="315" 
            src={`https://www.youtube.com/embed/${video}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
          </iframe>
        </div>
        <div className="bg-background-900 rounded-md p-2">
        <h2 className="text-red-700 font-serif font-bold text-lg ">
						Resumo
					</h2>
          <p className="text-gray-300 font-serif">
            {movie.overview}
          </p>
          <p className="text-gray-300 font-serif">
            <span className="text-red-700 font-serif font-bold">data de estreia: </span> {movie.release_date?.split('-').reverse().join('/')}
          </p>
        </div>
        <div className="py-4">
          <h3 className="text-gray-300 font-bold tracking-wider text-xl py-2">
            Filmes Relacionados
          </h3>
          <Carousel items={similar} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getStaticPaths = async () => {

  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps = async ({params}) => {
  const { id } = params
  let movie = {}
  let video = []
  let similar = []
  try{
    movie = await apiFetcher(`movie/${id}`, "&language=pt-BR")
    video = await apiFetcher(`movie/${id}/videos`, "&language=pt-BR")
    similar = await apiFetcher(`movie/${id}/similar`, "&language=pt-BR")
  }catch(error){
    return{
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props:{
      movie: movie,
      video: video.results[0]?.key || "",
      similar: similar.results
    },
    revalidate: 60 * 60 * 6 // 6 hrs
  }
}