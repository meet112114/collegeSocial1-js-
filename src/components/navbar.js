import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "../css/navbar.css";

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const { student , teacher , admin} = state;
    const navigate = useNavigate(); // For redirecting

    const token = localStorage.getItem("token");

    const handlePanelRedirect = () => {
      switch (token) {
        case '67298da80d6dfcc25fd3e18367b6421cac9d8729':
          dispatch({ type: "TEACHER_LOGIN", payload: true });
          navigate('/bca');
          break;
        case 'cf7fb0130d71c67d5d10ce32fc16a6b6d5b05a7c':
          dispatch({ type: "TEACHER_LOGIN", payload: true });
          navigate('/bms');
          break;
        case '5e4ed5f84298203339f0bad2238348b81127d4ec':
          dispatch({ type: "TEACHER_LOGIN", payload: true });
          navigate('/bsc');
          break;
        case '03c74060fcbb3248f8eb9b049b7312e0c31b4e93':
          dispatch({ type: "TEACHER_LOGIN", payload: true });
          navigate('/bbi');
          break;
        case '7f60d6c23cb4a195e1679bf4a880e7b4c2fd8d71':
          dispatch({ type: "TEACHER_LOGIN", payload: true });
          navigate('/baf');
          break;
        case 'a3a3aff90439be49b9a54103a39eb6f2de631a9d':
          dispatch({ type: "ADMIN_LOGIN", payload: true });
          navigate('/adminPost');
            break;
        default:  
          dispatch({ type: "STUDENT_LOGIN", payload: true });
          navigate('/');
      }
    };
    

    const RenderMenu = () => {
        if (student) {
            return (
                <>
                <li className="nav-item"><NavLink className="nav-link" to="/posts">Posts</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/announcements">Announcements</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/lectures">Lectures</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/activity">Applications</NavLink></li>
            </>
                 
            );
        } else if (teacher) {
            return (
                <>
                   <li className="nav-item"><NavLink className="nav-link" to="/posts">Posts</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/announcements">Announcements</NavLink></li>
                   <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handlePanelRedirect}>
              Panel
            </button>
          </li>
                </>
            );
        } else if (admin) {
          return (
              <>
                 <li className="nav-item"><NavLink className="nav-link" to="/posts">Posts</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/announcements">Announcements</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/admin">Activity</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/adminManage">Content</NavLink></li>
                 <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={handlePanelRedirect}>
            Panel
          </button>
        </li>
              </>
          );
      }else {
            return (
                <>
                
                </>
            );
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbarclass">
            <div className="container-fluid">
                <a className="navbar-brand" style={{ fontFamily: "monospace", cursor: "pointer" }} onClick={()=>{navigate('/')}}>
                   CollegeSocial
                </a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto">
                        <RenderMenu />
                        
                    </ul>
                   
                </div>
            </div>
        </nav>
    );
};

export default Navbar;