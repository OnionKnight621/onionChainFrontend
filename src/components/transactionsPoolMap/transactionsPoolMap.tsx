import { useEffect } from "react";

import { mainApiUri, pollInterval } from "../../config";
import useLazyFetch from "../../hooks/useLazyFetch";
import ErrorMessage from "../errorMessage/errorMessage";
import Loader from "../loader/loader";
import Transaction from "../transaction/transaction";

const TransactionsPoolMap = () => {
  const [getTransactionsPool, { data: transactionsPoolMap, loading, error }] =
    useLazyFetch<any>(`${mainApiUri}/api/transaction-pool-map`);

  useEffect(() => {
    getTransactionsPool();

    const interval = setInterval(() => {
      getTransactionsPool();
      console.log(12)
    }, pollInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading || !transactionsPoolMap) {
    return <Loader />;
  }

  return (
    <div className="transactions-pool-map">
      <h2>Transactions pool</h2>
      {Object.values(transactionsPoolMap).map((transaction: any) => (
        <div key={transaction?.id}>
          <hr />
          <Transaction transaction={transaction} />
        </div>
      ))}
    </div>
  );
};

export default TransactionsPoolMap;
