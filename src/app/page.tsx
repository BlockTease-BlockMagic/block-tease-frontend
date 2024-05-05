'use client';

import '@/lib/env';
import Image from 'next/image';
import logo from '../../public/images/blockTease.png';
import qr from '../../public/images/qr.png';
import avatar from '../../public/images/avatar.png'
import { BackgroundGradient } from '@/components/ui/bg-gradient';
import { TextGenerateEffect } from '@/components/ui/textGeneration';
import avatar2 from '../../public/images/avatar2.png'
import avatar3 from '../../public/images/avatar3.png'
export default function HomePage() {
  return (
    <main className='text-[#AAAAAA] font-bold relative'>
   
      <section className='bg-[#010331] h-screen w-full px-8'><div className='flex items-center justify-between h-[20vh]'><Image src={logo} alt='logo' height={170} width={170} />
       <Image src={avatar2} alt='avatar2' height={200} width={200} />     <div><svg width="140" height="200"viewBox="0 0 342 286" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M62.1154 0.862305L124.231 36.7246L62.1154 72.587L1.68374e-05 36.7246L62.1154 0.862305Z" fill="#6212EC"/>
<path d="M62.1154 71.8516L124.231 107.714L62.1154 143.576L1.68374e-05 107.714L62.1154 71.8516Z" fill="#6212EC"/>
<path opacity="0.8" d="M62.1154 142.841L124.231 178.703L62.1154 214.565L1.68374e-05 178.703L62.1154 142.841Z" fill="#6212EC"/>
<path opacity="0.4" d="M62.1154 214.197L124.231 250.06L62.1154 285.922L1.68374e-05 250.06L62.1154 214.197Z" fill="#6212EC"/>
<path opacity="0.2" d="M124.483 107.622L124.483 179.346L186.599 143.484L186.599 71.7593L124.483 107.622Z" fill="#D9D9D9"/>
<path opacity="0.1" d="M186.28 143.3L186.28 215.025L248.396 179.163L248.396 107.438L186.28 143.3Z" fill="#D9D9D9"/>
<path opacity="0.1" d="M248.81 34.7935L248.81 106.518L310.925 70.6558L310.925 -1.06882L248.81 34.7935Z" fill="#D9D9D9"/>
<path opacity="0.1" d="M248.81 178.978L248.81 250.703L310.925 214.84L310.925 143.116L248.81 178.978Z" fill="#D9D9D9"/>
</svg>

</div></div>
      <div className='flex flex-col items-center justify-center'><div className='text-lg pb-5'>
       
          <TextGenerateEffect words = 'We Know You are Excited! Simple Verification & you are sorted!'/></div>
      <BackgroundGradient className='rounded-[22px] max-w-sm p-1 relative'>
        <div className='absolute top-20 left-[-300px]' ><Image src={avatar3} alt='avatar3' height={250} width={250} className='grayscale opacity-35'/></div>
        <Image src={qr} alt='qr' height={300} width={300} className='rounded-[22px]' />
        <div className='absolute bottom-[-100px] right-[-200px]'><Image src={avatar} alt='avatar' height={200} width={200} className='grayscale opacity-35'/></div>
      </BackgroundGradient>
      <div className='font-bold  text-[#AAAAAA]'> 
       <div className='text-sm pt-6'>Verify your age 🔞 + & support your favorite creators 🚀</div>
      </div>
    
      </div>
 
     <div className='absolute bottom-10'><svg width="140" height="200" viewBox="0 0 341 338" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.6" d="M93.0119 180.15L155.127 216.013L93.0119 251.875L30.8965 216.013L93.0119 180.15Z" fill="#6212EC"/>
<path opacity="0.4" d="M154.805 72.0117L216.92 107.874L154.805 143.736L92.6895 107.874L154.805 72.0117Z" fill="#6212EC"/>
<path opacity="0.6" d="M154.805 0.655273L216.92 36.5176L154.805 72.3799L92.6895 36.5176L154.805 0.655273Z" fill="#6212EC"/>
<path opacity="0.9" d="M93.1729 108.15L93.1729 179.875L31.0575 144.012L31.0576 72.2876L93.1729 108.15Z" fill="#6212EC"/>
<path opacity="0.3" d="M93.0119 251.508L155.127 287.37L93.0119 323.232L30.8965 287.37L93.0119 251.508Z" fill="#6212EC"/>
<path opacity="0.1" d="M279.29 149.346L279.29 221.071L217.175 185.209L217.175 113.484L279.29 149.346Z" fill="#6212EC"/>
<path opacity="0.2" d="M275.61 247.921L275.61 319.646L213.495 283.784L213.495 212.059L275.61 247.921Z" fill="#D9D9D9"/>
<path opacity="0.3" d="M341.085 108.335L278.97 144.197L278.969 72.4722L341.085 36.6099L341.085 108.335Z" fill="#DE3AF7"/>
<path opacity="0.2" d="M279.288 72.6558L217.173 108.518L217.173 36.7935L279.288 0.931152L279.288 72.6558Z" fill="#DE3AF7"/>
</svg>
</div>    




 <div className='absolute bottom-10 right-10 rotate-180'><svg width="140" height="200" viewBox="0 0 341 338" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.6" d="M93.0119 180.15L155.127 216.013L93.0119 251.875L30.8965 216.013L93.0119 180.15Z" fill="#6212EC"/>
<path opacity="0.4" d="M154.805 72.0117L216.92 107.874L154.805 143.736L92.6895 107.874L154.805 72.0117Z" fill="#6212EC"/>
<path opacity="0.6" d="M154.805 0.655273L216.92 36.5176L154.805 72.3799L92.6895 36.5176L154.805 0.655273Z" fill="#6212EC"/>
<path opacity="0.9" d="M93.1729 108.15L93.1729 179.875L31.0575 144.012L31.0576 72.2876L93.1729 108.15Z" fill="#6212EC"/>
<path opacity="0.3" d="M93.0119 251.508L155.127 287.37L93.0119 323.232L30.8965 287.37L93.0119 251.508Z" fill="#6212EC"/>
<path opacity="0.1" d="M279.29 149.346L279.29 221.071L217.175 185.209L217.175 113.484L279.29 149.346Z" fill="#6212EC"/>
<path opacity="0.2" d="M275.61 247.921L275.61 319.646L213.495 283.784L213.495 212.059L275.61 247.921Z" fill="#D9D9D9"/>
<path opacity="0.3" d="M341.085 108.335L278.97 144.197L278.969 72.4722L341.085 36.6099L341.085 108.335Z" fill="#DE3AF7"/>
<path opacity="0.2" d="M279.288 72.6558L217.173 108.518L217.173 36.7935L279.288 0.931152L279.288 72.6558Z" fill="#DE3AF7"/>
</svg>
</div>
      </section>
    </main>
  );
}
