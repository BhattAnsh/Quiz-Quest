import "./App.css";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import FloatingNav from "./components/navbar";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import {
  IoMdHome,
  IoMdAddCircle,
  IoMdMail,
  IoMdPeople,
  IoMdSearch,
} from "react-icons/io";
import Home from "./pages/home";
import CreateQuiz from "./pages/create";

import ProfileCard from "./components/ProfileCard";
import Footer from "./components/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Error404 from "./pages/Error404";
import { Toaster } from "react-hot-toast";
import ContactUs from "./pages/ContactUs"
import ProfileDashboard from "./components/ProfileDashboard";
import Registration from "./pages/Registration";
import Faqs from "./components/Faqs";

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
  {
    name: "CONTACT",
    link: "/contact-us",
    icon: <IoMdSearch className="h-4 w-4 text-neutral-500 dark:text-white" />,
  }
];

// Route definitions
const routeDefinitions = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <div>About Page</div> },
  { path: "/create", element: <CreateQuiz /> },
  { path: "/join", element: <div>Join Page</div> }, 
  { path: "/explore", element: <Registration /> },
  { path: "/login", element: <Login /> }, 
  { path: "/signup", element: <Signup /> }, 
  { path: "/profile", element: <ProfileCard/> }, 
  { path: "/contact-us", element: <ContactUs />},
  { path: "/dashboard", element: <ProfileDashboard /> }, 
  {path:"/faqs", element: <Faqs />},
  { path: "*", element: <Error404/> }, 
  
];

function App() {
  const location = useLocation();
  const routing = useRoutes(routeDefinitions);

  // Define routes where the navbar should be hidden
  const routesWithoutNavbar = ["/login", "/signup", "/faqs"];

  // Check if the current route is in the routesWithoutNavbar array
  const shouldDisplayNavbar = !routesWithoutNavbar.includes(location.pathname);

  return (
    <div className="p-0 m-0 overflow-x-hidden">
      {shouldDisplayNavbar && <FloatingNav navItems={navItems} />}
      {routing}
      <Footer></Footer>
    </div>
  );
}

// Wrap App component with BrowserRouter to use useLocation hook
const WrappedApp = () => (
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
);

export default WrappedApp;
