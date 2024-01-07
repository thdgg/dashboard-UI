import Container from "@/components/container";
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ModelData } from "../ModelData";
import Model from "@/components/models/model";
import { IModel } from "@/interfaces/IModel";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

const Models = () => {
  const isAboveMedium = useMediaQuery({ minWidth: 768 });
  const [models, setModels] = useState<IModel[]>(ModelData);
  const [sortOrder, setSortOrder] = useState(0); // 1 for ascending, -1 for descending

  const handleEdit = (model: IModel) => {
    console.log(model);
  };

  const handleDelete = (model: IModel) => {
    console.log(model);
  };

  const handleStarsSort = () => {
    setSortOrder(prev => {
      const newOrder = prev === 1 ? -1 : prev === -1 ? 0 : 1;
      setModels(newOrder !== 0 ? [...models].sort((a, b) => newOrder * (a.ratings.stars - b.ratings.stars)) : ModelData);
      return newOrder;
    });
  };

  return (
    <Container>
      <h1 className="text-5xl font-bold">Models</h1>
      {/* FILTERS */}
      <div
        className={`flex flex-col items-center justify-center gap-5 mt-2 sticky top-0 z-20 shadow-lg bg-white w-screen p-2 `}
      >
        <div className="p-2 mx-auto my-auto border-2 rounded-full w-1/2">
          <div className="relative flex items-center w-full h-12 rounded-full focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </div>
            <input
              className="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>
        <div className="flex gap-5">
          <button
            className={`flex w-24 h-auto p-3 border-2 rounded-lg gap-4 hover:bg-gray-100 bg-white ${
              sortOrder ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={handleStarsSort}
          >
            <p>Stars</p>
            {sortOrder === 1
              ? <ChevronUpIcon className="w-4 h-4 mt-1" />
              : sortOrder === -1
              ? <ChevronDownIcon className="w-4 h-4 mt-1" />
              : <ChevronUpDownIcon className="w-4 h-4 mt-1" />}
          </button>
          <button className="flex w-auto h-auto p-3 border-2 rounded-lg gap-2 hover:bg-gray-100 bg-white">
            <p>Inferences</p>
            <ChevronDownIcon className="w-4 h-4 mt-1" />
          </button>
        </div>
      </div>
      {/* MODELS */}
      <div className="flex flex-col justify-center items-center w-5/6 mt-6">
      {Array.isArray(models) &&
        models.map((model: IModel) => (
          <div key={model.id} className={`mx-20 mb-4 ${isAboveMedium ? "w-3/4": "w-full"}`}>
            <Model model={model} onDelete={handleDelete} onEdit={handleEdit} />
          </div>
        ))}
      </div>
      
    </Container>
  );
};

export default Models;
