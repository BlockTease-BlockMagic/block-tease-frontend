import {
  Dialog,
  DialogPanel,
  Field,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

import LinearWithValueLabel from '@/components/ui/progressBar';
import { VanishInput } from '@/components/ui/vanishInput';

const BuyModal = ({
  txHash,
  progress,
  isOpen,
  icon,
  name,
  onClick,
  onClose,
  listingPrice,
}: {
  progress: number;
  txHash: string;
  onClick: () => void;
  listingPrice: string;
  onClose: () => void;
  icon: any;
  name: string;
  isOpen: boolean;
}) => {
  const placeholders = [
    `We have notified ${name} 💃💌 of your interest. Hold on! ✨`,
    'She has accepted your request! 🎉🎈 Let the fun begin! 💋',
    `${name} 💃👯‍♀️ is getting ready for you. Relax! ⏳💆`,
    `She's right around the corner 👠. Sit tight! 💺💃`,
    'She is ready!🍾 Head over and enjoy the show! 🎵🥂',
  ];

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={onClose}
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
              <DialogPanel
                style={{
                  zIndex: 99999,
                }}
                className='w-full relative max-w-xl text-white z-50 space-y-10 rounded-xl bg-white/5 px-10 py-14 backdrop-blur-2xl'
              >
                <h1 className='text-2xl text-white'>Buy NFT</h1>
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
                    <span className='flex items-center justify-start'>
                      {listingPrice}{' '}
                      <p className='flex gap-2 items-center text-white '>
                        &nbsp;
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
                      </p>
                    </span>
                  </div>
                </div>
                <div className='w-full  '>
                  <Field>
                    {progress > 0 && progress < 99 && txHash === '' && (
                      <span
                        className={cn(
                          'absolute left-1/2 w-full text-md text-center top-[60%] text-white -translate-x-1/2 -translate-y-1/2 z-50'
                        )}
                      >
                        <VanishInput
                          placeholders={placeholders}
                          progress={progress}
                        />
                      </span>
                    )}
                    {progress > 0 && progress < 99 && txHash === '' && (
                      <div className='h-[100px] flex items-end '>
                        <LinearWithValueLabel progress={progress} />
                      </div>
                    )}
                    {txHash !== '' ? (
                      <div className='h-[100px] w-full flex items-center justify-center'>
                        <a
                          href={'https://sepolia.etherscan.io/tx/' + txHash}
                          target='_blank'
                          className='underline'
                        >
                          Payment Successful
                        </a>
                      </div>
                    ) : null}
                  </Field>
                </div>
                {txHash === '' && progress === 0 && (
                  <button
                    className=' cursor-pointer h-[37px] w-full group/button relative overflow-hidden rounded-md bg-[rgb(48,20,47)] bg-gradient-to-br from-[rgba(48,20,47,1)] from-[0%] to-[rgba(17,12,23,1)] to-[57%] px-5 py-1.5 text-xs font-medium text-[#CEB9E9] transition-all hover:border-red-500 active:scale-95'
                    onClick={onClick}
                  >
                    <span className='absolute w-full bottom-0 left-0 z-0 h-0  bg-[#fb0393] transition-all duration-200 group-hover/button:h-full' />
                    <span className='relative w-full flex gap-2 justify-center items-center z-10 transition-all duration-500 group-hover/button:text-white'>
                      Buy NFT
                    </span>
                  </button>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BuyModal;
