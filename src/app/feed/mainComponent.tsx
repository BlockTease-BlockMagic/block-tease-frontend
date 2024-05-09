import React from 'react';

import Header from '@/components/ui/header';
import ModelCard from '@/components/ui/modelCard';

const MainComponent = () => {
  return (
    <div className='border-l-2 w-full  text-white border-l-[#433F48]'>
      <Header />
      <div className=' flex flex-wrap gap-9 items-center  justify-centent py-12 px-8'>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <React.Fragment key={index}>
            <ModelCard />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
