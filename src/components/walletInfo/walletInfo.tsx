import React from "react";

import { mainApiUri } from "../../config";
import useFetch from "../../hooks/useFetch";
import ErrorMessage from "../errorMessage/errorMessage";
import Loader from "../loader/loader";

interface WalletInfo {
    address: string;
    balance: number;
}

const WalletInfo = () => {
    const { data: walletInfo, loading, error } = useFetch<WalletInfo>(`${mainApiUri}/api/wallet-info`);

    if (loading) return <Loader />;

    if (!walletInfo || error) {
        return <ErrorMessage error={error} />
    }

    return <div className="wallet-info">
        <span className="hash">{walletInfo.address}</span>
    </div>
}

export default WalletInfo;