type Props = {
  setIsNewModelWindowVisible: (isVisible: boolean) => void;
}

const SubmissionBox = (props: Props) => {
  const { setIsNewModelWindowVisible } = props;

  return (
    <div 
      className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={() => setIsNewModelWindowVisible(false)}
    >
      <div 
        className="border rounded-lg bg-white w-1/2 h-1/2 flex justify-center items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <h1>Hello</h1>
      </div>
    </div>
  )
}

export default SubmissionBox