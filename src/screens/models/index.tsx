import Container from "@/components/container";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { ModelData } from "./ModelData";
import { useEffect, useRef, useState } from "react";

const Models = () => {
  const [openItemIndex, setOpenItemIndex] = useState<number>(-1);
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleItemSettings = (index: number) => {
    setIsDropdownActive(!isDropdownActive);
    setOpenItemIndex((prevIndex) => prevIndex !== index ? index : -1);
  };

  const updateDropdownPosition = () => {
    if (dropdownRef.current && openItemIndex !== -1) {
      const button = dropdownRef.current.parentElement?.getBoundingClientRect();
      if (button) {
        const rootFontSize = parseFloat(
          getComputedStyle(document.documentElement).fontSize,
        );
        dropdownRef.current.style.top = `${
          (button.bottom - 50) / rootFontSize
        }rem`;
        dropdownRef.current.style.left = `${
          (button.right - 120) / rootFontSize
        }rem`;
      }
    }
  };

  useEffect(() => {
    updateDropdownPosition();
    window.addEventListener("resize", updateDropdownPosition);
    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, [openItemIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenItemIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <h1 className="text-5xl font-bold">Models</h1>
      {/* FILTERS */}
      <div className="flex gap-5 mt-10">
        <button className="flex w-24 h-auto p-3 border-2 rounded-lg gap-5 hover:bg-gray-100">
          <p>Type</p>
          <ChevronDownIcon className="w-4 h-4 mt-1" />
        </button>
        <button className="flex w-32 h-auto p-3 border-2 rounded-lg gap-5 hover:bg-gray-100">
          <p>Modified</p>
          <ChevronDownIcon className="w-4 h-4 mt-1" />
        </button>
      </div>
      {/* MODELS */}
      <div className="mt-8">
        {ModelData.map((item, index) => {
          return (
            <div className={`border-2 rounded-lg mt-2 w-5/6 ${isDropdownActive ? "" : "hover:bg-gray-100"}`} key={index}>
              <div className="flex p-3 rounded-lg">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col justify-between">
                    <h1 className="text-2xl font-bold">{item.title}</h1>
                    <p className="text-sm">Inferences: {item.inferences}</p>
                    <p className="text-sm">Star: {item.ratings.stars}</p>
                  </div>
                  <button onClick={() => toggleItemSettings(index)}>
                    <EllipsisVerticalIcon className="w-8 h-8" />
                  </button>
                  {openItemIndex === index && (
                    <div
                      ref={dropdownRef}
                      className="flex flex-col justify-start items-start absolute w-28 h-auto p-2 bg-white border-2 rounded-lg"
                      onMouseEnter={() => setIsDropdownActive(true)}
                      onMouseLeave={() => setIsDropdownActive(false)}
                    >
                      <button className="text-sm w-full hover:bg-gray-200">Edit</button>
                      <button className="text-sm w-full hover:bg-gray-200">Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Models;
