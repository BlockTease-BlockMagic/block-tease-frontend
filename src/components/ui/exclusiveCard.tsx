import Image from 'next/image';
import React from 'react';
type props = {
  image: any;
  name: string;
};
const ExclusiveCard = ({ image, name }: props) => {
  return (
    <div className='flex flex-col items-end gap-3 p-1'>
      <div className='flex gap-10 justify-between'>
        <div className=' flex gap-5 justify-center'>
          <Image
            src={image}
            alt='logo'
            width={48}
            height={48}
            className='w-12 h-12 rounded-md'
          />

          <div className='flex gap-2 flex-col items-center justify-center'>
            <div className='flex flex-col gap-2'>
              <span>intimate(15% off for a week!)</span>
              <div className='flex gap-2 text-xs'>
                <span className='px-2 bg-slate-600 flex  items-center  rounded-md text-white'>
                  {' '}
                  <svg
                    aria-label='USDC'
                    width='1em'
                    height='1em'
                    viewBox='0 0 32 32'
                    xmlns='http://www.w3.org/2000/svg'
                    className='inline-block size-[.8lh] shrink-0'
                  >
                    <g fill='none'>
                      <circle cx='16' cy='16' r='16' fill='#3E73C4'></circle>
                      <g fill='#FFF'>
                        <path d='M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z'></path>
                        <path d='M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z'></path>
                      </g>
                    </g>
                  </svg>
                  &nbsp;212.5
                </span>
                <span className='px-2 bg-slate-600  rounded-md text-white'>
                  0/40 left
                </span>
                <span className='px-2 bg-slate-600  rounded-md text-white'>
                  31
                </span>
                <span className='px-2 bg-slate-600  rounded-md text-white'>
                  1
                </span>
              </div>
              <div className='leading-5'>
                <p>Catch a glimpse ;)</p>
                <p>
                  original price:&nbsp;
                  <svg
                    aria-label='USDC'
                    width='1em'
                    height='1em'
                    viewBox='0 0 32 32'
                    xmlns='http://www.w3.org/2000/svg'
                    className='inline-block size-[.6lh] shrink-0'
                  >
                    <g fill='none'>
                      <circle cx='16' cy='16' r='16' fill='#3E73C4'></circle>
                      <g fill='#FFF'>
                        <path d='M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z'></path>
                        <path d='M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z'></path>
                      </g>
                    </g>
                  </svg>
                  &nbsp;250
                </p>
              </div>
            </div>
            <ul className='text-xs list-disc '>
              <li>Access my spicer exclusive content </li>
              <li>Chat with me</li>
              <li>10 min video call</li>
              <li>Limited edition {name} DAO Hoodies</li>
            </ul>
          </div>
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
      <div className='text-sm '>
        <span className='bg-fuchsia-500 rounded-lg px-2 py-1 text-white'>
          Buy
        </span>
        {/* <span className='bg-fuchsia-500 rounded-lg px-2 py-1 text-white'>Sell</span> */}
      </div>
    </div>
  );
};

export default ExclusiveCard;
