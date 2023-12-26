import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Searchbar from "@/components/searchbar";
import { useMediaQuery } from "react-responsive";

interface LayoutProps {
  children: ReactNode;
}

const Container = ({ children }: LayoutProps) => {
  const isAboveMedium = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-50">
        <Navbar />
      </div>
      <div className="pt-2">
        {/* Add pt-4 or any other value as per your requirement */}
        <div className="mt-2">
          <Searchbar />
        </div>
        <div className={` ${isAboveMedium ? "ml-32" : "ml-16"} mt-16`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
