import { BrowserRouter,Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Sidebar from "./Components/Sidebar/Sidebar";


function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<Layout />}>
            
            <Route index element={<Home />} />
            {/* <Route path="/products" element={<h1>Products Listing Page</h1>} /> */}
            <Route path="/dashboard" element={<Sidebar />} />

          </Route>
        </Routes>
    </div>
  );
}

export default App;
