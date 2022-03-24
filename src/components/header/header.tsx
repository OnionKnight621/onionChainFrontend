import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import WalletInfo from "../walletInfo/walletInfo";

const Header = () => {
  return (
    <header className="main-header">
      <Container className="menu">
        <Nav className="me-auto">
          <Link to="/">blocks</Link>
          <Link to="/transact">transact</Link>
        </Nav>
      </Container>
      <h1>
        <Link to="/">ONIONCHAIN</Link>
      </h1>
      <WalletInfo />
    </header>
  );
};

export default Header;
