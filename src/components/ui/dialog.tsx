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
import Image from 'next/image';
import { useState } from 'react';

import moonBeamIcon from '../../../public/images/moonBeamIcon.png';
import zksyncIcon from '../../../public/images/zkSynchIcon.png';

export default function MyModal({ dialogFor }: { dialogFor: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [walletChosen, setWalletChosen] = useState('');
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

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
                <DialogPanel className='w-full max-w-xl  space-y-2 rounded-xl bg-white/5 px-10 py-40 backdrop-blur-2xl'>
                  <h1 className='text-2xl text-white'>Subscribe</h1>
                  <p className='text-white'>
                    Subscribe to get access to exclusive content
                  </p>

                  <div className=' flex items-center gap-4 '>
                    <Menu>
                      <MenuButton className='inline-flex z-20 items-center gap-2 rounded-md border-[#FB0393] bg-[#ff16b17c] hover:bg-[#ff16b1a2] py-2 px-10 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none  data-[open]:bg-[#fb039487] data-[focus]:outline-1 data-[focus]:outline-white'>
                        {!walletChosen ? 'Choose you wallet' : walletChosen}
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

                    <p className=' text-white '> 4.99 USD</p>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
