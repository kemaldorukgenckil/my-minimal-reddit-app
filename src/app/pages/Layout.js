import React, {useEffect} from 'react';
import { NavLink, Outlet, useNavigate} from 'react-router-dom';


const Layout = () => {
  
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/subreddits');
  },[])
  
  return (
    <>
      <nav>
        <ul className='nav-container'>
          <li>
            <NavLink to="subreddits" className="nav-link" activeClassName="active">Subreddits</NavLink>
          </li>
          <li>
            <NavLink to="contact" className="nav-link" activeClassName="active">Contact</NavLink>
          </li>
        </ul>
      </nav>
           
      <Outlet />
    </>
  );
};

export default Layout;
