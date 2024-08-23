import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlindAlgoList from './components/BlindAlgoList';
import InformedAlgoList from './components/InformedAlgoList';
import OptimalAlgoList from './components/OptimalAlgoList';
import BritishMuseumSearch from "./components/algo-pages/BritishMuseumSearch";

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blind-algorithm-list" element={<BlindAlgoList />} />
                <Route path="/informed-algorithm-list" element={<InformedAlgoList/>} />
                <Route path="/optimal-algorithm-list" element={<OptimalAlgoList/>} />
                <Route path="/british-museum-search" element={<BritishMuseumSearch/>} />
            </Routes>
        </Router>
  );
}

export default App;
