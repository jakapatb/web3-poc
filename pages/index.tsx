import React from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { TokenBalance } from "../components/TokenBalance";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import web3 from "web3";
import { SWRConfig } from "swr";
import { BEP20ABI } from "../utils/abi";
import { MyBalance } from "../components/MyBalance";
const injected = new InjectedConnector({ supportedChainIds: [56, 97] });

function App() {
  const { account, chainId, activate, library } = useWeb3React();

  const connect = async () => {
    console.log("connecting");
    const result = await activate(injected);
    console.log(result);
  };
  return (
    <div>
      <h1>chain id: {chainId}</h1>
      <h2>
        <span>Account: </span>

        <span>
          {account === null
            ? "-"
            : account
            ? `${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`
            : ""}
        </span>
      </h2>
      <button onClick={connect}>Connect</button>
      <SWRConfig value={{ fetcher: fetcher(library, BEP20ABI) }}>
        <MyBalance symbol="BNB" decimals={18} />
        <TokenBalance
          symbol={"Cake"}
          address="0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
          decimals={18}
        />
        <TokenBalance
          symbol={"Cake FARM"}
          address="0x009cF7bC57584b7998236eff51b98A168DceA9B0"
          decimals={18}
        />
        <TokenBalance
          symbol={"Bunny"}
          address="0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51"
          decimals={18}
        />
        <TokenBalance
          symbol={"USDT-BUSD BUNNY POOL"}
          address="0x866FD0028eb7fc7eeD02deF330B05aB503e199d4"
          decimals={18}
        />
      </SWRConfig>
    </div>
  );
}
export default App;

const fetcher = (library: Web3Provider, abi?: any) => (...args) => {
  const [arg1, arg2, ...params] = args;
  // it's a contract
  if (web3.utils.isAddress(arg1)) {
    const address = arg1;
    const method = arg2;
    const contract = new Contract(address, abi, library.getSigner());
    return contract[method](...params);
  }
  // it's a eth call
  const method = arg1;
  return library[method](arg2, ...params);
};
