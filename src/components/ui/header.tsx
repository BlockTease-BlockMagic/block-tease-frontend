import React from 'react';

import MyModal from '@/components/ui/dialog';
const Header = () => {
  return (
    <div className='w-full flex items-center justify-between   py-8 '>
      <div className='w-[80%] relative '>
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
        <MyModal dialogFor='Connect your wallet' />
      </div>
    </div>
  );
};

export default Header;
