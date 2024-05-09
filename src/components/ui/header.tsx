'use client';
declare global {
  interface Window {
    ethereum: any;
  }
}
import detectEthereumProvider from '@metamask/detect-provider';
import Image from 'next/image';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

import logo from '../../../public/images/logoWithoutGradient.png';
const getButtonCTA = ({
  isLoading,
  text,
}: {
  isLoading: boolean;
  text: string;
}) => {
  if (isLoading) {
    return (
      <span
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      >
        <ImSpinner2 className='animate-spin' />
      </span>
    );
  }
  return text;
};

const Header = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [account, setAccount] = React.useState<string | null>(null);
  const configureMoonbaseAlpha = async () => {
    const provider: any = await detectEthereumProvider({
      mustBeMetaMask: true,
    });
    if (provider) {
      try {
        await provider.request({ method: 'eth_requestAccounts' });
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x507',
              chainName: 'Moonbase Alpha',
              nativeCurrency: {
                name: 'DEV',
                symbol: 'DEV',
                decimals: 18,
              },
              rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
              blockExplorerUrls: ['https://moonbase.moonscan.io/'],
            },
          ],
        });
        const chainId = await provider.request({
          method: 'eth_chainId',
        });
        // Moonbase Alpha's chainId is 1287, which is 0x507 in hex
        if (chainId === '0x507') {
          const accountAddr =
            typeof window !== 'undefined' && (await window.ethereum.enable());
          setAccount(accountAddr[0]);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error('Please install MetaMask');
    }
  };
  return (
    <div className='w-full flex items-center justify-around bg-[#130D1A] p-6 '>
      <Image src={logo} priority alt='logo' width={200} height={100} />
      <div className='w-[60%] relative'>
        <input
          placeholder='Search here'
          className=' text-[#CEB9E9] w-[50%] ml-4 bg-[#2B213B] outline-none focus:outline-none rounded-xl  px-10 '
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 absolute text-[#CEB9E9] top-0 translate-x-full translate-y-1/3 '
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </div>
      <div className='flex items-center justify-end w-[20%] ml-10'>
        <button
          onClick={() => configureMoonbaseAlpha()}
          className='z-30 relative bg- w-[150px] h-[40px] bg-[rgb(251,3,147)] bg-gradient-to-b from-[rgba(251,3,147,1)] from-[0%] to-[rgba(20,12,54,0.4)] to-[84%] font-bold rounded-md text-white  py-2'
        >
          {getButtonCTA({
            isLoading: false || false,
            text: account
              ? account.slice(0, 4) + '...' + account.slice(4, 7)
              : 'Connect wallet',
          })}
        </button>
      </div>
    </div>
  );
};

export default Header;
