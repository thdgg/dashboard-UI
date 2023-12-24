import { ReactNode } from 'react';
import Navbar from "@/components/navbar";
import Searchbar from "@/components/searchbar";

interface LayoutProps {
  children: ReactNode;
}

const Container = ({ children }: LayoutProps) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-50">
        <Navbar />
      </div>
      <div className="pt-2"> {/* Add pt-4 or any other value as per your requirement */}
        <div className="mt-2">
          <Searchbar />
        </div>
        <div className="h-full w-full ml-32 mt-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;