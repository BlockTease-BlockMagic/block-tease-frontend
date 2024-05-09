'use client';
import {
  Button,
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { ethers } from 'ethers';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

import { batchSubscribe, mintingNft } from '@/lib/func';
import { cn, toastStyles } from '@/lib/utils';

import moonBeamIcon from '../../../public/images/moonBeamIcon.png';
import zksyncIcon from '../../../public/images/zkSynchIcon.png';

export default function MyModal({
  dialogFor,
  value,
}: {
  dialogFor: string;
  value: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [walletChosen, setWalletChosen] = useState('');
  const [batchGaslessTrx, setBatchGaslessTrx] = useState('');
  const [nftTrx, setNftTrx] = useState('');
  const [loadingState, setLoadingState] = useState<string>('Confirm Payment');
  const [isLoading, setIsLoading] = useState(false);
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  const [provider, setProvider] = useState<any>(undefined);

  React.useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      setProvider(provider);
    }
  }, []);
  const handleOperation = async () => {
    try {
      setLoadingState('Processing Payment');
      setIsLoading(true);
      const resp = await batchSubscribe({
        modelId: 4,
        subscriptionId: 3,
        priceInUsd: value,
        provider,
      });
      setBatchGaslessTrx(resp.dispatch);
      setLoadingState('Payment completed successfully');
      setIsLoading(false);
      toast.success('Payment completed successfully', toastStyles);
      if (resp.dispatch) {
        setLoadingState('Minting Personalized NFT');
        setIsLoading(true);
        const res = await mintingNft({
          modelId: 1,
          fromAddr: resp.fromAddr,
        });
        setNftTrx(res.trxHash);
        setLoadingState('NFT minted successfully 🚀');
        toast.success('Transaction successfull 🚀', toastStyles);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setLoadingState('Confirm Payment');
      toast.error('Something went wrong', toastStyles);
    }
  };
  return (
    <>
      <Button
        onClick={open}
        className='border border-[#FB0393] bg-[#ff16b17c] hover:bg-[#ff16b1a2]  rounded-md py-2 px-4 text-sm font-medium text-white focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white'
      >
        {dialogFor}
      </Button>

      <Transition appear show={isOpen}>
        <Dialog
          as='div'
          className='relative z-10 focus:outline-none'
          onClose={close}
        >
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <TransitionChild
                enter='ease-out duration-300'
                enterFrom='opacity-0 transform-[scale(95%)]'
                enterTo='opacity-100 transform-[scale(100%)]'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 transform-[scale(100%)]'
                leaveTo='opacity-0 transform-[scale(95%)]'
              >
                <DialogPanel className='w-full max-w-xl  space-y-2 rounded-xl bg-white/5 p-10 backdrop-blur-2xl'>
                  <h1 className='text-2xl text-white'>Subscribe</h1>
                  <p className='text-white'>
                    Subscribe to get access to exclusive content
                  </p>

                  <div className='relative flex items-center gap-4 pb-32'>
                    <span
                      className={cn(
                        'absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2'
                      )}
                    >
                      {isLoading && (
                        <ImSpinner2
                          className='animate-spin mt-16'
                          color='white'
                          size={40}
                        />
                      )}

                      {loadingState === 'NFT minted successfully 🚀' && (
                        <FaCheckCircle
                          size={40}
                          color='white'
                          className=' mt-16'
                        />
                      )}
                    </span>
                    <div className='absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-full'>
                      {batchGaslessTrx && nftTrx && (
                        <div className='flex items-center justify-between w-full py-3'>
                          <a
                            href={`https://moonbase.moonscan.io/tx/${batchGaslessTrx}`}
                            target='_blank'
                            className='flex items-center text-white gap-1 hover:underline'
                          >
                            Payment success{' '}
                            <svg
                              stroke='currentColor'
                              fill='none'
                              stroke-width='2'
                              viewBox='0 0 24 24'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              height='1em'
                              width='1em'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                stroke='none'
                                d='M0 0h24v24H0z'
                                fill='none'
                              ></path>
                              <path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6'></path>
                              <path d='M11 13l9 -9'></path>
                              <path d='M15 4h5v5'></path>
                            </svg>
                          </a>
                          <a
                            href={`https://www.oklink.com/amoy/tx/${nftTrx}`}
                            target='_blank'
                            className='flex items-center text-white gap-1 hover:underline'
                          >
                            Nft Minted
                            <svg
                              stroke='currentColor'
                              fill='none'
                              stroke-width='2'
                              viewBox='0 0 24 24'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              height='1em'
                              width='1em'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                stroke='none'
                                d='M0 0h24v24H0z'
                                fill='none'
                              ></path>
                              <path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6'></path>
                              <path d='M11 13l9 -9'></path>
                              <path d='M15 4h5v5'></path>
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>

                    <Menu>
                      <MenuButton className='inline-flex z-20 items-center gap-4 rounded-md border-[#FB0393] bg-[#ff16b17c] hover:bg-[#ff16b1a2] py-2 px-6 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none  data-[open]:bg-[#fb039487] data-[focus]:outline-1 data-[focus]:outline-white'>
                        {!walletChosen ? 'Choose you blockchain' : walletChosen}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m19.5 8.25-7.5 7.5-7.5-7.5'
                          />
                        </svg>
                      </MenuButton>
                      <Transition
                        enter='transition ease-out duration-75'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                      >
                        <MenuItems
                          anchor='bottom'
                          className='w-52 origin-top-right z-30 rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none'
                        >
                          <MenuItem>
                            <button
                              onClick={() => setWalletChosen('zkSynch')}
                              className='group  flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'
                            >
                              <Image src={zksyncIcon} alt='zkSuncIcon' />
                              <p className=' text-lg '>zkSync</p>
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => setWalletChosen('MoonBeam')}
                              className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'
                            >
                              <Image src={moonBeamIcon} alt='moonBeamIcon' />
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>

                    <p className=' text-white '>
                      <svg
                        aria-label='USDC'
                        width='1em'
                        height='1em'
                        viewBox='0 0 32 32'
                        xmlns='http://www.w3.org/2000/svg'
                        className='inline-block size-[.8lh] shrink-0'
                      >
                        <g fill='none'>
                          <circle
                            cx='16'
                            cy='16'
                            r='16'
                            fill='#3E73C4'
                          ></circle>
                          <g fill='#FFF'>
                            <path d='M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z'></path>
                            <path d='M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z'></path>
                          </g>
                        </g>
                      </svg>{' '}
                      {value}
                    </p>
                  </div>

                  <Button
                    disabled={!walletChosen || (nftTrx ? true : false)}
                    onClick={() => handleOperation()}
                    className={cn(
                      `z-20 flex items-center justify-center w-full gap-2 rounded-md border-[#FB0393] bg-[#ff16b17c] hover:bg-[#ff16b1a2] py-2 px-10 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none  data-[open]:bg-[#fb039487] data-[focus]:outline-1 data-[focus]:outline-white`,
                      !walletChosen && 'cursor-not-allowed opacity-50 '
                    )}
                  >
                    {loadingState}
                    {(loadingState === 'Processing Payment' ||
                      loadingState === 'Minting Personalized NFT') && (
                      <div className='flex space-x-2 justify-center items-center'>
                        <span className='sr-only'>Loading...</span>
                        <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
                      </div>
                    )}
                  </Button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
