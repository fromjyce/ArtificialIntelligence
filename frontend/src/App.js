import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlindAlgoList from './components/BlindAlgoList';
import InformedAlgoList from './components/InformedAlgoList';
import OptimalAlgoList from './components/OptimalAlgoList';
import BritishMuseumSearch from "./components/algo-pages/BritishMuseumSearch";
import DepthFirstSearch from "./components/algo-pages/DepthFirstSearch";
import BreadthFirstSearch from "./components/algo-pages/BreadthFirstSearch";
import HillClimbingSearch from "./components/algo-pages/HillClimbingMethod";

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blind-algorithm-list" element={<BlindAlgoList />} />
                <Route path="/informed-algorithm-list" element={<InformedAlgoList/>} />
                <Route path="/optimal-algorithm-list" element={<OptimalAlgoList/>} />
                <Route path="/british-museum-search" element={<BritishMuseumSearch/>} />
                <Route path="/depth-first-search" element={<DepthFirstSearch />} />
                <Route path="/breadth-first-search" element={<BreadthFirstSearch />} />
                <Route path="/hill-climbing-method" element={<HillClimbingSearch />} />
            </Routes>
        </Router>
  );
}

export default App;
