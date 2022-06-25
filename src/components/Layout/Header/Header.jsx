import { useState, useContext } from "react";
import { StoreContext } from "../../../store";
import "./Header.scss";

const MENU_SETTING = [
    {
        icon: "https://lofi.co/icons/profile.svg",
        title: "Login",
    },
    {
        icon: "https://lofi.co/icons/settings.svg",
        title: "Pricing",
    },
    {
        icon: "https://lofi.co/icons/settings_h.svg",
        title: "General settings",
    },
    {
        icon: "https://lofi.co/icons/message.svg",
        title: "Contact us",
    },
    {
        icon: "https://lofi.co/icons/settings_h.svg",
        title: "How it works",
    },
    {
        icon: "https://lofi.co/icons/spotify2.svg",
        title: "Playlist",
    },
    {
        icon: "https://lofi.co/icons/playlist.svg",
        title: "Submit music",
    },
    {
        icon: "https://lofi.co/icons/info.svg",
        title: "About us",
    },
];

const Header = () => {
    // Handle Toggle Weather
    const valueCT = useContext(StoreContext);
    const toggled = valueCT.toggled
    const setToggled = valueCT.setToggled
    const fullscreen = valueCT.fullscreen
    const setFullscreen = valueCT.setFullscreen
    const handleToggle = () => {
        setToggled((s) => !s);
    };
    // Handle Open Menu Setting
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = () => {
        setOpenMenu((s) => !s);
    };
    const handleFullScreen = () => {
        if (!fullscreen) {
            setFullscreen(true);
            const e = document.documentElement;
            e.requestFullscreen();
        } else {
            setFullscreen(false);
            if (!document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                /* IE11 */
                document.msExitFullscreen();
            }
        }
    }

    return (
        <div className="px-[48px] flex items-center justify-between z-50">
            <div>
                {/* Logo */}
                <img
                    className="object-cover h-[100px] w-[178px]"
                    src="https://lofi.co/static/media/logo.0cbf9e63b4a021661126.gif"
                    alt="logo"
                />
            </div>
            <div className="flex items-center h-full gap-[16px] ">
                {/* Toggle Weather */}
                <button
                    className={` relative w-[61px] h-[30px] rounded-full border-none outline-none shadow-xl  ${toggled ? "bg-[#f3a952]" : "bg-[#11216d]"
                        }`}
                    onClick={handleToggle}
                >
                    <div
                        className={`absolute transition-all ease-linear delay-150 top-[2px] bg-white w-[25px] h-[25px] rounded-full shadow-lg ${toggled ? "translate-x-[34px]" : "translate-x-[2px]"
                            }`}
                    ></div>
                    <img
                        className={`absolute top-[6px] w-[17px] h-[17px] bg-[] ${toggled ? "left-[8px]" : "right-[8px]"
                            }`}
                        src={
                            toggled
                                ? "https://lofi.co/static/media/night.5e06c080aafe377b5acdc9d515f8def6.svg"
                                : "https://lofi.co/static/media/day.d259f96b006901d75223f789f5835736.svg"
                        }
                        alt="iconWeather"
                    />
                </button>
                <div className="hidden md:flex items-center cursor-pointer gap-[8px] bg-gradient-to-l px-[16px] py-[5px] rounded-[8px] from-[#e18660e6] to-[#f4ca5de6]">
                    <h3 className="text-[32px] leading-[36px]">🚀</h3>
                    <p className="font-bold leading-[18px] text-white text-[14px]">
                        Access +20 scenes
                        <br />& more with premium
                    </p>
                </div>
                <button className="text-white bg-[#ffffff40] hover:opacity-60 transition-opacity ease-in delay-100 font-[500] px-[16px] py-[6px] text-[14px] rounded-[8px]">
                    Sign up
                </button>
                <img
                    src="https://lofi.co/icons/share.svg"
                    alt="iconMenu"
                    className="mt-[6px] cursor-pointer hover:opacity-60 transition-opacity ease-in delay-100"
                />
                <button onClick={handleFullScreen}>
                    <img
                        src="https://lofi.co/icons/fullscreen.svg"
                        alt="iconMenu"
                        className="mt-[6px] cursor-pointer hover:opacity-60 transition-opacity ease-in delay-100"
                    />
                </button>
                <div className="relative" onClick={handleOpenMenu}>
                    <img
                        src="https://lofi.co/icons/menu-3.svg"
                        alt="iconMenu"
                        className="mt-[6px] cursor-pointer hover:opacity-60 transition-opacity ease-in delay-100"
                    />
                    {/* Setting Menu */}
                    {openMenu && (
                        <div className="z-40 absolute top-[40px] left-[-90px] w-[170px] rounded-[8px] overflow-hidden bg-[#070707] text-white">
                            {MENU_SETTING.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-[16px] px-[14px] py-[7px] hover:bg-[#f3a952] cursor-pointer"
                                >
                                    <img src={item.icon} alt="iconSetting" />
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
    );
};

export default Header;
