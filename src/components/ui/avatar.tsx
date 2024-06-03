'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import RippleLoader from '@/components/ui/RippleLoader';

const Avatar = ({
  userName,
  openId,
  ipfsUrl,
  avatarLoading,
}: {
  userName: string;
  openId: string;
  ipfsUrl: string;
  avatarLoading: boolean;
}) => {
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

        setTeaseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (ipfsUrl) {
      fetchTeaseData(ipfsUrl);
    }
  }, [ipfsUrl]);

  // if (!teaseData) {
  //   return <div>Loading...</div>;
  // }
  return (
    <a
      href={`https://testnets.opensea.io/assets/avalanche-fuji/0x82376da85a76360bc9ffc9a542961429a2a653ff/${openId}`}
      target='_blank'
      rel='noreferrer'
      className=' flex flex-col gap-1 items-center justify-center cursor-pointer'
    >
      <div className='rounded-full'>
        {teaseData && teaseData.image && teaseData.image !== "" ?
          <Image
            src={teaseData.image}
            alt={teaseData.name}
            width={50}
            height={50}
            className=' rounded-full'
          /> : <RippleLoader />
        }
      </div>
      <p className='text-[#CEB9E9] text-sm font-semibold'>
        {teaseData.name}.tease
      </p>
    </a>
  );
};

export default Avatar;
