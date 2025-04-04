import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Redirect from "./pages/Redirect";
import RegistrationSuccessful from "./pages/RegistrationSuccessful";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./app/store";
import RouteProtection from "./component/RouteProtection";
import LandingPage from "./pages/LandingPage";
import BlogPage from "./pages/BlogPage";
import ServicesPage from "./pages/ServicesPage";





function App() {

  const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
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
    path: "/dashboard/*",
    element:  <RouteProtection cmp={Dashboard} />,
  },
  {
    path: "/successful",
    element: <RegistrationSuccessful/>,
  },
  {
    path: "/blogpage",
    element: <BlogPage/>,
  },
  {
    path: "/servicespage",
    element: <ServicesPage/>,
  },
 
 
])
  return (
    
    <Provider store={store}>
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
    
   
  );
}

export default App;
