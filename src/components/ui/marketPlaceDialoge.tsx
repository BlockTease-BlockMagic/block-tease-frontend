'use client';
import useWeb3auth from '@/hooks/useWeb3auth';
import { listNft } from '@/lib/func';
import { toastStyles } from '@/lib/utils';
import {
  Description,
  Dialog,
  DialogPanel,
  Field,
  Input,
  Label,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { clsx } from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
type props = {
  icon: any;
  name: string;
  modelId: number;
  tokenId: string;
};
export default function ListingDialog({ icon, name, modelId, tokenId }: props) {
  const [isOpen, setIsOpen] = useState(false);

  const [listingPrice, setListingPrice] = React.useState<number>(0);

  const { smartAccount, login } = useWeb3auth();

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  const handleListing = async () => {
    toast.loading('Listing your NFT', toastStyles);
    login(1);
    const resp = await listNft(smartAccount, tokenId, listingPrice);
    if (resp.hash) {
      const result = await fetch(
        'https://db-graph-backend.onrender.com/api/list-subscription',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenId: tokenId,
            price: listingPrice.toString(),
            listingId: resp.listingId,
          }),
        }
      );
      const data = await result.json();
      if (data.success) {
        toast.dismiss();
        toast.success('NFT listed successfully 🚀', toastStyles);
      }
    } else {
      toast.dismiss();
      toast.success('Something went wrong', toastStyles);
    }
  };
  return (
    <>
      <button
        onClick={open}
        className=' cursor-pointer h-[37px] w-full group/button relative overflow-hidden rounded-md bg-[rgb(48,20,47)] bg-gradient-to-br from-[rgba(48,20,47,1)] from-[0%] to-[rgba(17,12,23,1)] to-[57%] px-5 py-1.5 text-xs font-medium text-[#fb0393] transition-all hover:border-red-500 active:scale-95'
      >
        <span className='absolute bottom-0 left-0 z-0 h-0 w-full bg-[#fb0393] transition-all duration-200 group-hover/button:h-full' />
        <span className='relative flex gap-2 justify-center items-center z-10 transition-all duration-500 group-hover/button:text-white'>
          List your Nft
        </span>
      </button>

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
                <DialogPanel className='w-full max-w-xl text-white  space-y-10 rounded-xl bg-white/5 px-10 py-14 backdrop-blur-2xl'>
                  <h1 className='text-2xl text-white'>Quick List</h1>
                  <div className=' flex justify-between'>
                    <div className='flex gap-2'>
                      <Image
                        height={200}
                        width={200}
                        src={icon}
                        alt={name}
                        className=' w-12 h-12 rounded-full'
                      />
                      <span>{name}</span>
                    </div>

                    <div className=' flex flex-col'>
                      <span>Listing price</span>
                      <span>--USDC</span>
                    </div>
                  </div>

                  <div className='w-full  '>
                    <Field>
                      <Label className='flex items-center gap-x-2  font-bold text-lg text-white'>
                        Set a price{' '}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-4 h-4'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
                          />
                        </svg>
                      </Label>
                      <Description className='text-sm/6 text-white/50'>
                        Starting Price
                      </Description>
                      <div className='relative '>
                        <Input
                          type='number'
                          placeholder='Amount'
                          className={clsx(
                            'mt-3 block w-[80%] rounded-l-lg border border-[#dbd2d2] bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                          )}
                          onChange={(e: any) => setListingPrice(e.target.value)}
                        />
                        <div
                          className={clsx(
                            'mt-3 w-[20%] block border-[#dbd2d2] border absolute top-2 left-full -translate-x-full -translate-y-[54%] rounded-r-lg  bg-white/5 py-1.5 px-3 text-sm/6 text-white'
                          )}
                        >
                          {' '}
                          <p className='flex gap-2 items-center text-white '>
                            <svg
                              aria-label='USDC'
                              width='.4em'
                              height='.5em'
                              viewBox='0 0 32 32'
                              xmlns='http://www.w3.org/2000/svg'
                              className='inline-block size-[.7lh] shrink-0'
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
                            </svg>
                            USDC
                          </p>
                        </div>
                      </div>
                    </Field>
                  </div>

                  <button
                    className=' cursor-pointer h-[37px] w-full group/button relative overflow-hidden rounded-md bg-[rgb(48,20,47)] bg-gradient-to-br from-[rgba(48,20,47,1)] from-[0%] to-[rgba(17,12,23,1)] to-[57%] px-5 py-1.5 text-xs font-medium text-[#CEB9E9] transition-all hover:border-red-500 active:scale-95'
                    onClick={handleListing}
                  >
                    <span className='absolute w-full bottom-0 left-0 z-0 h-0  bg-[#fb0393] transition-all duration-200 group-hover/button:h-full' />
                    <span className='relative w-full flex gap-2 justify-center items-center z-10 transition-all duration-500 group-hover/button:text-white'>
                      Complete Listing
                    </span>
                  </button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
