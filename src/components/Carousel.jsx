import { useRouter } from "next/router"
import { useCallback, useRef } from "react"
import { BsArrowLeftSquare } from "react-icons/bs"
import { BsArrowRightSquare } from "react-icons/bs"

import styles from "../styles/carousel.module.css"

export default ({items}) => {
    const router = useRouter()
    const containerRef = useRef(null)

    const handleNextButton = useCallback(() => {
        containerRef.current.scrollLeft -= 96
    },[])

    const handlePrevButton = useCallback(() => {
        containerRef.current.scrollLeft += 96
    },[])

    const handleSelected = (selected) => {
        if(selected.title){
            router.replace(`/movie/${selected.id}`)
        }else {
            router.push(`/serie/${selected.id}`)
        }
    }

    return(
        <div className="relative border-b-2 pb-3 ">
            <div className="flex justify-between absolute right-0 top-0 -translate-y-9">
                <div className="gap-1 flex">
                    <div onClick={handleNextButton} className="cursor-pointer text-gray-400 hover:text-white">
                        <BsArrowLeftSquare size={30}/>
                    </div>
                    <div onClick={handlePrevButton} className="cursor-pointer text-gray-400 hover:text-white">
                        <BsArrowRightSquare size={30}/>
                    </div>
                </div>
            </div>
            <ul ref={containerRef} className={`flex overflow-x-auto gap-4 mt-2 ${styles.scrollNone}`}>
                {items.map(item => (
                    <div key={item.id} className="flex-none w-20 sm:w-26 flex-col">
                        <li className="flex-none"
                            onClick={() => handleSelected(item)}>
                            <img className="w-full cursor-pointer"
                            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                            onError={e => e.target.src = "/img/_.jpg"} 
                            alt={item.title || item.name}/>
                        </li>
                        <div className="flex flex-col px-1 w-full ">
                            <span className="text-gray-200 text-ellipsis text-xs w-full whitespace-nowrap
                            overflow-hidden">{item.title || item.name}</span>
                            <span className="text-gray-500 text-xs">
                                {item.release_date?.split('-').reverse().join('/') || item.first_air_date?.split('-').reverse().join('/')}
                            </span>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}