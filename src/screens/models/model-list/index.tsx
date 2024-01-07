import Container from "@/components/container";
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ModelData } from "../ModelData";
import Model from "@/components/models/model";
import { IModel } from "@/interfaces/IModel";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import UserDashboardAI from "@/apis/UserDashboardAI";
import useAuth from "@/hooks/useAuth";

const Models = () => {
  const { auth } = useAuth();
  const isAboveMedium = useMediaQuery({ minWidth: 768 });
  const [models, setModels] = useState<IModel[]>(ModelData);
  const [sortOrder, setSortOrder] = useState(0); // 1 for ascending, -1 for descending

  const [modelsResponse, modelsError, modelsLoading, modelsRefetch] = useAxios({
    axiosInstance: UserDashboardAI,
    method: "get",
    url: "/models",
    requestConfig: {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    },
  });

  useEffect(() => {
    if (modelsResponse?.data) {
      console.log(modelsResponse.data);
    }
  }, [modelsResponse]);

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    if (searchValue) {
      const filteredModels = ModelData.filter(
        (model) =>
          model.title.toLowerCase().includes(searchValue.toLowerCase()) 
          // model.user.toLowerCase().includes(searchValue.toLowerCase())
      );
      setModels(filteredModels);
    } else {
      setModels(ModelData);
    }
  };
  
  const resetInput = () => {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    searchInput.value = '';
    setModels(ModelData);
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
              onChange={handleSearch}
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
        {models.length === 0 ? (
          <div className="flex flex-col justify-center items-center w-full ">
            <h1 className="text-2xl">No result found</h1>
            <p>To see more results, try other inputs</p>
            <button className=" w-32 h-16 p-3 text-xl border-2 rounded-full gap-2 hover:bg-gray-100 bg-white mt-2" onClick={resetInput}>Reset</button>
          </div>
        ) : (
          Array.isArray(models) &&
          models.map((model: IModel) => (
            <div key={model.id} className={`mx-20 mb-4 ${isAboveMedium ? "w-3/4": "w-full"}`}>
              <Link to={`/models/${model.id}`}>
                <Model model={model} onDelete={handleDelete} onEdit={handleEdit} />
              </Link>
            </div>
          ))
        )}
      </div>
      
    </Container>
  );
};

export default Models;
