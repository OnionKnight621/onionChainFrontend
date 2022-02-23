import React from "react";
import { Button, Modal } from "react-bootstrap";

const BlockDataModal = ({ block, show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      aria-labelledby="block-data"
    >
      <Modal.Header id="block-data" className="bg-dark text-light">
        <Modal.Title>Block Data</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <div className="bg-secondary">
          <table>
            <tbody>
              <tr>
                <td>Hash:</td>
                <td className="hash">{block.hash}</td>
              </tr>
              <tr>
                <td>Last hash:</td>
                <td className="hash">{block.lastHash}</td>
              </tr>
              <tr>
                <td>Time:</td>
                <td>{new Date(block.timestamp).toISOString()}</td>
              </tr>
              <tr>
                <td>Difficulty:</td>
                <td>{block.difficulty}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="hash">
          {block.data.map((item, index) => (
            <div key={index}>
              <hr />
              <pre className="bg-secondary text-light">
                {JSON.stringify(item, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark text-light">
        <Button variant="outline-light" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlockDataModal;
