import React from 'react';

import MainComponent from '@/app/feed/mainComponent';
import SideBar from '@/app/feed/sideBar';

const page = () => {
  return (
    <div className='bg-black flex max-w-screen-2xl max-h-full mx-auto'>
      <SideBar />
      <MainComponent />
    </div>
  );
};

export default page;
