'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { IoMdPower } from 'react-icons/io';

import useGlobalStore from '@/hooks/useGlobalStore';
import useWeb3auth from '@/hooks/useWeb3auth';
import { userOnBoarding } from '@/lib/func';
import { cn, toastStyles } from '@/lib/utils';

import Avatar from '@/components/ui/avatar';

import logo from '../../../public/images/logoWithoutGradient.png';
const getButtonCTA = ({
  isLoading,
  text,
}: {
  isLoading: boolean;
  text: string;
}) => {
  if (isLoading) {
    return (
      <span
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      >
        <ImSpinner2 className='animate-spin' />
      </span>
    );
  }
  return text;
};
type props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ isOpen, setIsOpen }: props) => {
  const { walletAddress: smartAddress } = useGlobalStore();

  const {
    login,
    loggedIn,
    logout,
    name,
    provider,
    email,
    getUserInfo,
    smartAccount,
  } = useWeb3auth();
  const [openAiId, setOpenAiId] = useState('');
  const [ipfsUrl, setIpfsUrl] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const createNft = async () => {
    try {
      const res = await fetch(
        'https://open-ai-avatar-nft-gen.onrender.com/generate-avatar-openAI',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name }),
        }
      );
      const data = await res.json();
      if (data.success) {
        //call contract
        // const res = await userOnBoarding(provider, name);
        const res = await userOnBoarding(name, smartAccount);
        if (res?.hash) {
          const fetcher = await fetch(
            'https://open-ai-avatar-nft-gen.onrender.com/create-nft-pin-metadata',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: name,
                description:
                  'Welcome to BlockTease, with this NFT you gain access to our exclusive content! Enjoy (:',
              }),
            }
          );
          const resp = await fetcher.json();
          if (resp.success) {
            //call register api here
            const reps = await fetch(
              'https://db-graph-backend.onrender.com/api/register',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: name,
                  email: email,
                  wallet_address: smartAddress,
                  ipfs_url: resp.metadataIPFSUrl,
                  openAi_tokenId: res.tokenId.toString(),
                }),
              }
            );
            const data = await reps.json();
            if (data.success) {
              fetchUserDetails(smartAddress || '', email);
            }
          }
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Something went wrong', toastStyles);
    }
  };
  const handleCopy = (address: string) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success('Address copied to clipboard!', toastStyles);
      })
      .catch(() => {
        toast.success('Something went wrong', toastStyles);
      });
  };
  const fetchUserDetails = async (address: string, email: string) => {
    try {
      setAvatarLoading(true);
      if (!email) return;
      const resp = await fetch(
        `https://db-graph-backend.onrender.com/api/user-info-moonbeam?email=${email}`,
        {
          method: 'GET',
        }
      );
      const data = await resp.json();
      if (data.success) {
        setAvatarLoading(false);
        setOpenAiId(data.data.user.openAi_tokenId);
        setIpfsUrl(data.data.user.ipfs_url);
      } else if (data.message === 'User not found') {
        //call here
        createNft();
      }
    } catch (error) {
      setAvatarLoading(false);
      toast.dismiss();
      toast.error('Something went wrong', toastStyles);
    }
  };

  useEffect(() => {
    // if (loggedIn && name && localStorage.getItem(name) === null) {
    //   fetchNft();
    // }
    if (smartAddress && email && name) {
      fetchUserDetails(smartAddress, email);
    }
  }, [smartAddress, email, name]);

  return (
    <div className='w-full flex items-center justify-between bg-[#130D1A] px-6 py-4 lg:py-6 fixed top-0 z-50'>
      <div className='text-white lg:hidden'>
        {!isOpen ? (
          <svg
            onClick={() => setIsOpen(true)}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-10 transition-all ease-in-out delay-200'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        ) : (
          <svg
            onClick={() => setIsOpen(false)}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-10 transition-all ease-in-out delay-200'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        )}
      </div>
      <div className='w-1/4 flex flex-col text-center'>
        <Link href='/'>
          <Image src={logo} priority alt='logo' width={200} height={100} />
          <span className='text-[#CEB9E9] hidden sm:inline-block'>
            only<span className='text-blue-500'>Fans</span> for Web3
          </span>
        </Link>
      </div>
      <div className='hidden md:block w-1/2'>
        <div className='m-4 p-[0.8px] rounded-xl w-[80%] bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 relative'>
          <input
            placeholder='Search here'
            className='text-[#CEB9E9] w-full h-10 bg-[#2B213B] outline-none focus:outline-none rounded-xl px-12'
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 absolute text-[#CEB9E9] top-0 translate-x-full translate-y-1/3'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
        </div>
      </div>
      <div className='flex items-center gap-6 justify-end w-1/4 mx-4'>
        {smartAddress && (
          <Avatar
            userName={name || ''}
            openId={openAiId}
            ipfsUrl={ipfsUrl}
            avatarLoading={avatarLoading}
          />
        )}
        <button
          onClick={() =>
            !smartAddress ? login(0) : handleCopy(smartAddress || '')
          }
          className='z-30 relative bg-gradient-to-b from-[#FB0393] to-[#9A3CFF] font-bold rounded-md text-white py-2 px-4'
        >
          {getButtonCTA({
            isLoading: false,
            text: smartAddress
              ? smartAddress.slice(0, 4) + '...' + smartAddress.slice(-4)
              : 'Connect wallet',
          })}
        </button>
        {smartAddress && (
          <div className='cursor-pointer' onClick={() => logout()}>
            <IoMdPower color='white' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
