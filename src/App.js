import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import CategoriesNav from "./Components/CategoriesNav";
import ReviewsList from "./Components/ReviewsList";
import FullReviewCard from "./Components/FullReviewCard";
import { useState } from "react";

function App() {
  const [categoryList, setCategoryList] = useState([]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <CategoriesNav
                setCategoryList={setCategoryList}
                categoryList={categoryList}
              />
              <ReviewsList />
            </div>
          }
        ></Route>
        <Route
          path="/reviews"
          element={
            <div className="HomeDiv">
              <CategoriesNav
                setCategoryList={setCategoryList}
                categoryList={categoryList}
              />
              <ReviewsList />
            </div>
          }
        ></Route>
        <Route
          path="/reviews/:review_id"
          element={
            <div className="FullReviewDiv">
              <FullReviewCard />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
