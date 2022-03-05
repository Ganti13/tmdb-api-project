import { MdFavoriteBorder } from "react-icons/md"
import { FiPlay } from "react-icons/fi"
import { BiCameraMovie } from "react-icons/bi"
import { BsTrophy } from "react-icons/bs"

import NavBarOptions from "./NavBarOptions"

export default () => {
    
    return(
        <nav className="hidden md:flex md:flex-col md:w-40 lg:w-60 bg-background-800 fixed left-0 h-screen p-4">
            <h1 className="text-center text-3xl lg:text-5xl text-gray-100 font-bold pb-6">
                <span className="text-red-600">M</span>ovie<span className="text-red-600">S</span>
            </h1>
            <form 
            onSubmit={e => e.preventDefault()}
            className="flex justify-center mb-4">
                <input placeholder=" Pesquisar"
                    className="bg-background-700 border border-gray-900 p-1 w-full"/>
            </form>
            <NavBarOptions title={"Filmes"} path={"/"}><BiCameraMovie/></NavBarOptions>
            <NavBarOptions title={"Séries"} path={"/series"}><FiPlay/></NavBarOptions>
            <NavBarOptions title={"Favoritos"} path={"/favoritos"}><MdFavoriteBorder/></NavBarOptions>
            <NavBarOptions title={"Populares"} path={"/populares"}><BsTrophy/></NavBarOptions>
        </nav>
    )
}