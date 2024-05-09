import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const toastStyles = {
  style: {
    boxShadow: '0px 4px 4px 0px #00000040',
    background: '#000000',
    color: '#cdb9e8',
  },
  iconTheme: {
    primary: '#bf25e9',
    secondary: '#FFFAEE',
  },
};
