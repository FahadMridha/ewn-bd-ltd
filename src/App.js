import { Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "./pages/Container";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Container />}></Route>
      </Routes>
    </div>
  );
}

export default App;
