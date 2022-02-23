import React from "react";

const Block = ({ block, index }) => {
  return (
    <div className="block">
      <div className="block-index">{index}</div>
      <table>
        <tbody>
          {/* <tr>
            <td>Data:</td>
            <td className="hash">
              {block.data.map((item, index) => (
                <div key={index}>
                    {delete item?.input?.signature}
                  <span>{JSON.stringify(item?.input, null, " ")}</span>
                  <br />
                </div>
              ))}
            </td>
          </tr> */}
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
  );
};

export default Block;
