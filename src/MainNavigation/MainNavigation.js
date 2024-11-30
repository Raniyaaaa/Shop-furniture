import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Store/authAdminSlice';

const MainNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.authAdmin);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="main-nav">
        <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Navbar.Brand>Furniture</Navbar.Brand>
          <div style={{ display: 'flex'}}>
            <NavLink to="/home" className="nav-link" style={{marginRight:'20px'}}>
              Home
            </NavLink>
            <NavLink to="/product-list" className="nav-link"style={{marginRight:'20px'}}>
              Products
            </NavLink>
            <NavLink to="/order-list" className="nav-link"style={{marginRight:'20px'}}>
              Orders
            </NavLink>
          </div>
            
          {isLoggedIn && (
            <Button onClick={handleLogout} className="nav-link">
              Logout
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavigation;
