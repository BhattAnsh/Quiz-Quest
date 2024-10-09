import "./App.css";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import FloatingNav from "./components/navbar";
import {
  IoMdHome,
  IoMdAddCircle,
  IoMdMail,
  IoMdPeople,
  IoMdSearch,
} from "react-icons/io";

function App() {
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
      icon: <IoMdMail className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "EXPLORE",
      link: "/explore",
      icon: <IoMdSearch className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  // Define routes where the navbar should be hidden
  const routesWithoutNavbar = ["/login", "/signup"];

  const location = useLocation();

  // Check if the current route is in the routesWithoutNavbar array
  const shouldDisplayNavbar = !routesWithoutNavbar.includes(location.pathname);

  return (
    <div className="p-0 m-0">
      {shouldDisplayNavbar && <FloatingNav navItems={navItems} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" />
        <Route path="/create" />
        <Route path="/join" />
        <Route path="/explore" />
        <Route path="/login" />
        <Route path="/signup" />
      </Routes>
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
