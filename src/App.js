import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import CategoriesNav from "./Components/CategoriesNav";
import ReviewsList from "./Components/ReviewsList";
import FullReviewCard from "./Components/FullReviewCard";
import { useState } from "react";
import SignIn from "./Components/Signin";

function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <div className="App">
      {!loggedUser ? null : <Header loggedUser={loggedUser} />}
      <Routes>
        <Route
          path="/"
          element={
            !loggedUser ? (
              <SignIn setLoggedUser={setLoggedUser} />
            ) : (
              <div>
                <CategoriesNav
                  setCategoryList={setCategoryList}
                  categoryList={categoryList}
                />
                <ReviewsList />
              </div>
            )
          }
        ></Route>
        <Route
          path="/reviews"
          element={
            !loggedUser ? (
              <SignIn setLoggedUser={setLoggedUser} />
            ) : (
              <div className="HomeDiv">
                <CategoriesNav
                  setCategoryList={setCategoryList}
                  categoryList={categoryList}
                />
                <ReviewsList />
              </div>
            )
          }
        ></Route>
        <Route
          path="/reviews/:review_id"
          element={
            !loggedUser ? (
              <SignIn setLoggedUser={setLoggedUser} />
            ) : (
              <div className="FullReviewDiv">
                <FullReviewCard loggedUser={loggedUser} />
              </div>
            )
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
