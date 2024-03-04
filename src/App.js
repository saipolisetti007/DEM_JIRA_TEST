import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="py-3 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
