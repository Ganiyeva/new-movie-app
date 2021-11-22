import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

const Head = styled.header `
  position: fixed;
  top: 0;
  width: 100%;
  padding: 25px 0;
  background-color: #222125;
  z-index: 10;
`;

const Navbar = styled.nav `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img `
  width: 150px;
`;

const Nav = styled.div `
  width: 220px;
  display: flex;
  justify-content: space-between;
`;

function Header() {
  return (
    <Head>
      <div className="container">
        <Navbar>
          <Link to="/"> <Logo src="/img/love_movies.png" alt="logo" /> </Link>
          <Nav>
            <NavLink className="nav-link" activeClassName="active-nav" exact to="/"> Home </NavLink>
            <NavLink className="nav-link" activeClassName="active-nav" to="/catalog"> Catalog </NavLink>
            <NavLink className="nav-link" activeClassName="active-nav" to="/search"> Search </NavLink>
          </Nav>
        </Navbar>
      </div>
    </Head>
  );
};

export default Header;