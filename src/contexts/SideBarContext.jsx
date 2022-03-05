import { createContext, useState } from "react";


export const SideBarContext = createContext()

export default ({ children }) => {
    const [imageSideBar, setImageSideBar] = useState("img/_.jpg")

    return(
        <SideBarContext.Provider value={{imageSideBar, setImageSideBar}}>
            { children }
        </SideBarContext.Provider>
    )
}