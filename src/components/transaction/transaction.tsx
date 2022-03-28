import React from "react";

const Transaction = ({ transaction }) => {
  const { input, outputMap } = transaction;
  const recipients = Object.keys(outputMap);

  return (
    <div className="transaction">
      <table>
        <tbody>
          <tr>
            <td>From:</td>
            <td className="hash">{input.address}</td>
          </tr>
          <tr>
            <td>Balance:</td>
            <td className="hash">{input.amount}</td>
          </tr>
          {recipients.map((recipient) => (
            <React.Fragment key={recipient}>
              <tr>
                <td>To:</td>
                <td className="hash">{recipient}</td>
              </tr>
              <tr>
                <td>Sent: </td>
                <td>{outputMap[recipient]}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
