import { mainApiUri } from "../../config";
import useFetch from "../../hooks/useFetch";
import ErrorMessage from "../errorMessage/errorMessage";
import Loader from "../loader/loader";
import Transaction from "../transaction/transaction";

const TransactionsPoolMap = () => {
  const {
    data: transactionsPoolMap,
    loading,
    error,
  } = useFetch<any>(`${mainApiUri}/api/transaction-pool-map`);

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
