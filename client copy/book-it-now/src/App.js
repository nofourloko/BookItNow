import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import ErrorPage from "./Utils/errorPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
