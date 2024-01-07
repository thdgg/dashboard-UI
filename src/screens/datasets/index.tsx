import Container from "@/components/container";
import TableDatasets from "@/components/table/datasets";

import { useMediaQuery } from "react-responsive";

const Datasets = () => {
  const isAboveMedium = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <Container>
      <h1 className="text-5xl font-bold">Datasets</h1>
      <div className={`flex gap-3 mt-10 ${isAboveMedium ? "":  " ml-0 w-5/6"}`}>
        <TableDatasets />
      </div>
    </Container>
  );
};

export default Datasets;
