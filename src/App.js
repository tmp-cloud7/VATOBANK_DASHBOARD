import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Redirect from "./pages/Redirect";
import RegistrationSuccessful from "./pages/RegistrationSuccessful";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./app/store";


function App() {

  const routes = createBrowserRouter([
  {
    path: "/",
    element: <Redirect/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/successful",
    element: <RegistrationSuccessful/>,
  }
])
  return (
    <Provider store={store}>
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
    
   
  );
}

export default App;
