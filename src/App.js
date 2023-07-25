import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import CategoriesNav from "./Components/CategoriesNav";
import ReviewsList from "./Components/ReviewsList";
import FullReviewCard from "./Components/FullReviewCard";
import { useState } from "react";
import SignIn from "./Components/Signin";
import SignUp from "./Components/Signup";
import HomeButton from "./Components/HomeButton";

function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");

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
                {/* <HomeButton /> */}
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
                <ReviewsList loggedUser={loggedUser} />
                {/* <HomeButton /> */}
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
                {/* <HomeButton /> */}
              </div>
            )
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            !loggedUser ? (
              <SignUp setLoggedUser={setLoggedUser} />
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
      </Routes>
    </div>
  );
}

export default App;
