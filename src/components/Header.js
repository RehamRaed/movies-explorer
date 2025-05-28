import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/logo.png";
import "../styles/Header.css";
import Dropdown from "react-bootstrap/Dropdown";

function Header() {
  const [sideNav, setsideNav] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDropdownMovies, setShowDropdownMovies] = useState(false);
  const [showDropdownPeople, setShowDropdownPeople] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [fadeState, setFadeState] = useState("fade-in");

  const dropdownTimeoutMovies = useRef(null);
  const dropdownTimeoutPeople = useRef(null);

  const handleClick = () => {
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  useEffect(() => {
    if (showLoginModal) {
      document.body.classList.add("blur-background");
    } else {
      document.body.classList.remove("blur-background");
    }
  }, [showLoginModal]);

  const handleCloseModal = () => {
    setFadeState("fade-out");
    setTimeout(() => {
      setShowLoginModal(false);
      setFadeState("fade-in");
    }, 600);
  };

  const sidenavShow = () => {
    setsideNav(!sideNav);
  };

  const handleMouseEnter = (type) => {
    if (type === "movies") {
      clearTimeout(dropdownTimeoutMovies.current);
      setShowDropdownMovies(true);
    } else if (type === "people") {
      clearTimeout(dropdownTimeoutPeople.current);
      setShowDropdownPeople(true);
    }
  };

  const handleMouseLeave = (type) => {
    if (type === "movies") {
      dropdownTimeoutMovies.current = setTimeout(() => {
        setShowDropdownMovies(false);
      }, 200);
    } else if (type === "people") {
      dropdownTimeoutPeople.current = setTimeout(() => {
        setShowDropdownPeople(false);
      }, 200);
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="logoImg" className="logo" />
        </div>

        <div className="navbar-toggler" onClick={sidenavShow}>
          <i className="bi bi-list list_icon"></i>
        </div>

        <div className={`nav-links ${sideNav ? "active" : ""}`}>
          {sideNav && (
            <i
              className="bi bi-x close-icon"
              onClick={() => setsideNav(false)}
            ></i>
          )}
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => setsideNav(false)}
                className="nav-link"
              >
                Home
              </Link>
            </li>

            <li
              className="dropdown dropdown-hover"
              onMouseEnter={() => handleMouseEnter("movies")}
              onMouseLeave={() => handleMouseLeave("movies")}
            >
              <Dropdown show={showDropdownMovies}>
                <Dropdown.Toggle as="span" className="nav-link">
                  Movies
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item
                    className="dropdown-item"
                    as={Link}
                    to="/movies"
                    onClick={() => {
                      setsideNav(false);
                      setShowDropdownMovies(false);
                    }}
                  >
                    Popular Movies
                  </Dropdown.Item>

                  <Dropdown.Item
                    className="dropdown-item"
                    as={Link}
                    to="/topRatedMovies"
                    onClick={() => {
                      setsideNav(false);
                      setShowDropdownPeople(false);
                    }}
                  >
                    Top Rated
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-item"
                    as={Link}
                    to="/upComingMovies"
                    onClick={() => {
                      setsideNav(false);
                      setShowDropdownPeople(false);
                    }}
                  >
                    Up Coming
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li
              className="dropdown dropdown-hover"
              onMouseEnter={() => handleMouseEnter("people")}
              onMouseLeave={() => handleMouseLeave("people")}
            >
              <Dropdown show={showDropdownPeople}>
                <Dropdown.Toggle as="span" className="nav-link">
                  People
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item
                    className="dropdown-item"
                    as={Link}
                    to="/people"
                    onClick={() => {
                      setsideNav(false);
                      setShowDropdownPeople(false);
                    }}
                  >
                    Popular Actors
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <i
            className="bi bi-plus-circle fs-4 text-white"
            role="button"
            onClick={handleClick}
          ></i>
          {showTooltip && (
            <div className="custom-tooltip">
              <div className="tooltip-arrow" />
              Can't find a movie or TV show?{" "}
              <a
                onClick={() => setShowLoginModal(true)}
                className="tooltip-link"
              >
                Login
              </a>{" "}
              to create it.
            </div>
          )}

          <button className="login" onClick={() => setShowLoginModal(true)}>
            Login
          </button>
        </div>
      </header>

      {showLoginModal && (
        <div className={`modal-overlay ${fadeState}`}>
          <div className="custom-modal">
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>

            <h2 className="modal-title">
              {isSignup ? "Create Account" : "Login"}
            </h2>

            {isSignup && (
              <input type="text" placeholder="Name" className="modal-input" />
            )}
            <input type="email" placeholder="Email" className="modal-input" />
            <input
              type="password"
              placeholder="Password"
              className="modal-input"
            />

            <p className="modal-message">
              This is a demo , Your data is not stored.
            </p>

            <p className="modal-link">
              {isSignup
                ? "Already have an account? "
                : "Don't have an account? "}
              <span
                className="signup-link"
                onClick={() => setIsSignup(!isSignup)}
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                {isSignup ? "Login" : "Sign up"}
              </span>
            </p>

            <button className="modal-submit">
              {isSignup ? "Sign up" : "Login"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
