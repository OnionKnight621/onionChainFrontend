import { mainApiUri } from "../../config";
import useFetch from "../../hooks/useFetch";
import ErrorMessage from "../errorMessage/errorMessage";
import Loader from "../loader/loader";

interface IWalletInfo {
  address: string;
  balance: number;
}

const WalletInfo = () => {
  const {
    data: walletInfo,
    loading,
    error,
  } = useFetch<IWalletInfo>(`${mainApiUri}/api/wallet-info`);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading || !walletInfo) return <Loader />;

  return (
    <div className="wallet-info">
      <span className="hash">
        {walletInfo.address} : {walletInfo.balance}
      </span>
    </div>
  );
};

export default WalletInfo;
