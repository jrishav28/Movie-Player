import React, { useState, useEffect } from "react";
import "./nav.css";
import { sign_out } from "../../config/auth";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";

const Navbar = ({ userCheck, search, setSearch }) => {
  const [show, handleShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? handleShow(true) : handleShow(false);
    });
  }, [show]);

  // let [userDetail, setUserDetail] = useState({ fullName: "", emailid: "" });

  let [obj, setObj] = useState({});
  let emailid, fullName, ob;

  function username() {
    let un = localStorage.getItem("user");
    ob = JSON.parse(un);

    let { displayName, email } = ob;
    // setObj(ob);
    console.log(displayName);
    let uname = displayName
      .split(" ")
      .map((n) => n.split("").splice(0, 1))
      .join("")
      .toUpperCase();

    return uname;
  }

  async function logout() {
    let x = await sign_out();
    if (x) userCheck();
  }

  return (
    <div className={`nav ${show ? "nav__black" : ""}`}>
      {/* <img
        src="https://iconape.com/wp-content/png_logo_vector/video-camera.png"
        alt="netflix logo"
        className="nav__logo"
      /> */}
      <nav className="nav-left">
        <ul>
          <li>
            <a className="active" href="#home">
              Home
            </a>
          </li>
          <li>
            <a href="#tv">Tv Shows</a>
          </li>
          <li>
            <a href="#movie"> Movies</a>
          </li>
          <li>
            <a href="#recent"> Recently Added</a>
          </li>
          <li>
            <a href="#list">My List</a>
          </li>
        </ul>
      </nav>

      <nav className="nav-right">
        <div className="item search">
          <input
            type="text"
            value={search}
            placeholder="search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="item search-icon">
          <BiSearch></BiSearch>
        </div>
        <div className="item bell">
          <BsFillBellFill />
        </div>
        <div className="item uname" onClick={() => setDropdown((p) => !p)}>
          <p>{username()}</p>
        </div>

        <div className="item down" onClick={() => setDropdown((p) => !p)}>
          <AiOutlineCaretDown />
          {dropdown && (
            <div className="profile">
              <p className="display-name">
                Name :{" "}
                <span className="info">{ob.displayName.toUpperCase()}</span>
              </p>
              <p className="email">
                Email : <span className="info">{ob?.email}</span>
              </p>
              <div className="logout">
                <button onClick={() => logout()}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
