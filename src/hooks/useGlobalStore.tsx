import { BiconomySmartAccountV2 } from '@biconomy/account';
import { create } from 'zustand';

interface GlobalStore {
  walletAddress: string | null,
  smartAccount: BiconomySmartAccountV2 | null
  setSmartAccount: (smartAccount: BiconomySmartAccountV2) => void
  setWalletAddress: (address: string) => void
}

const useGlobalStore = create<GlobalStore>()(
  (set) => ({
    walletAddress: null,
    setWalletAddress: (newAddress) => set({
      walletAddress: newAddress
    }),
    smartAccount: null,
    setSmartAccount: (smartAccount) => set({ smartAccount: smartAccount }),
  }),
)

export default useGlobalStore;
