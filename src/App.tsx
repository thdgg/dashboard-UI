import Explorer from "./screens/explorer/index.tsx";
import Models from "./screens/models/index.tsx";
import Test from "./screens/test/index.tsx";
import Datasets from "./screens/datasets/index.tsx";
import Home from "./screens/home/index.tsx";
import Authenticate from "./screens/authenticate/index.tsx";
import useAuth from "./hooks/useAuth.tsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const {auth} = useAuth();
  const navigate = useNavigate();
  console.log(auth);

  useEffect(() => {
    if (!auth) {
      navigate("/authenticate");
    }
    else {
      navigate("/home");
    }
  }, [auth]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {auth ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/models" element={<Models />} />
          <Route path="tests" element={<Test />} />
        </>
      ) : (
        <Route path="/authenticate" element={<Authenticate />} />
      )}
    </Routes>
  );
};

export default App;