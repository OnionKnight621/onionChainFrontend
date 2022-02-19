import React from 'react';
import { Container } from "react-bootstrap";

import Blocks from '../blocks/blocks';
import WalletInfo from '../walletInfo/walletInfo';

const Main = () => {
    return (
        <div className="main">
            <header className="main-header">
                <h1>ONIONCHAIN</h1>
                <WalletInfo />
            </header>
            <Container fluid>
                <div className="main-body">
                    <Blocks />
                </div>
            </Container>
        </div>
    );
}

export default Main;