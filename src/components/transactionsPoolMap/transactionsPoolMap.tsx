import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Noty from "noty";

import { mainApiUri, pollInterval } from "../../config";
import useLazyFetch from "../../hooks/useLazyFetch";
import ErrorMessage from "../errorMessage/errorMessage";
import Loader from "../loader/loader";
import Transaction from "../transaction/transaction";

const TransactionsPoolMap = () => {
  const [getTransactionsPool, { data: transactionsPoolMap, loading, error }] =
    useLazyFetch<any>(`${mainApiUri}/api/transaction-pool-map`);
  const [mineTransactions] = useLazyFetch<any>(
    `${mainApiUri}/api/mine-transactions`,
    {
      useCache: false,
      onSuccess: (data) => {
        console.log(data);
        new Noty({
          text: "Succesfully sent",
          layout: "topRight",
          type: "success",
          timeout: 2000,
        }).show();

        getTransactionsPool();
      },
      onError: (err) => {
        console.log(err, "erd");
        new Noty({
          text: "Smth went wrong",
          layout: "topRight",
          type: "error",
          timeout: 2000,
        }).show();
      },
    }
  );

  useEffect(() => {
    getTransactionsPool();

    const interval = setInterval(() => {
      getTransactionsPool();
    }, pollInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleMineTransactions = () => {
    mineTransactions();
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading || !transactionsPoolMap) {
    return <Loader />;
  }

  return (
    <div className="transactions-pool-map">
      <h2>Transactions pool</h2>
      {transactionsPoolMap && Object.keys(transactionsPoolMap).length ? (
        <React.Fragment>
          {Object.values(transactionsPoolMap).map((transaction: any) => (
            <div key={transaction?.id}>
              <hr />
              <Transaction transaction={transaction} />
            </div>
          ))}
          <Button variant="outline-warning" onClick={handleMineTransactions}>
            Mine transactions
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <hr />
          <h2>Nothing here...</h2>
        </React.Fragment>
      )}
    </div>
  );
};

export default TransactionsPoolMap;
