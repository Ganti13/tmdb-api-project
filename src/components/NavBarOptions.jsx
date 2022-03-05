import Link from "next/link"

export default ({ children, title, path}) => {

    return (
        <div className="flex mt-2 group">
            <Link href={path}>
                <a className="p-2 w-full rounded hover:bg-background-700
                    bg-background-900 text-gray-500 hover:text-gray-200 flex items-center gap-2">
                    {children}
                    {title}
                </a>
            </Link>
        </div>
    )
}