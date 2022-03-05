import { useContext } from "react"

import { SideBarContext } from "../contexts/SideBarContext"

export default () => {
	const {imageSideBar} = useContext(SideBarContext)

	return(
		<aside className="w-80 hidden xl:block bg-background-800 h-screen fixed py-20 right-0">
			<div className="w-full rounded-l-lg flex justify-center items-center p-10">
				<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${imageSideBar}`} 
				onError={e => e.target.src = "/img/_.jpg"}
				alt="Side bar image" />
			</div>
		</aside>
	)
}