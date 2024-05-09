import React from 'react';

import Header from '@/components/ui/header';
import ModelCard from '@/components/ui/modelCard';

const MainComponent = () => {
  return (
    <div className='border w-full  text-white border-white  px-10'>
      <Header />
      <div className=' flex flex-wrap gap-9 items-center  justify-cente'>
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
      </div>
    </div>
  );
};

export default MainComponent;
