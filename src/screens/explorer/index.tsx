import Container from "@/components/container";
import GridComponent from "@/components/model-card";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ModelData } from "../models/ModelData";

const Explorer = () => {
  return (
    <Container>
      <h1 className="text-5xl font-bold">Explorer</h1>
      {/* FILTERS */}
      <div className="flex gap-5 mt-10">
        <button className="flex w-auto h-auto p-3 border-2 rounded-lg gap-2 hover:bg-gray-100">
          <p>Star</p>
          <ChevronDownIcon className="w-4 h-4 mt-1" />
        </button>
        <button className="flex w-auto h-auto p-3 border-2 rounded-lg gap-2 hover:bg-gray-100">
          <p>Inferences</p>
          <ChevronDownIcon className="w-4 h-4 mt-1" />
        </button>
      </div>
      <div className="mt-8">
        <div className="space-y-2">
          <GridComponent data={ModelData} />
          <GridComponent data={ModelData} />
        </div>
      </div>
    </Container>
  );
};

export default Explorer;
