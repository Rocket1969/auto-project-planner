import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";

import { Outlet, useNavigate, Link } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import Logo from "../../assets/auto-project-planner.png";
import "./nav.styles.css";

const Nav = () => {
   const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

   const signOutHandler = async () => {
      await signOutUser();
   }

  useEffect(() => {
    currentUser ? navigate("/projects") : navigate("/auth");
  }, [currentUser]);

  return (
    <>
      <header className="main-head">
        <nav className="main-nav">
          {
            currentUser ? (
              <Link to="/projects">
            <div className="logo-container">
              <img src={Logo} alt="automotive project planner logo"></img>
            </div>
          </Link>
            ) : (
              <Link to="/auth">
              <div className="logo-container">
                <img src={Logo} alt="automotive project planner logo"></img>
              </div>
            </Link>
            )
          }
          
          <div className="nav-links">
              {currentUser ? (
            <Link to="" onClick={signOutHandler}>
              SIGN OUT
            </Link>
          ) : (
            <Link to="/auth">SIGN IN</Link>
          )}
          </div>
        
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Nav;
