import { MdFavoriteBorder } from "react-icons/md"
import { FiPlay } from "react-icons/fi"
import { BiCameraMovie } from "react-icons/bi"
import { BsTrophy } from "react-icons/bs"
import Link from "next/link"

export default ({title, path}) => {

    return (
        <header className="w-full p-1 md:p-5 block rounded-b-lg bg-white">
            <div className="flex justify-between py-3 pb-5 border-b ">
                <h1 className="text-3xl w-full text-center font-semibold text-red-700">
                    {title}
                </h1>
            </div>
            <nav className="w-full">
                <ul className="flex w-full text-sm sm:text-base justify-center gap-3 md:gap-10 pr-3 mt-2 py-2 border-b-4 text-gray-500">
                    <li className={`flex items-center gap-1 sm:gap-2 font-semibold  
                        ${path === '/' && "text-gray-900"}`}>
                        <BiCameraMovie />
                        <Link href="/"><a>Filmes</a></Link>
                    </li>
                    <li className={`flex items-center gap-1 sm:gap-2 font-semibold 
                        ${path === '/series' && "text-gray-900"}`}>
                        <FiPlay />
                        <Link href="/series"><a>Series</a></Link>
                    </li>
                    <li className={`flex items-center gap-1 sm:gap-2 font-semibold 
                        ${path === '/favoritos' && "text-gray-900"}`}>
                        <MdFavoriteBorder />
                        <Link href="/favoritos"><a>Favoritos</a></Link>
                    </li>
                    <li className={`flex items-center gap-1 sm:gap-2 font-semibold 
                        ${path === '/populares' && "text-gray-900"}`}>
                        <BsTrophy />
                        <Link href="/populares"><a>Populares</a></Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}