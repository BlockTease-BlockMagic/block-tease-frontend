'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import useGlobalStore from '@/hooks/useGlobalStore';
import useWeb3auth from '@/hooks/useWeb3auth';
import { getModalPayment } from '@/lib/func';
import { toastStyles } from '@/lib/utils';

import ModelBanner from '@/app/(main)/profile/(components)/banner';
import ModelFeed from '@/app/(main)/profile/(components)/feed';
import RightSideBar from '@/app/(main)/profile/(components)/rightSideBar';
import { Props } from '@/app/(main)/profile/[id]/page';
import NotFound from '@/app/not-found';
import { allModelData } from '@/utils/modelData';
const CreatorProfile = ({ params }: Props) => {
  const [modelFees, setModelFees] = useState<number>(0);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const modelData = allModelData.filter((item) => item.slug === params.id)[0];
  const { address, email } = useWeb3auth();

  const fetchModalFees = async () => {
    const data = await getModalPayment(modelData.id);

    setModelFees(parseInt(data));
  };
  const fetchStatus = async (address: string, email: string) => {
    // const res = await balanceOffModel(provider, modelData.id.toString());
    // setIsUnlocked(res);
    try {
      const resp = await fetch(
        `https://db-graph-backend.onrender.com/api/user-info-moonbeam?email=${email}`,
        {
          method: 'GET',
        }
      );
      const data = await resp.json();

      if (data.success) {
        const userData = data.data.subscriptions?.some(
          (item: any) => item.modelId === modelData.id.toString()
        );
        if (userData) {
          setIsUnlocked(true);
        }
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Something went wrong', toastStyles);
    }
  };
  const { walletAddress } = useGlobalStore();
  React.useEffect(() => {
    if (walletAddress && email) {
      fetchStatus(walletAddress, email);
    }
    fetchModalFees();
  }, [email, walletAddress]);

  if (!modelData) return <NotFound />;
  return (
    <div className=' text-white   container py-6 mx-auto   grid grid-cols-5'>
      <div className=' p-4 md:p-0 mx-auto flex items-center col-span-5 lg:col-span-3 flex-col justify-center  space-y-4 '>
        <ModelBanner likes={0} {...modelData} />
        <div className='w-full block sm:hidden '>
          <RightSideBar
            image={modelData.icon.src}
            name={modelData.name}
            modelFees={modelFees}
            modelId={modelData.id}
            isUnlocked={isUnlocked}
            setIsUnlocked={setIsUnlocked}
          />
        </div>

        <ModelFeed
          modelData={{ ...modelData, likes: 0, index: 0 }}
          modelFees={modelFees}
          setIsUnlocked={setIsUnlocked}
          isUnlocked={isUnlocked}
        />
      </div>
      <div className='px-10 hidden lg:block col-span-2'>
        <RightSideBar
          image={modelData.icon.src}
          name={modelData.name}
          modelFees={modelFees}
          modelId={modelData.id}
          isUnlocked={isUnlocked}
          setIsUnlocked={setIsUnlocked}
        />
      </div>
    </div>
  );
};

export default CreatorProfile;
