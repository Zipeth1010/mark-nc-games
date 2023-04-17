import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import CategoriesNav from "./Components/CategoriesNav";
import ReviewsList from "./Components/ReviewsList";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <CategoriesNav />
              <ReviewsList />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
