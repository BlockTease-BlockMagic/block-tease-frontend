import React from 'react';

import ModelCard from '@/components/ui/modelCard';

import model1 from "../../../public/images/model1.png"
import model1Icon from "../../../public/images/model1Icon.png"
import model2 from "../../../public/images/model2.png"
import model2Icon from "../../../public/images/model2Icon.png"
import model3 from "../../../public/images/model3.png"
import model3Icon from "../../../public/images/model3Icon.png"
import model4 from "../../../public/images/model4.png"
import model4Icon from "../../../public/images/model4Icon.png"
import model5 from "../../../public/images/model5.png"
import model5Icon from "../../../public/images/model5Icon.png"
import model6 from "../../../public/images/model6.png"
import model6Icon from "../../../public/images/model6Icon.png"
import model7 from "../../../public/images/model7.png"
import model7Icon from "../../../public/images/model7Icon.png"
import model8 from "../../../public/images/model8.png"
import model8Icon from "../../../public/images/model8Icon.png"


const modelCardData = [
  {
    name: "Rebecca de Winter",
    icon: model1Icon,
    location: "Viva Las Vegas: Hazel",
    image: model1,
    value: 5,
    views: 3.5,
    likes: 49
  },
  {
    name: "Rebecca de summer",
    icon: model2Icon,
    location: "Viva las summer ",
    image: model2,
    value: 2,
    views: 3.1,
    likes: 44
  },
  {
    name: "Ava adams",
    icon: model3Icon,
    location: "Tango in Paris: Penelope",
    image: model3,
    value: 1,
    views: 4.5,
    likes: 41
  },
  {
    name: "Alxy star",
    icon: model4Icon,
    location: "Cha-Cha in New York: Stella",
    image: model4,
    value: 8,
    views: 5.5,
    likes: 59
  },
  {
    name: "Summer Salt",
    icon: model5Icon,
    location: "Flamenco in Seville: Scarlett",
    image: model5,
    value: 2,
    views: 3.5,
    likes: 40
  },
  {
    name: "summer sugar",
    icon: model6Icon,
    location: "Rumba in Havana: Ruby",
    image: model6,
    value: 4,
    views: 1.5,
    likes: 65
  },
  {
    name: "Linux star",
    icon: model7Icon,
    location: "Samba in Rio de Janeiro: Lily",
    image: model7,
    value: 5,
    views: 3.5,
    likes: 49
  },
  {
    name: "danny daniels",
    icon: model8Icon,
    location: "Tango in Buenos Aires",
    image: model8,
    value: 9,
    views: 4,
    likes: 45
  },

]

const MainComponent = () => {
  return (
    <div className='border-l-2 w-full  text-white border-l-[#433F48]'>

      <div className=' flex flex-wrap gap-10 items-center w-full  justify-center py-12 px-8'>
        {modelCardData.map((item, index) => (
          <React.Fragment key={index}>
            <ModelCard  {...item} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
