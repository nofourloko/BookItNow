import { Route, Router, Routes } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import ErrorPage from "./Utils/errorPage";
import SelectedService from "./SelectedService/SelectedService";
import AuthenticationPanel from "./LoginPanel/AuthenticationPanel";
import UserPanel from "./UserPanel/UserPanel";
import UserVisits from "./UserPanel/UserVisits";
import UserInfo from "./UserPanel/UserInfo";
import UserPrivacy from "./UserPanel/UserPrivacy";
import ServicesByCategory from "./ServicesList/ServicesByCategory";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import UserComments from "./UserPanel/UserComments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route element={<AuthOutlet fallbackPath="/loginPanel"/>}>
        <Route path="/accountPanel" element={<UserPanel selectedComponent={<UserVisits />}/>}/>
        <Route path="/accountPanel/information" element={<UserPanel selectedComponent={<UserInfo/>}/>}/>
        <Route path="/accountPanel/privacy" element={<UserPanel selectedComponent={<UserPrivacy/>}/>}/>
        <Route path="/accountPanel/comments" element={<UserPanel selectedComponent={<UserComments />}/>}/>
      </Route>
      <Route path="/service/:id" element={<SelectedService />} />
      <Route path="/loginPanel" element={<AuthenticationPanel />} />
      <Route path="/:category" element={<ServicesByCategory />} />
    </Routes>
  );
}

export default App;
