import { useRouter } from "next/router"
import { useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"

import { apiFetcher } from "../services/api"
import Card from "./Card"


export default ({type, handleActiveModal}) => {
	const [search, setSearch] = useState("")
	const [items, setItems] = useState([])
	const router = useRouter()

	const handleSearch = async e => {
		e.preventDefault()
		if(search.length < 1) {return}
		const {results} = await apiFetcher(`search/${type}`, `&query=${search}&language=pt-BR`)
		if(!results){
			return setItems([])
		}
		setItems(results)
	}

	return(
		<div className="fixed z-50 bg-black bg-opacity-60 inset-0 grid place-items-center">
				<div className="w-3/4 h-4/5 flex items-center flex-col py-4
				bg-background-800 overflow-y-auto relative rounded-md">
					<button
					className="outline-none text-red-700 absolute top-2 right-2" 
					onClick={handleActiveModal}>
						<AiFillCloseCircle size={36}/>
					</button>
					<form onSubmit={handleSearch}>
						<input type="text"
						value={search}
						onChange={e => setSearch(e.target.value)}
						className="p-2 outline-none"
						placeholder="Pesquisar"
						/>
					</form>
					<div className="w-full flex flex-wrap gap-2 justify-center p-2">
						{items.length < 1 ? <div className="bg-background-700 w-full absolute 
						top-1/2 -translate-y-1/2 flex justify-center p-10">
							<h1 className="text-5xl text-gray-400 -tracking-wider font-sans font-bold">
								{type === "tv" ? "SÉRIES" : "FILMES"}
							</h1>
						</div>
						: items?.map(item => <Card key={item.id}
							item={item} type={item.title ? "movie" : "tv"}/>)}
					</div>
				</div>
		</div>
	)
}