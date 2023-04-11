import React from "react";
import { BrowserRouter , Route,Routes} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path=""element={<LandingPage/>}/>
        <Route path="LandingPage"element={<LandingPage/>}/>
        <Route path="QuizPage"element={<QuizPage/>}/>
        <Route path="ResultPage"element={<ResultPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
