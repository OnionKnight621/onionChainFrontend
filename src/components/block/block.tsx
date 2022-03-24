import { useState } from "react";
import BlockDataModal from "../blockDataModal/blockDataModal";

const Block = ({ block, index }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="block" onDoubleClick={() => setShowModal(true)}>
      <div className="block-index">{index}</div>
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

      <BlockDataModal
        show={showModal}
        block={block}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Block;
