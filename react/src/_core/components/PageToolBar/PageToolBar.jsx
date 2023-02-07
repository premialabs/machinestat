import { useContext, useState } from "react"
import AuthContext from "../../providers/AuthContext";
import { IconChevronDown, IconDashedCircle } from "../../utilities/svg-icons"

export default ({ hanldeSidebarCollapsed }) => {
    const auth = useContext(AuthContext)
    const [selectedMenu, setSelectedMenu] = useState();

    const handleClick = (e) => {
        if (e.target.name === selectedMenu) {
            setSelectedMenu();
        } else {
            setSelectedMenu(e.target.name);
        }
    }

    const logout = async () => {
        let res = await auth.logout();
    }

    return (
        <nav className="w-full shadow-md">
            <div className=" h-9 px-2 bg-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                    <button className="text-xs h-9 w-9 bg-orange-500 uppercase" onClick={() => hanldeSidebarCollapsed()}><IconDashedCircle className="mx-auto" width="15" color="#fff" /></button>
                    <div className="ml-2 h-9 flex items-center">
                        <div className="text-gray-200 font-inter">Mach Stat</div>
                    </div>
                </div>
                <div className="h-9 flex items-center">
                    <button onClick={(e) => handleClick(e)} name="cmdSupport" className={"px-2 h-full font-inter text-sm text-gray-200 " + (selectedMenu === "cmdSupport" ? "bg-gray-600" : "hover:bg-gray-600")}>
                        Support
                        <IconChevronDown className="ml-2 inline" width="13" color="rgb(229, 231, 235)" />
                    </button>
                    <button onClick={(e) => handleClick(e)} name="cmdAccount" className={"px-2 h-full font-inter text-sm text-gray-200  " + (selectedMenu === "cmdAccount" ? "bg-gray-600" : "hover:bg-gray-600")}>
                        Account
                        <IconChevronDown className="ml-2 inline" width="13" color="rgb(229, 231, 235)" />
                    </button>
                </div>
            </div>
            <div className={" h-9 px-2 flex bg-gray-600 justify-end items-center " + (selectedMenu === "cmdAccount" ? "" : "hidden")}>
                <button className="px-2 h-full font-inter text-sm text-gray-200 hover:bg-gray-500">Profile</button>
                <button className="px-2 h-full font-inter text-sm text-gray-200 hover:bg-gray-500">Settings</button>
                <button onClick={() => logout()} className="px-2 h-full font-inter text-sm text-gray-200 hover:bg-gray-500">Logout</button>
            </div>
            <div className={" h-9 px-2 flex bg-gray-600 justify-end items-center " + (selectedMenu === "cmdSupport" ? "" : "hidden")}>
                <button className="px-2 h-full font-inter text-sm text-gray-200 hover:bg-gray-500">Contact Us</button>
                <button className="px-2 h-full font-inter text-sm text-gray-200 hover:bg-gray-500">Email</button>
            </div>
        </nav>
    )
}
