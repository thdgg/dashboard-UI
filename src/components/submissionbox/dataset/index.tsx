import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

type Props = {
  setIsNewModelWindowVisible: (isVisible: boolean) => void;
};

const DatasetSubmissionBox = (props: Props) => {
  const { setIsNewModelWindowVisible } = props;
  const [files, setFiles] = useState<File[]>([]);

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setFiles(files);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
    console.log(newFiles);
  };

  const handleSubmit = () => {
    setIsNewModelWindowVisible(false);
  };

  return (
    <div
      className="w-screen h-screen absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40"
      onClick={() => setIsNewModelWindowVisible(false)}
    >
      <div
        className="border rounded-lg bg-white w-5/6 h-5/6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center shadow-sm">
          <XMarkIcon
            className="w-8 h-8 float-right m-2 cursor-pointer hover:bg-gray-300 rounded-full p-"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to close the window?")
              ) {
                setIsNewModelWindowVisible(false);
              }
            }}
          />
          <h1 className="text-2xl font-bold text-center p-2">Upload Dataset</h1>
        </div>
        <div className=" w-full">
          <label
            htmlFor="dropzone-file"
            className="mx-auto mt-3 flex flex-col items-center justify-center w-1/2 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="images"
              onChange={onSelectFile}
              multiple
              accept="/images"
            />
            {files.length > 0
              ? (
                <span className="text-gray-500">
                  {files.length} file(s) selected
                </span>
              )
              : <span>No file chosen</span>}
          </label>

          {files.length > 0 && (
            <div className="flex justify-center items-center w-full gap-3 shadow-md">
              <button
                onClick={handleSubmit}
                className="my-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setFiles([])}
                className="my-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="w-auto mx-20 h-1/2 overflow-x-auto pt-2 ">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-between h-10 mb-2 px-2 gap-2 border border-gray-300 rounded-lg"
            >
              <div>{file.name}</div>
              <button onClick={() => handleRemoveFile(index)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatasetSubmissionBox;
