import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login/index";
import Dashboard from "../pages/dashboard/index";

function Rotas() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/dashboard/" Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;