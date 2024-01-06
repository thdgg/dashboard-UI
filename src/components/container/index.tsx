import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../navigation/navbar";
import Searchbar from "../navigation/searchbar";
import Sidebar from "../navigation/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Container = ({ children }: LayoutProps) => {
  const isAboveMedium = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-40">
        <Navbar />
      </div>
      <div className="pt-2">
        <div className="flex justify-between ">
          <div className={`${isAboveMedium ? "ml-32" : "ml-16"} w-4/5`}>
            <Searchbar />
          </div>
          <div className="w-auto px-4">
            <Sidebar />
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col justify-center items-center ${
          isAboveMedium ? "ml-32" : "ml-6"
        } mt-16`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
