import { useRouter } from "next/router"
import { useCallback, useContext, useEffect, useState } from "react"

import Header from "../components/Header"
import Card from "../components/Card"

import {apiFetcher} from '../services/api'
import Head from "next/head"
import { SideBarContext } from "../contexts/SideBarContext"
import Footer from "../components/Footer"

export default ({moviesData}) => {
	const { pathname } = useRouter()
	const [movies, setMovies] = useState(moviesData.results)
	const [page, setPage] = useState(2)
	const { setImageSideBar } = useContext(SideBarContext)

	const handleLoadMoreMovies = useCallback(async () => {
		const {results} = await apiFetcher("movie/popular", `&page=${page}&language=pt-BR`)
		setPage(prev => prev + 1)
		setMovies([...movies, ...results])
  	},[page, movies])

	useEffect(() => {
		setImageSideBar("")
	},[])

	return (
		<div className="w-full">
			<Head>
				<title>Populares</title>
			</Head>
			<Header title={"Filmes Populares"} path={pathname}/>
			<div className="w-full p-4 justify-center flex flex-wrap gap-4">
				{movies?.map(movie => <Card key={movie.id} item={movie}/> )}
			</div>
			<div className="w-full flex justify-center py-3">
				<button onClick={handleLoadMoreMovies}
					className="outline-none p-2 rounded-full shadow-xl bg-background-700 text-white animate-bounce">
						mais
				</button>
			</div>
			<Footer />
		</div>
	)
}

export const getStaticProps = async () => {
  const moviesData = await apiFetcher("movie/popular", "&language=pt-BR")
  return { 
    props:{
      moviesData: moviesData || []
    },
	revalidate: 60 * 60 * 6 // 6 hrs
  }
} 
