import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlindAlgoList from './components/BlindAlgoList';
import InformedAlgoList from './components/InformedAlgoList';
import OptimalAlgoList from './components/OptimalAlgoList';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blind-algorithm-list" element={<BlindAlgoList />} />
                <Route path="/informed-algorithm-list" element={<InformedAlgoList/>} />
                <Route path="/optimal-algorithm-list" element={<OptimalAlgoList/>} />
            </Routes>
        </Router>
  );
}

export default App;
