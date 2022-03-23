import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ConductTransaction = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 256) {
      setAddress(value);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setAmount(value);
    }
  };

  return (
    <div className="transact">
      <h2>Transact</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="address"
            value={address}
            onChange={handleAddressChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default ConductTransaction;
