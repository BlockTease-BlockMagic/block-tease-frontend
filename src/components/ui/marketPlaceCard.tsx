import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import ListingDialog from '@/components/ui/marketPlaceDialoge';

const MarketPlaceCard = ({
  modelName,
  modelId,
  ipfsUrl,
  tokenId,
}: {
  modelName: string;
  modelId: string;
  ipfsUrl: string;
  tokenId: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [teaseData, setTeaseData] = useState({
    name: '',
    image: '',
  });
  useEffect(() => {
    const fetchTeaseData = async (ipfs: string) => {
      try {
        const response = await fetch(ipfs);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        setTeaseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeaseData(ipfsUrl);
  }, []);
  return (
    <div className='group wrapper z-10 relative overflow-hidden rounded-xl'>
      <div className='relative z-0 h-[300px]'>
        {/* Image */}
        <Image
          height={200}
          width={200}
          src={teaseData.image}
          priority
          alt='model'
          className='absolute top-0 left-0 w-full h-full object-cover rounded-xl transition-opacity duration-300 opacity-100 group-hover:opacity-80'
        />

        {/* Always visible text */}
        <div className='absolute bottom-0 left-0 w-full p-1 text-white group-hover:hidden block'>
          <div className='flex items-center justify-start gap-3 pb-2'>
            <div className='w-[40px] h-[40px] bg-white rounded-full overflow-hidden'>
              <Image
                height={200}
                width={200}
                src={teaseData.image}
                alt='model icon'
                className='w-full h-full object-cover'
              />
            </div>
            <p className='capitalize text-md font-bold flex gap-1 justify-center items-center'>
              {teaseData.name}.Tease{' '}
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
                  d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
                />
              </svg>
            </p>
          </div>
          <p>HOT COLLECTION</p>
        </div>

        {/* Revealing text */}
        <motion.div
          className='absolute bottom-0 left-0 w-full z-50 p-1  h-full flex flex-col items-center justify-end'
          initial={{ y: 0, opacity: 0 }}
          animate={isHovered ? { y: 0 } : { y: 20 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: 'linear' }}
        >
          <div className='text-white w-full  '>
            <div className='flex items-center w-full justify-start gap-2 '>
              <div className='w-[40px] h-[40px] bg-white rounded-full overflow-hidden'>
                <Image
                  src={teaseData.image}
                  height={200}
                  width={200}
                  alt='model icon'
                  className='w-full h-full object-cover'
                />
              </div>
              <p className='capitalize text-md font-bold flex gap-1 justify-center items-center'>
                {modelName}.Tease{' '}
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
                    d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
                  />
                </svg>
              </p>
            </div>
            <p>NFT COLLECTION</p>
            <p>List your nFt at the market place</p>
          </div>

          <ListingDialog
            icon={teaseData.image}
            name={modelName}
            modelId={parseInt(modelId)}
            tokenId={tokenId}
          />
        </motion.div>
      </div>
    </div>
  );
};

export const MarketPlaceCard2 = ({
  modelName,
  image,
}: {
  modelName: string;
  image: string;
}) => {
  const [buttonText, setButtonText] = useState('Accept the call 📞');

  // useEffect(() => {
  //   const fetchTeaseData = async (ipfs: string) => {
  //     try {
  //       const response = await fetch(ipfs);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //       setTeaseData(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchTeaseData(ipfsUrl);
  // }, []);
  return (
    <div className='group wrapper z-10 relative overflow-hidden rounded-xl'>
      <div className='relative z-0 h-[300px]'>
        {/* Image */}
        <Image
          height={200}
          width={200}
          src={image}
          priority
          alt='model'
          className='absolute top-0 left-0 w-full h-full opacity-20 object-cover rounded-xl transition-opacity duration-300'
        />
        {/* <div className='absolute top-0 left-1/2 -translate-x-1/2 mx-auto w-full p-1 text-white block'>
          <div className='flex items-center justify-center w-full pt-3 gap-3 pb-2'>
            <div className='w-[40px] h-[40px] bg-white rounded-full overflow-hidden'>
              <Image
                height={200}
                width={200}
                src={teaseData.image}
                alt='model icon'
                className='w-full h-full object-cover'
              />
            </div>
            <p className='capitalize text-md font-bold flex gap-1 justify-center items-center'>
              {teaseData.name}{' '}
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
                  d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
                />
              </svg>
            </p>
          </div>
        </div> */}
        <div className='absolute top-1 left-1/2 -translate-x-1/2 mx-auto w-full p-1 text-white block'>
          <div className='flex items-center justify-center w-full pt-3 gap-3 pb-2'>
            <p className='capitalize text-xl font-bold flex gap-1 justify-center items-center'>
              💋 {modelName} is calling... ❤️
            </p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-8 ringing'
            >
              <path
                fillRule='evenodd'
                d='M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
        <motion.div className=' w-full z-50 p-1  h-full flex flex-col items-center justify-end'>
          <div className='px-3 w-full flex items-center justify-center pb-2'>
            <button
              className={`w-[80%] mx-auto h-[45px] z-20 relative rounded-xl ${
                buttonText === 'Accept the call 📞'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-[#fb0393] hover:bg-opacity-80'
              } bg-opacity-45`}
              onMouseEnter={() => setButtonText('🎲 Try your luck 🌟')} // Change text on hover
              onMouseLeave={() => setButtonText('Accept the call 📞')} // Revert text on mouse leave
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {buttonText}
              </motion.span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketPlaceCard;
