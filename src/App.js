import "./App.css";
import React, { useState, useEffect } from "react";
import sign_in from "./config/auth";

// import { googleProvider } from "./config/authMethods";
import Home from "./Home";
function App() {
  let [user, setUser] = useState(false);
  // let [uname, setUname] = useState("");
  const handleClick = async () => {
    const res = await sign_in();
    console.log(res);

    localStorage.setItem("user", JSON.stringify(res));
    if (localStorage.getItem("user")) {
      // if(res?.displayName)
      // let displayName = res?.displayName;
      // setUname(displayName);
    }
    userCheck();
  };

  function userCheck() {
    if (localStorage.getItem("user")) setUser(true);
    else setUser(false);
  }

  function getName() {}

  useEffect(() => {
    userCheck();
  }, [user]);
  // useEffect(() => {}, [user]);

  return (
    <div className="App">
      {!user ? (
        <>
          <div className="login-page">
            <div className="login-form">
              {/* <h1>Welcome</h1> */}

              <button className="facebook_login" onClick={() => handleClick()}>
                Sign up with google
              </button>
              <button className="google_login" onClick={() => handleClick()}>
                Login with Google
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Home userCheck={userCheck} />
        </>
      )}
    </div>
  );
}

export default App;
