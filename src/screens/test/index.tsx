import UserDashboardAI from "@/apis/UserDashboardAI";
import Container from "@/components/container";
import ConfirmAlertBox from "@/components/notification/confirm";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import useAxiosFunction from "@/hooks/useAxiosFunction";
import { IModel } from "@/interfaces/IModel";
import { FireIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Test = () => {
  const { modelId } = useParams();
  const { auth } = useAuth();
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const [filterModel, setFilterModel] = useState<string>("");
  const [selectedResouceId, setSelectedResourceId] = useState<string>("");
  const [filterResource, setFilterResource] = useState<string>("");
  const [modelMissing, setModelMissing] = useState<boolean>(false);
  const [imageMissing, setImageMissing] = useState<boolean>(false);
  const [coordinatesMissing, setCoordinatesMissing] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isResultAvailable, setIsResultAvailable] = useState<boolean>(false);
  const navigate = useNavigate();

  const [modelsResponse, modelsError, modelsLoading, modelsRefetch] = useAxios({
    axiosInstance: UserDashboardAI,
    method: "get",
    url: "/models/models-by-user/" + auth?.userId,
    // url: "/models",
    requestConfig: {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    },
  });

  const [modelResponse, modelError, modelLoading, modelAF] = useAxiosFunction();

  useEffect(() => {
    if (modelId) {
      modelAF({
        axiosInstance: UserDashboardAI,
        method: "get",
        url: "/models/" + modelId,
        requestConfig: {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      });
      setSelectedModelId(modelId);
    }
  }, [modelId]);

  const [models, setModels] = useState<IModel[]>(modelsResponse?.data || []);

  useEffect(() => {
    if (modelsResponse) {
      setModels(modelsResponse.data);
    }
  }, [modelsResponse]);

  const [coordinates, setCoordinates] = useState<
    { x: number; y: number } | null
  >(null);
  const [displayCoordinates, setDisplayCoordinates] = useState<
    { x: number; y: number } | null
  >(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageResolution, setImageResolution] = useState<
    { width: number; height: number } | null
  >(null);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const boundingBox = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - boundingBox.left;
    const y = event.clientY - boundingBox.top;

    // Set the display coordinates
    setDisplayCoordinates({ x, y });

    // Get the natural width and height of the image
    const naturalWidth = event.currentTarget.naturalWidth;
    const naturalHeight = event.currentTarget.naturalHeight;

    // Calculate the scale factor
    const scaleFactorX = naturalWidth / boundingBox.width;
    const scaleFactorY = naturalHeight / boundingBox.height;

    // Apply the scale factor to the clicked coordinates
    const scaledX = x * scaleFactorX;
    const scaledY = y * scaleFactorY;

    setCoordinates({ x: scaledX, y: scaledY });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setCoordinates(null); // Reset coordinates when a new image is selected

      // Get image resolution
      const img = new Image();
      img.onload = () => {
        setImageResolution({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.src = imageUrl;
    }
  };

  const handleSubmit = () => {
    if (!selectedModelId) {
      setModelMissing(true);
    } else if (!selectedImage) {
      setImageMissing(true);
    } else if (!coordinates) {
      setCoordinatesMissing(true);
    } else {
      setIsProcessing(true);
      setIsResultAvailable(true);
      console.log("submit");
    }
  };

  const handleNewTest = () => {
    setSelectedModelId("");
    setSelectedResourceId("");
    setCoordinates(null);
    setSelectedImage(null);
    setImageResolution(null);
    setIsProcessing(false);
    navigate("/tests");
  };

  return (
    <Container>
      {modelMissing && (
        <ConfirmAlertBox
          title="Model Missing"
          description="Please select a model"
          onClose={() => setModelMissing(false)}
        />
      )}
      {imageMissing && (
        <ConfirmAlertBox
          title="Image Missing"
          description="Please select an image"
          onClose={() => setImageMissing(false)}
        />
      )}
      {coordinatesMissing && (
        <ConfirmAlertBox
          title="Coordinates Missing"
          description="Please select a point on the image"
          onClose={() => setCoordinatesMissing(false)}
        />
      )}
      <h1 className="text-5xl font-bold">Tests</h1>
      <div className="flex w-auto flex-col items-center mt-8 mx-12">
        <div className="flex flex-col gap-5 border-2 w-full p-5">
          <div className="flex gap-5">
            {/* Start */}
            <label htmlFor="model-select" className="mr-3">
              Choose a model:
            </label>
            {!modelId && (
              <input
                type="text"
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
                placeholder="Filter models"
              />
            )}
            <select
              id="model-select"
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              style={{ maxHeight: "200px", overflow: "auto" }}
            >
              {!modelId && Array.isArray(models) &&
                models
                  .filter((model: IModel) =>
                    model.name.toLowerCase().includes(filterModel.toLowerCase())
                  )
                  .map((model: IModel) => (
                    <option key={model.id} value={model.id}>
                      {model.name} - {model.type}
                    </option>
                  ))}
              {modelId && modelResponse && (
                <option
                  key={modelResponse.data.id}
                  value={modelResponse.data.id}
                >
                  {modelResponse.data.name} - {modelResponse.data.type}
                </option>
              )}
              {(!modelId || models.length === 0 ||
                models.filter((model: IModel) =>
                    model.name.toLowerCase().includes(filterModel.toLowerCase())
                  ).length === 0) && <option value="">No models found</option>}
            </select>
            {/* End */}
            {(!modelId || models.length === 0) && (
              <Link
                to="/explorer"
                className="text-blue-500 hover:text-blue-700"
              >
                <p className="text-xl">Or Explore</p>
              </Link>
            )}
          </div>

          <div className="flex gap-5">
            <label htmlFor="resource-select" className="mr-1">
              Choose an image:
            </label>
            <input
              type="text"
              value={filterResource}
              onChange={(e) => setFilterResource(e.target.value)}
              placeholder="Filter images"
            />
            <select
              id="resource-select"
              value={selectedResouceId}
              onChange={(e) => setSelectedResourceId(e.target.value)}
              style={{ maxHeight: "200px", overflow: "auto" }}
            >
            </select>
            <input
              className="block text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="small_size"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {selectedImage && (
            <div className="relative text-center">
              <img
                src={selectedImage}
                alt="Selected Image"
                onClick={handleImageClick}
                className="cursor-pointer border rounded-md p-2 max-w-[900px] max-h-[600px]"
              />

              {coordinates && displayCoordinates && (
                <div
                  className="absolute"
                  style={{
                    top: displayCoordinates.y,
                    left: displayCoordinates.x,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="absolute h-3 w-0.5 bg-red-600 transform rotate-45" />
                  <div className="absolute h-3 w-0.5 bg-red-600 transform -rotate-45" />
                </div>
              )}
            </div>
          )}
          {imageResolution && (
            <p className="mt-2">
              Resolution: {imageResolution.width} x {imageResolution.height}
              {" "}
              | Clicked at: X - {coordinates?.x}, Y - {coordinates?.y}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-20">
        <button
          className="mt-10 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={handleSubmit}
          disabled={isProcessing}
        >
          {isProcessing ? <FireIcon className="h-12 w-12 animate-spin" /> : (
            "Get result"
          )}
        </button>

        <button
          className="mt-10 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-700 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={handleNewTest}
        >
          New Test
        </button>
      </div>
      {isResultAvailable && (
        <div className="w-full flex flex-col items-center my-8 border-2">
          <h1 className="text-5xl mb-5 text-fuchsia-700">
            Result
          </h1>
          <div>
            <h1 className="text-3xl text-blue-700">N =</h1>
            <h1 className="text-3xl text-red-700">P =</h1>
            <h1 className="text-3xl text-yellow-700">K =</h1>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Test;
