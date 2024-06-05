'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { toastStyles } from '@/lib/utils';
import useGlobalStore from '@/hooks/useGlobalStore';
import MarketPlaceCard from '@/components/ui/marketPlaceCard';
import { allModelData } from '@/utils/modelData';
const YourCollection = () => {
  const [data, setData] = useState([]);
  const filterMatchingIds = (array1: any, array2: any) => {
    const filteredArray = array1.filter((item1: any) => {
      return array2.some((item2: any) => {
        return item1.modelId === item2.id.toString() && !item1.isListed;
      });
    });

    return filteredArray;
  };
  const fetchStatus = async (address: string) => {
    // const res = await balanceOffModel(provider, modelData.id.toString());
    // setIsUnlocked(res);
    try {
      const resp = await fetch(
        `https://db-graph-backend.onrender.com/api/user-info?wallet_address=${address}`,
        {
          method: 'GET',
        }
      );
      const data = await resp.json();

      if (data.success) {
        const result = filterMatchingIds(data.data.subscriptions, allModelData);
        setData(result);
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Something went wrong', toastStyles);
    }
  };
  const { smartAddress } = useGlobalStore();
  React.useEffect(() => {
    if (smartAddress) {
      fetchStatus(smartAddress);
    }
    // fetchStatus('0x452A3C497e3594aBe772b864E2031408c6B3a48e');
  }, []);
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
                <MarketPlaceCard {...item} index={index + 1} />
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YourCollection;
