// ModelCardComponentLarge.tsx
import { IModel } from "@/interfaces/IModel";
import { StarIcon } from "@heroicons/react/24/outline";

export type Props = {
  model: IModel;
};

const ModelCardLarge: React.FC<Props> = ({ model }) => {
  return (
    <div className={`max-w-sm mr-4 rounded overflow-hidden shadow-lg p-6 mb-2 bg-white border-2}`}>
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

export default ModelCardLarge;