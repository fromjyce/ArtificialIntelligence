import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlindAlgoList from './components/BlindAlgoList';
import InformedAlgoList from './components/InformedAlgoList';
import OptimalAlgoList from './components/OptimalAlgoList';
import BritishMuseumSearch from "./components/algo-pages/BritishMuseumSearch";
import DepthFirstSearch from "./components/algo-pages/DepthFirstSearch";
import BreadthFirstSearch from "./components/algo-pages/BreadthFirstSearch";
import HillClimbingSearch from "./components/algo-pages/HillClimbingMethod";
import BeamSearch from "./components/algo-pages/BeamSearch";
import OracleSearch from "./components/algo-pages/OracleSearch";
import BestFirstSearch from "./components/algo-pages/BestFirstSearch";
import BranchAndBound from "./components/algo-pages/BranchAndBound";
import BranchAndBoundEL from "./components/algo-pages/BranchAndBoundEL";

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
                <Route path="/beam-search-method" element={<BeamSearch />} />
                <Route path="/oracle-search-method" element={<OracleSearch />} />
                <Route path="/best-first-search" element={<BestFirstSearch />} />
                <Route path="/branch-bound-method" element={<BranchAndBound />} />
                <Route path="/branch-bound-dead-horse-method" element={<BranchAndBoundEL />} />
            </Routes>
        </Router>
  );
}

export default App;
