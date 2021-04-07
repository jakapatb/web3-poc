import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import React from "react";
import { formatUnits } from "@ethersproject/units";

export const MyBalance = ({ symbol, decimals }) => {
  const { account } = useWeb3React<Web3Provider>();
  const { data: balance } = useSWR(["getBalance", account, "latest"]);

  if (!balance) {
    return <div>??? {symbol}</div>;
  }
  return (
    <div>
      {parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol}
    </div>
  );
};
