'use client';
declare global {
  interface Window {
    ethereum: any;
  }
}
import { cn } from '@/lib/utils';
import detectEthereumProvider from '@metamask/detect-provider';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
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
    <div className='w-full flex items-center justify-between  p-8 border-b-2 border-b-[#433F48]'>
      <div className='w-[80%] relative'>
        <input
          placeholder='Search here'
          className=' text-[#CEB9E9] w-[50%] bg-[#252327] outline-none focus:outline-none rounded-md px-10 '
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 absolute top-0 translate-x-1 translate-y-1/3 '
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </div>
      <div className='w-[20%]'>
        <button
          onClick={() => configureMoonbaseAlpha()}
          className='z-30 relative bg-white w-[150px] h-[40px] font-bold rounded-md text-black  py-2'
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
