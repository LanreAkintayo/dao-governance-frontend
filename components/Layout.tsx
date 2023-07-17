import { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { watchNetwork, watchAccount, getAccount} from '@wagmi/core';
import { ethers } from 'ethers';
import Header from './Header';
import useProposals from '../hooks/useProposals';
const Moralis = require('moralis').default;


interface LayoutProps {}

export default function Layout({
  children,
}: React.PropsWithChildren<LayoutProps>) {
  

  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const account = getAccount();

  const {loadAllProposals, loadLarBalance, larBalance} = useProposals()

  useEffect(() => {
    const getAllProposals = async () => {
        await loadAllProposals()
    
    }

    getAllProposals()

    }, [])
  
    useEffect(() => {
    const loadBalance = async () => {
      if (account?.address){
        await loadLarBalance(account.address)
      }  
    }

    loadBalance()

    }, [larBalance])


  /*** -------------------------------------------- */
  //      GET BLOCKCHAIN DATA
  /*** -------------------------------------------- */
  useEffect(() => {
    const calclateInitialSettings = async () => {

      try {
        const unwatchAccount = watchAccount(async (account) => {
          console.log('Account has changed......', account);
          const newAccountAddress = account && account.address;
         
        });

        const unwatchNetwork = watchNetwork(async (network) => {
          console.log('Network has changed:.......... ', network);


        });
      } catch (err) {
        console.log('Error::: ', err);
      }
    };
    calclateInitialSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div
      className="bg-light-100 dark:bg-dark-100 flex min-h-screen flex-col"
    //   style={{
    //     ['backgroundImage' as any]: 'url(https://planetai.app/bin/1.jpeg)',
    //   }}
    >
      <Header />

      <main className="flex flex-grow flex-col ">
        {children}
      </main>
    </div>
  );
}
