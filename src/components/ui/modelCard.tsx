'use client';
import Image from 'next/image';
import React from 'react';

import MyModal from '@/components/ui/dialog';

const ModelCard = ({
  name,
  icon,
  image,
  value,
  views,
  likes,
  location,
}: {
  name: string;
  icon: any;
  image: any;
  value: number;
  views: number;
  likes: number;
  location: string;
}) => {
  return (
    <div className=' w-[240px] lg:w-[250px]'>
      <div className=' flex items-center  rounded-t-lg  justify-between p-3 bg-[#2B213B] '>
        <div className='flex items-center gap-2  '>
          <div className=' w-[30px] h-[30px] bg-white rounded-full'>
            <Image src={icon} alt='model icon' className='rounded-full' />
          </div>

          <p className=' text-sm'>{name}</p>
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
          src={image}
          priority
          alt='model'
          className='object-cover w-full '
        />
      </div>

      <div className=' flex flex-col gap-2 rounded-b-lg  justify-between p-3 bg-[#2B213B] '>
        <div className='text-[#CEB9E9]'>
          <p>{location}</p>
          <p className=' flex items-center gap-1'>
            {' '}
            <svg
              aria-label='USDC'
              width='.5em'
              height='.5em'
              viewBox='0 0 32 32'
              xmlns='http://www.w3.org/2000/svg'
              className='inline-block size-[.7lh] shrink-0'
            >
              <g fill='none'>
                <circle cx='16' cy='16' r='16' fill='#3E73C4'></circle>
                <g fill='#FFF'>
                  <path d='M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z'></path>
                  <path d='M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z'></path>
                </g>
              </g>
            </svg>
            {value}
          </p>
        </div>
        <div className=' flex  items-center justify-between'>
          <div className='flex gap-4 '>
            <span className='flex gap-1 text-xs font-light'>
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
              {views}M
            </span>
            <span className='flex gap-1 text-xs font-light'>
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
              {likes}K
            </span>
          </div>

          <MyModal dialogFor='Subscrbe' value={value} />
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
