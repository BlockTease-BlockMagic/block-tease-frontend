import React from 'react';

import Header from '@/components/ui/header';

import MainComponent from '@/app/feed/mainComponent';
import SideBar from '@/app/feed/sideBar';

const page = () => {
  return (
    <div className='bg-[rgb(48,20,47)] bg-gradient-to-br from-[rgba(48,20,47,1)] from-[0%] to-[rgba(17,12,23,1)] to-[57%] flex flex-col max-w-screen-2xl max-h-full mx-auto'>
      <Header />
      <div className='flex'>
        <SideBar />
        <MainComponent />
      </div>
    </div>
  );
};

export default page;
