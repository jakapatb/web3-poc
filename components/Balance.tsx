import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import React from "react";
import { formatUnits } from "@ethersproject/units";

export const TokenBalance = ({ symbol, address, decimals }) => {
  const { account } = useWeb3React<Web3Provider>();
  const { data: balance } = useSWR([address, "balanceOf", account]);

  if (!balance) {
    return <div>...</div>;
  }
  return (
    <div>
      {parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol}
    </div>
  );
};
