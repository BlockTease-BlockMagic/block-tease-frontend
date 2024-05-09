'use client';
import Image from 'next/image';
import React from 'react';

import MyModal from '@/components/ui/dialog';

import modelImage from '../../../public/images/modelImage.png';
const ModelCard = () => {
  return (
    <div className=' w-[240px] lg:w-[250px] '>
      <div className=' flex items-center  rounded-t-md  justify-between p-3 bg-[#252327] '>
        <div className='flex items-center gap-2  '>
          <div className=' w-[30px] h-[30px] bg-white rounded-full'>
            {/* image will come in this div  */}.
          </div>

          <p className=' text-sm'>Rebecca de Winter</p>
        </div>
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
            d='M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z'
          />
        </svg>
      </div>
      <div className='w-full'>
        <Image
          src={modelImage}
          priority
          alt='model'
          className='object-cover '
        />
      </div>

      <div className=' flex flex-col gap-2 rounded-b-md  justify-between p-3 bg-[#252327] '>
        <div className='text-[#CEB9E9] '>
          <p>Viva Las Vegas: Hazel</p>
          <p> $2.50</p>
        </div>
        <div className=' flex  items-center justify-between'>
          <div className='flex gap-6 '>
            <span className='flex text-xs font-light'>
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
                  d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
              3.5K
            </span>
            <span className='flex text-xs font-light'>
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
                  d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                />
              </svg>
              49
            </span>
          </div>

          <MyModal dialogFor='Subscrbe' />
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
