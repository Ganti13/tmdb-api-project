import { useRouter } from "next/router"


export default ({item, type}) => {
    const router = useRouter()
    // 
    // 
    return (
        <div className="grid grid-cols-1">
            <div className="w-full relative hover:before:absolute hover:before:inset-0 hover:before:bg-black
            hover:before:bg-opacity-40 hover:before:pointer-events-none"
            onClick={() => router.push(type === "tv" ? `/serie/${item.id}` : `/movie/${item.id}`)}>
                <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} alt={item.title || item.name}
                    onError={e => e.target.src = "/img/image-not-found.jpg"} className="object-cover w-full cursor-pointer"/>
            </div>
            <span className="px-1 w-full text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                {item.title || item.name}
            </span>
            <span className="px-1 w-full text-sm text-gray-500 overflow-hidden text-ellipsis">
                {item.release_date?.split('-').reverse().join('/') || item.first_air_date?.split('-').reverse().join('/')}
            </span>
        </div>
    )
}