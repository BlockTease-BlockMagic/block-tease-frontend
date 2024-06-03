'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import useGlobalStore from '@/hooks/useGlobalStore';
import useWeb3auth from '@/hooks/useWeb3auth';
import { toastStyles } from '@/lib/utils';

import MarketPlaceCard from '@/components/ui/marketPlaceCard';

import { allModelData } from '@/utils/modelData';
const YourCollection = ({
  chain
}: {
  chain: string
}) => {
  const { email, login } = useWeb3auth()
  const [tokenId, setTokenId] = useState('')
  const [data, setData] = useState([]);
  const filterMatchingIds = (array1: any, array2: any) => {
    const filteredArray = array1.filter((item1: any) => {
      return array2.some((item2: any) => {
        return item1.modelId === item2.id.toString();
      });
    }).filter((s) => !s.isListed);
    return filteredArray;
  };
  const fetchStatus = async (address: string, email: string, chain: string) => {
    // const res = await balanceOffModel(provider, modelData.id.toString());
    // setIsUnlocked(res);
    try {
      if (chain.toLowerCase() !== "moonbeam") {
        const resp = await fetch(
          `https://db-graph-backend.onrender.com/api/user-info?wallet_address=${address}&email=${email}`,
          // `https://db-graph-backend.onrender.com/api/user-info-moonbeam?email=${email}`,
          {
            method: 'GET',
          }
        );
        const data = await resp.json();
        if (data.success) {
          const result = filterMatchingIds(data.data.subscriptions, allModelData);
          setData(result);
        }
        return
      }
      const resp = await fetch(
        // `https://db-graph-backend.onrender.com/api/user-info?wallet_address=${address}&email=${email}`,
        `https://db-graph-backend.onrender.com/api/user-info-moonbeam?email=${email}`,
        {
          method: 'GET',
        }
      );
      const data = await resp.json();
      if (data.success) {
        const result = filterMatchingIds(data.data.subscriptions, allModelData);
        setData(result);
      }
      setTokenId(data.data.subscriptions[0].tokenId)
    } catch (err) {
      toast.dismiss();
      toast.error('Something went wrong', toastStyles);
    }
  };
  const { walletAddress } = useGlobalStore();
  React.useEffect(() => {
    if (walletAddress && email && chain) {
      fetchStatus(walletAddress, email, chain);
    }
  }, [email, walletAddress, chain]);


  return (
    <div className=' w-full  text-white '>
      {data.length === 0 ? (
        <div className='flex items-center justify-center w-full h-[500px]'>
          <p className='text-white text-3xl font-bold'>
            "You don't have any collection yet.
            <br /> Buy some NFTs to get started."
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 p-10'>
          {data.map((item: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <MarketPlaceCard {...item} index={index + 1} tokenId={item.tokenId} />
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YourCollection;
