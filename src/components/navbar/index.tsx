import {
  Bars3Icon,
  CircleStackIcon,
  PlusIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { NavBarData } from "./NavBarData";
import { useMediaQuery } from "react-responsive";
import React, { useEffect, useRef, useState } from "react";
import SubmissionBox from "../submissonbox";

const Navbar = React.memo(() => {
  const flexBetween = "flex justify-start items-center";
  const [isMenuToggle, setIsMenuToggle] = useState<boolean>(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0);
  const [isAddMenuVisible, setIsAddMenuVisible] = useState<boolean>(false);
  const [isNewModelWindowVisible, setIsNewModelWindowVisible] = useState<boolean>(false);

  const location = useLocation();
  const isAboveMedium = useMediaQuery({ query: "(min-width: 768px)" });
  const popupRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  let timeoutId: NodeJS.Timeout;

  const handleClickOutside = (
    ref: React.RefObject<HTMLDivElement>,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
  ) =>
  (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setState(false);
    }
  };

  useEffect(() => {
    const clickOutsidePopup = handleClickOutside(popupRef, setIsAddMenuVisible);
    // const clickOutsideNavbar = handleClickOutside(navbarRef, setIsMenuToggle);

    document.addEventListener("click", clickOutsidePopup);
    // document.addEventListener("click", clickOutsideNavbar);

    return () => {
      document.removeEventListener("click", clickOutsidePopup);
      // document.removeEventListener("click", clickOutsideNavbar);
    };
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentMenuItem = NavBarData.findIndex(
      (item) => item.path === currentPath,
    );
    setSelectedMenuItem(currentMenuItem);
  }, [location]);

  return (
    <div className="w-screen h-screen">
     {
        isNewModelWindowVisible && (
          <SubmissionBox setIsNewModelWindowVisible={setIsNewModelWindowVisible} />
        )
     }
    
    <aside className="h-screen" ref={navbarRef}>
      <nav className={`${isAboveMedium ? "w-full" : "w-0"} h-full`}>
        {isAboveMedium || isMenuToggle
          ? (
            <div
              className={` ${
                isMenuToggle ? "w-64" : "w-20"
              } flex flex-col p-2 h-full bg-white border-r shadow-sm ease-in-out`}
            >
              {/* TOGGLE AND LOGO */}
              <div className={`${flexBetween} w-64 p-2`}>
                <button>
                  <Bars3Icon
                    className="h-12 w-12 mr-4 ml-0 p-2 bg-grey-50 hover:bg-gray-100 rounded-full"
                    onClick={() => setIsMenuToggle(!isMenuToggle)}
                  />
                </button>
                <img
                  src="https://img.logoipsum.com/243.svg"
                  className={`${isMenuToggle ? "w-32" : "w-0"} duration-75`}
                />
              </div>
              {/* ADD BUTTON */}
              <div
                className={`${flexBetween} ${
                  isMenuToggle ? "w-32" : "w-16"
                } mb-3 p-2 border rounded-full bg-grey-50 hover:bg-gray-100 relative`} // Add relative here
                onClick={() => setIsAddMenuVisible(!isAddMenuVisible)}
                ref={popupRef}
              >
                <button>
                  <PlusIcon className="h-12 w-12 ml-0 p-2 bg-grey-50 hover:bg-gray-100 rounded-full" />
                </button>
                <div
                  className={`${isMenuToggle ? "ml-3" : "ml-0"} duration-75`}
                >
                  {isMenuToggle ? "Add" : ""}
                </div>
              </div>
              {isAddMenuVisible && (
                <div className="absolute top-36 left-2 w-60 h-32 border rounded-lg bg-white">
                  {/* menu options... */}
                  <div className="flex flex-col gap-2 m-4">
                    <button className="flex text-md w-full hover:bg-gray-200 p-2" onClick={() => setIsNewModelWindowVisible(true)}>
                      <PuzzlePieceIcon className="h-7 w-7 mr-2" />
                      New Model
                    </button>
                    <button className="flex text-md w-full hover:bg-gray-200 p-2">
                      <CircleStackIcon className="h-7 w-7 mr-2" />
                      New Dataset
                    </button>
                  </div>
                </div>
              )}
              {/* MENU ITEMS */}
              <ul
                className="overflow-y-auto overflow-x-hidden"
                onMouseEnter={() => {
                  if (isAboveMedium) {
                    timeoutId = setTimeout(() => {
                      setIsMenuToggle(true);
                    }, 400); // 500ms delay
                  }
                }}
                onMouseLeave={() => {
                  if (isAboveMedium) {
                    clearTimeout(timeoutId);
                    setIsMenuToggle(false);
                  }
                }}
              >
                {NavBarData.map((item, index) => {
                  return (
                    <Link
                      to={item.path}
                      key={index}
                      onClick={() => {
                        setSelectedMenuItem(index);
                      }}
                    >
                      <li
                        className={`${
                          selectedMenuItem === index
                            ? "bg-gray-100 border-r-4 border-r-indigo-500"
                            : "hover:bg-gray-100"
                        } h-16 flex justify-start items-center hover:bg-gray-100 cursor-pointer duration-75"`}
                      >
                        <div className="flex justify-start items-center">
                          <div className="ml-4">
                            <item.icon className="h-7 w-7 mr-2" />
                          </div>
                          <div
                            className={`${
                              isMenuToggle ? "ml-4" : "ml-0"
                            } text-md`}
                          >
                            {isMenuToggle ? item.title : ""}
                          </div>
                        </div>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )
          : (
            <div className={`${flexBetween} pt-4 pl-4`}>
              <button>
                <Bars3Icon
                  className="h-12 w-12 mr-4 ml-0 p-2 bg-grey-50 hover:bg-gray-100 rounded-full"
                  onClick={() => setIsMenuToggle(!isMenuToggle)}
                />
              </button>
            </div>
          )}
      </nav>
    </aside>
    </div>
  );
});

export default Navbar;
