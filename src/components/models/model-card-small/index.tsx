// ModelCardComponentSmall.tsx
import { IModel } from "@/interfaces/IModel";
import { StarIcon } from "@heroicons/react/24/outline";
import { useMediaQuery } from "react-responsive";

export type Props = {
  model: IModel;
};

const ModelCardSmall: React.FC<Props> = ({ model }) => {
  const isAboveMedium = useMediaQuery({ minWidth: 768 });
  return (
    <div
      className={` flex 
      ${ isAboveMedium ? "w-3/4" : "w-full"} 
      rounded-lg shadow-lg p-6 mb-2 bg-white border-2`}
    >
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

export default ModelCardSmall;