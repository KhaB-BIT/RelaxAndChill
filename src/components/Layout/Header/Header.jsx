import { useState, useContext } from "react"
import { StoreContext } from "../../../store"
import { BiFullscreen } from "react-icons/bi"
import { RiMenu3Fill } from "react-icons/ri"
import { IoMdSunny } from "react-icons/io"
import { MdModeNight } from "react-icons/md"
import { FiLogIn } from "react-icons/fi"
import { IoIosSettings } from "react-icons/io"
import "./Header.scss"
import Logo from "../../../assets/images/logo.webp"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { FaRegCirclePlay } from "react-icons/fa6"

const MENU_SETTING = [
    {
        icon: <FiLogIn />,
        title: "Login",
    },
    {
        icon: <IoIosSettings />,
        title: "General settings",
    },
    {
        icon: <IoMdInformationCircleOutline />,
        title: "How it works",
    },
    {
        icon: <FaRegCirclePlay />,
        title: "Playlist",
    },
]

const Header = () => {
    // Handle Toggle Weather
    const valueCT = useContext(StoreContext)
    const toggled = valueCT.toggled
    const setToggled = valueCT.setToggled
    const fullscreen = valueCT.fullscreen
    const setFullscreen = valueCT.setFullscreen
    const handleToggle = () => {
        setToggled((s) => !s)
    }
    // Handle Open Menu Setting
    const [openMenu, setOpenMenu] = useState(false)
    const handleOpenMenu = () => {
        setOpenMenu((s) => !s)
    }
    const handleFullScreen = () => {
        if (!fullscreen) {
            setFullscreen(true)
            const e = document.documentElement
            e.requestFullscreen()
        } else {
            setFullscreen(false)
            if (!document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.webkitExitFullscreen) {
                /* Safari */
                document.webkitExitFullscreen()
            } else if (document.msExitFullscreen) {
                /* IE11 */
                document.msExitFullscreen()
            }
        }
    }

    return (
        <div className="px-[48px] flex items-center justify-between z-50">
            <div>
                <img
                    className="object-cover h-[50px] w-[50px] rounded-md mt-2"
                    src={Logo}
                    alt="logo"
                />
            </div>
            <div className="flex items-center h-full gap-[16px] ">
                {/* Toggle Weather */}
                <button
                    className={` relative w-[61px] h-[30px] rounded-full border-none outline-none shadow-xl  ${
                        toggled ? "bg-[#f3a952]" : "bg-[#11216d]"
                    }`}
                    onClick={handleToggle}
                >
                    <div
                        className={`absolute transition-all ease-linear delay-150 top-[2px] bg-white w-[25px] h-[25px] rounded-full shadow-lg ${
                            toggled ? "translate-x-[34px]" : "translate-x-[2px]"
                        }`}
                    ></div>
                    <span
                        className={`absolute top-[6px] w-[17px] h-[17px] bg-[] ${
                            toggled ? "left-[8px]" : "right-[8px]"
                        }`}
                    >
                        {toggled ? (
                            <IoMdSunny color="white" />
                        ) : (
                            <MdModeNight color="white" />
                        )}
                    </span>
                </button>
                <button onClick={handleFullScreen}>
                    <span>
                        <BiFullscreen size="20px" color="white" />
                    </span>
                </button>
                <div
                    className="relative cursor-pointer"
                    onClick={handleOpenMenu}
                >
                    <span>
                        <RiMenu3Fill size="20px" color="white" />
                    </span>
                    {/* Setting Menu */}
                    {openMenu && (
                        <div className="z-40 absolute top-[40px] left-[-90px] w-[170px] rounded-[8px] overflow-hidden bg-[#070707] text-white cursor-pointer">
                            {MENU_SETTING.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-[16px] px-[14px] py-[7px] hover:bg-[#f3a952] cursor-pointer"
                                >
                                    <span>{item.icon}</span>
                                    <p className="text-[14px] font-[500]">
                                        {item.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
