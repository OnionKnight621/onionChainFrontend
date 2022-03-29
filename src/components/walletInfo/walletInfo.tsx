import { useEffect } from "react";

import { mainApiUri, pollInterval } from "../../config";
import useLazyFetch from "../../hooks/useLazyFetch";
import ErrorMessage from "../errorMessage/errorMessage";
import Loader from "../loader/loader";

interface IWalletInfo {
  address: string;
  balance: number;
}

const WalletInfo = () => {
  const [getWalletInfo, { data: walletInfo, loading, error }] =
    useLazyFetch<IWalletInfo>(`${mainApiUri}/api/wallet-info`, {
      useCache: false,
    });

  useEffect(() => {
    getWalletInfo();

    const interval = setInterval(() => {
      getWalletInfo();
    }, pollInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
