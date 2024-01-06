import { IModel } from "@/interfaces/IModel";
import { StarIcon } from "@heroicons/react/24/outline";
import { useMediaQuery } from "react-responsive";

export type Props = {
  model: IModel;
};

const ModelCardComponentLarge = (
  { model }: Props,
) => {
  return (
    <div className="max-w-sm mr-4 rounded overflow-hidden shadow-lg p-6 mb-2 bg-white border-2">
      <div className="font-bold text-xl mb-2">{model.title}</div>
      <p>Owner: {model.user}</p>
      <p>Inferences: {model.inferences}</p>
      <div className="flex items-center mt-4">
        <StarIcon className="w-5 h-5 text-yellow-500" />
        <span className="pt-1 ml-2">{model.ratings.stars}</span>
      </div>
    </div>
  );
};

const ModelCardComponentSmall = (
  { model }: Props,
) => {
  return (
    <div className="flex rounded-lg shadow-lg p-6 mb-2 bg-white border-2 mr-4">
      <div className="flex w-full justify-between">
        <div className="flex flex-col justify-between">
          <h1 className="text-2xl font-bold">{model.title}</h1>
          <p className="text-sm">Owner: {model.user}</p>
          <p className="text-sm">Inferences: {model.inferences}</p>
        </div>
        <div className="flex items-center mt-4">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <span className="pt-1 ml-2">{model.ratings.stars}</span>
        </div>
      </div>
    </div>
  );
};

export type GridProps = {
  data: IModel[];
};

const GridComponent = ({ data }: GridProps) => {
  const isAboveMedium = useMediaQuery({ minWidth: 768 });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.isArray(data) &&
        data.map((model: IModel) => (
          <div key={model.id}>
            {isAboveMedium
              ? <ModelCardComponentLarge model={model} />
              : <ModelCardComponentSmall model={model} />}
          </div>
        ))}
    </div>
  );
};

export default GridComponent;
