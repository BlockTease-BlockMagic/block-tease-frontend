'use client';

import Image from 'next/image';
import '@/lib/env';

import firstScreenBg from '../../public/images/firstScreenBg.png';
import logo from '../../public/images/logo.png';
import qr from '../../public/images/qr.png';
export default function HomePage() {
  return (
    <main className='  text-[#AAAAAA] font-bold relative w-full h-screen'>
      <Image
        src={firstScreenBg}
        alt='backgrond iamge'
        className=' w-full h-screen'
      />
      <div className='absolute top-0  right-0 w-1/2 h-full p-6 '>
        <div className=' flex flex-col items-center h-full justify-around'>
          <Image src={logo} priority alt='logo' width={300} height={200} />
          <div className='flex flex-col items-center justify-between  gap-10'>
            <p className='text-xl bg-[rgb(148,60,255)] bg-gradient-to-r from-[#943cff] to-[rgba(251,3,147,1)] bg-clip-text text-transparent text-center'>
              "Empower your content, <br />
              redefine connection."
            </p>
            <p className=' text-center font-bold  text-3xl  leading-10 text-white '>
              We know you are Excited! <br />
              Simple Verification & you are sorted.
            </p>
            <div className='flex flex-col items-center gap-1'>
              <Image priority src={qr} alt='logo' height={250} width={250} />
              <p className='text-[#FB0393] font-bold text-sm '>
                Scan to verify 18+
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
