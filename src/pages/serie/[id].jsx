import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Head from "next/head"

import { apiFetcher } from "../../services/api"
import Header from "../../components/Header"
import { SideBarContext } from "../../contexts/SideBarContext"
import Carousel from "../../components/Carousel"
import Footer from "../../components/Footer"

export default ({serie, video, similar}) => {
  const {query: {id}} = useRouter()
  const {setImageSideBar} = useContext(SideBarContext)

  useEffect(() => {
      setImageSideBar(serie?.poster_path)
  },[id])

  return(
    <div className="w-full h-full">
      <Head>
				<title>{serie.name}</title>
			</Head>
      <Header title={serie.name}/>
      <main className="px-5 pb-2">
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
            {serie.overview}
          </p>
          <p className="text-gray-300 font-serif">
            <span className="text-red-700 font-serif font-bold">data de estreia: </span> {serie.first_air_date?.split('-').reverse().join('/')}
          </p>
        </div>
        <div className="py-4">
          <h3 className="text-gray-300 font-bold tracking-wider text-xl py-2">
            Séries Relacionadas
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
  let serie = {}
  let video = []
  let similar = []
  try {
    serie = await apiFetcher(`tv/${id}`,"&language=pt-BR")
    video = await apiFetcher(`tv/${id}/videos`)
    console.log(video)
    similar = await apiFetcher(`tv/${id}/similar`)
  } catch (error) {
    return {
      redirect: {
        destination: "/series",
        permanent: false
      }
    }
  }
  return {
    props:{
      serie,
      video: video.results[0]?.key || "",
      similar: similar.results
    }
  }
}