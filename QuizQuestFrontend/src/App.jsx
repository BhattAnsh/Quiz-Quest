import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloatingNav from "./components/navbar";
import { IoMdHome, IoMdAddCircle, IoMdMail } from "react-icons/io";

function App() {
  const navItems = [
    {
      name: "HOME",
      link: "/",
      icon: <IoMdHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "ABOUT",
      link: "/",
      icon: (
        <IoMdAddCircle className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "CREATE",
      link: "/",
      icon: <IoMdMail className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "JOIN",
      link: "/",
      icon: <IoMdMail className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="p-0 m-0">
      <BrowserRouter>
        <FloatingNav navItems={navItems} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
