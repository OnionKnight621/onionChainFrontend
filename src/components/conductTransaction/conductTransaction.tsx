import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Noty from 'noty';

const ConductTransaction = () => {
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (amount <= 0 || address.length < 64) {
      return setDisabled(true);
    }

    return setDisabled(false);
  }, [amount, address]);

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

  const handleSend = () => {
    new Noty({
      text: "Succesfully sent",
      layout: "topRight",
      type: "success",
    }).show();
    setAmount(0);
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
        <Button
          variant="outline-warning"
          disabled={disabled}
          onClick={handleSend}
        >
          Send
        </Button>
      </Form>
    </div>
  );
};

export default ConductTransaction;
