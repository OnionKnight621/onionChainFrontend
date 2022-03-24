import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Blocks from "../blocks/blocks";
import ConductTransaction from "../conductTransaction/conductTransaction";
import Header from "../header/header";

const Main = () => {
  return (
    <main className="main">
      <Header />
      <Container fluid>
        <div className="main-body">
          <Routes>
            <Route path="/" element={<Blocks />} />
            <Route path="/transact" element={<ConductTransaction />} />
            <Route path="*" element={<Blocks />} />
          </Routes>
        </div>
      </Container>
    </main>
  );
};

export default Main;
