import "./App.css";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import FloatingNav from "./components/navbar";
import {
  IoMdHome,
  IoMdAddCircle,
  IoMdMail,
  IoMdPeople,
  IoMdSearch,
} from "react-icons/io";
import Home from "./pages/home";
import CreateQuiz from "./pages/create";


const navItems = [
  {
    name: "HOME",
    link: "/",
    icon: <IoMdHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "ABOUT",
    link: "/about",
    icon: (
      <IoMdAddCircle className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    name: "CREATE",
    link: "/create",
    icon: <IoMdMail className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "JOIN",
    link: "/join",
    icon: <IoMdPeople className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "EXPLORE",
    link: "/explore",
    icon: <IoMdSearch className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

// Route definitions
const routeDefinitions = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <div>About Page</div> },
  { path: "/create", element: <CreateQuiz /> },
  { path: "/join", element: <div>Join Page</div> }, 
  { path: "/explore", element: <div>Explore Page</div> },
  { path: "/login", element: <div>Login Page</div> }, 
  { path: "/signup", element: <div>Signup Page</div> }, 
];

function App() {
  const location = useLocation();
  const routing = useRoutes(routeDefinitions);

  // Define routes where the navbar should be hidden
  const routesWithoutNavbar = ["/login", "/signup"];

  // Check if the current route is in the routesWithoutNavbar array
  const shouldDisplayNavbar = !routesWithoutNavbar.includes(location.pathname);

  return (
    <div className="p-0 m-0">
      {shouldDisplayNavbar && <FloatingNav navItems={navItems} />}
      {routing}
    </div>
  );
}

// Wrap App component with BrowserRouter to use useLocation hook
const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
