import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Home from "./components/pages/Home/Home";
import RealEstate from "./components/pages/RealEstate/RealEstate";
import DeleteListingPopUp from "./components/popups/DeleteListingPopUp";
import AddAgentPopUp from "./components/popups/AddAgentPopUp";
import AddListing from "./components/pages/AddListing/AddListing";

function App() {
  return (
    <div className="min-h-[100vh] bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/real-estate/:RealEstateId" element={<RealEstate />} />
        <Route path="add-listing" element={<AddListing />} />
      </Routes>

      <DeleteListingPopUp />
      <AddAgentPopUp />
    </div>
  );
}

export default App;
