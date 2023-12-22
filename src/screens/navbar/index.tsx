import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NavBarData } from "./NavBarData";

const Navbar = () => {
  const [isMenuToggle, setIsMenuToggle] = useState<boolean>(true);
  const flexCol = "flex flex-col";
  const flexBetween = "flex justify-start items-center";
  return (
    <aside className="h-screen">
      <nav
        className={`${flexCol} ${
          isMenuToggle ? "w-64" : "w-20"
        } p-2 h-full bg-white border-r shadow-sm ease-in-out`}
      >
        <div className={`${flexBetween} w-72 p-4`}>
          <button>
            <Bars3Icon
              className="h-8 w-8 m-4 ml-0 bg-grey-50 hover:bg-gray-100 rounded-full "
              onClick={() => setIsMenuToggle(!isMenuToggle)}
            />
          </button>
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`${isMenuToggle ? "w-32" : "w-0"} duration-75`}
          />
        </div>
        <ul className="overflow-y-auto overflow-x-hidden">
          {NavBarData.map((item, index) => {
            return (
              <Link to={item.path} key={index}>
                <li className="h-16 flex justify-start items-center hover:bg-gray-100 cursor-pointer">
                  <div className="flex justify-start items-center">
                    <div className="ml-4">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div
                      className={`${
                        isMenuToggle ? "ml-4" : "ml-0"
                      } duration-75 `}
                    >
                      {isMenuToggle ? item.title : ""}
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
