import CitiesWeather from "./components/CitiesWeather";
import Country from "./components/Country";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Country />} />
          <Route path="/cities/*" element={<CitiesWeather />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
