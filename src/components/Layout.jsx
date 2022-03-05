import SideBar from "./SideBar";
import NavBar from './NavBar'

export default ({children}) => {

    return(
        <div className="flex">
            <NavBar/>
            <main className="ml-2 md:ml-40 lg:ml-60 mr-2 xl:mr-80 w-full overflow-hidden bg-background-800">
                {children}
            </main>
            <SideBar />
        </div>
    )

}