import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import CategoriesNav from "./Components/CategoriesNav";
import ReviewsList from "./Components/ReviewsList";
import FullReviewCard from "./Components/FullReviewCard";
import { useEffect, useState } from "react";
import SignIn from "./Components/Signin";
import SignUp from "./Components/Signup";
import HomeButton from "./Components/HomeButton";

function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const userDetails = localStorage.getItem("userDetails");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setLoggedUser(foundUser);
    }
    if (userDetails) {
      const foundUserDetails = userDetails;
      setUserDetails(foundUserDetails);
    }
  }, []);

  console.log(userDetails);

  return (
    <div className="App">
      {!loggedUser ? null : (
        <Header
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
          userDetails={userDetails}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            !loggedUser ? (
              <SignIn
                setLoggedUser={setLoggedUser}
                setUserDetails={setUserDetails}
              />
            ) : (
              <div>
                <ReviewsList
                  loggedUser={loggedUser}
                  setCategoryList={setCategoryList}
                  categoryList={categoryList}
                />
                <HomeButton />
              </div>
            )
          }
        ></Route>
        <Route
          path="/reviews"
          element={
            !loggedUser ? (
              <SignIn
                setLoggedUser={setLoggedUser}
                setUserDetails={setUserDetails}
              />
            ) : (
              <div className="HomeDiv">
                <ReviewsList
                  loggedUser={loggedUser}
                  setCategoryList={setCategoryList}
                  categoryList={categoryList}
                />
                <HomeButton />
              </div>
            )
          }
        ></Route>
        <Route
          path="/reviews/:review_id"
          element={
            !loggedUser ? (
              <SignIn
                setLoggedUser={setLoggedUser}
                setUserDetails={setUserDetails}
              />
            ) : (
              <div className="FullReviewDiv">
                <FullReviewCard loggedUser={loggedUser} />
                <HomeButton />
              </div>
            )
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            !loggedUser ? (
              <SignUp
                setLoggedUser={setLoggedUser}
                setUserDetails={setUserDetails}
              />
            ) : (
              <div>
                <CategoriesNav
                  setCategoryList={setCategoryList}
                  categoryList={categoryList}
                />
                <ReviewsList />
                <HomeButton />
              </div>
            )
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
