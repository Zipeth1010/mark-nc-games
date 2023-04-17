import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import CategoriesNav from "./Components/CategoriesNav";
import ReviewsList from "./Components/ReviewsList";
import FullReviewCard from "./Components/FullReviewCard";

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
        <Route
          path="/reviews"
          element={
            <div>
              <CategoriesNav />
              <ReviewsList />
            </div>
          }
        ></Route>
        <Route
          path="/reviews/:review_id"
          element={
            <div>
              <FullReviewCard />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
