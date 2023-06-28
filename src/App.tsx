import Auth from "./page/auth/Auth";
import Home from "./page/home/Home";
import Login from "./page/auth/Login";
import Profile from "./page/profile/Profile";
import Register from "./page/auth/Register";
import ViewList from "./page/list/ViewList";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { checkIsAuth } from "./common/utils";

function App() {
  useEffect(() => {
    checkIsAuth();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={<Auth />}
        >
          <Route
            index
            element={<Login />}
          />
          <Route
            path="register"
            element={<Register />}
          />
        </Route>
        <Route
          path="/"
          element={<Home />}
        >
          <Route
            index
            element={<Profile />}
          />
          <Route
            path="/:uuid/:name"
            element={<ViewList />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
