'use client';

import { createBundler, createSmartAccountClient } from '@biconomy/account';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { ethers } from 'ethers';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import useGlobalStore from '@/hooks/useGlobalStore';
const clientId =
  'BEsx8crmOvhVhtiEPU4JbHWOnUGQ_g4TZsWmqUiMWmONwrdqCwuoowH6HJQUUJ-iXPhz8tb8BvVoHWEtF0H_wzQ';

export const chainConfig = [
  {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0xA869', // hex of 43114
    rpcTarget: 'https://rpc.ankr.com/avalanche_fuji',
    displayName: 'Avalanche FUJI C-Chain',
    blockExplorerUrl: 'https://testnet.snowtrace.io',
    ticker: 'AVAX',
    tickerName: 'AVAX',
    logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
  },
  {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0xaa36a7', // hex of 43114
    rpcTarget: 'https://eth-sepolia.public.blastapi.io',
    displayName: 'Ethereum Sepolia',
    blockExplorerUrl: 'https://sepolia.etherscan.io/',
    ticker: 'ETH',
    tickerName: 'Ethereum',
  },
  {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x13882', // hex of 43114
    rpcTarget: 'https://rpc-amoy.polygon.technology',
    displayName: 'Polygon Amoy',
    blockExplorerUrl: 'https://www.oklink.com/amoy',
    ticker: 'MATIC',
    tickerName: 'Polygon Matic',
  },
  {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    chainId: "0x98A", // Polygon zkEVM Testnet Chain ID
    rpcTarget: 'https://rpc.cardona.zkevm-rpc.com',
    displayName: "Polygon Cardona ", // Display name for the network
    blockExplorer: "https://cardona-zkevm.polygonscan.com/", // Block Explorer URL
    ticker: "ETH", // Currency symbol
    tickerName: "Ethereum" // Currency name
  },
];

const config = [
  {
    biconomyPaymasterApiKey: '_I_WZQyTV.e01cdb09-cb52-4ec1-931f-69958a2db172',
    bundlerUrl: `https://bundler.biconomy.io/api/v2/43113/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    chainId: 43113,
  },
  {
    biconomyPaymasterApiKey: 'uPfcURYvC.cbd1a374-9004-4290-93a5-84261ac4609a',
    bundlerUrl: `https://bundler.biconomy.io/api/v2/11155111/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    chainId: 11155111,
  },
  {
    biconomyPaymasterApiKey: '8jJqj9r_q.5c04862e-d262-4f69-bb88-ddc7c4d991f0',
    bundlerUrl: `https://bundler.biconomy.io/api/v2/80002/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    chainId: 80002,
  },
  {
    biconomyPaymasterApiKey: '9Dfqt1w2i.ebe270ce-61dc-43a9-a9b5-048f2e18ae6d',
    bundlerUrl: `https://bundler.biconomy.io/api/v2/2442/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    chainId: 2442,
  },
];

const privateKeyProvider: any = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig[0] },
});
const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
  uiConfig: {
    appName: 'BlockTease',
    mode: 'dark',
    defaultLanguage: 'en',
  },
});
const metamaskAdapter = new MetamaskAdapter({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
});
const openloginAdapter = new OpenloginAdapter();
web3auth.configureAdapter(openloginAdapter);
web3auth.configureAdapter(metamaskAdapter);

function useWeb3auth() {
  const { setSmartAccount, smartAccount, setSmartAddress } = useGlobalStore();
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
    null
  );
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [address, setAddress] = useState<string | null>('');
  const [name, setName] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const pathname = usePathname();
  const init = async () => {
    try {
      // IMP START - SDK Initialization
      await web3auth.initModal();
      // IMP END - SDK Initialization
      if (smartAccount) {
        const saAddress = await smartAccount.getAccountAddress();
        setSmartAccountAddress(saAddress);
        setLoggedIn(true);
      }

      setProvider(web3auth.provider);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    init();
  }, [pathname]);

  useEffect(() => {
    if (loggedIn) {
      getUserInfo();
      getAccounts();
    }
  }, [loggedIn]);
  const login = async (chainIndex: number) => {
    const web3authProvider = await web3auth.connect();
    //from here
    const ethersProvider = new ethers.providers.Web3Provider(
      web3authProvider as any
    );
    const web3AuthSigner = ethersProvider.getSigner();
    const bundler = await createBundler({
      bundlerUrl: config[chainIndex].bundlerUrl,
      userOpReceiptIntervals: {
        [config[chainIndex].chainId]: 30000
      },
      userOpWaitForTxHashIntervals: {
        [config[chainIndex].chainId]: 30000
      },
      userOpReceiptMaxDurationIntervals: {
        [config[chainIndex].chainId]: 30000
      },
      userOpWaitForTxHashMaxDurationIntervals: {
        [config[chainIndex].chainId]: 30000
      }
    })
    const smartWallet = await createSmartAccountClient({
      signer: web3AuthSigner,
      biconomyPaymasterApiKey: config[chainIndex].biconomyPaymasterApiKey,
      bundler: bundler,
      rpcUrl: chainConfig[chainIndex].rpcTarget,
      chainId: config[chainIndex].chainId,
    });
    console.log('Biconomy Smart Account', smartWallet);
    setSmartAccount(smartWallet);
    const saAddress = await smartWallet.getAccountAddress();
    console.log('Smart Account Address', saAddress);
    setSmartAddress(saAddress);
    setSmartAccountAddress(saAddress);
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };
  const getUserInfo = async () => {
    // IMP START - Get User Information
    const user = await web3auth.getUserInfo();
    // IMP END - Get User Information

    setName(user.name);
    setEmail(user.email);
  };
  const getAccounts = async () => {
    if (!provider) {
      return;
    }
    // const web3 = new Web3(provider as any);

    // // Get user's Ethereum public address
    // const address = await web3.eth.getAccounts();
    // setAddress(address[0]);
    const saAddress = await smartAccount?.getAccountAddress();
    setAddress(saAddress || null);
    setSmartAddress(saAddress || null);
  };
  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
    setProvider(null);
    setLoggedIn(false);
    setAddress('');
  };

  return {
    login,
    logout,
    loggedIn,
    name,
    smartAccountAddress,
    provider,
    address,
    email,
    smartAccount,
  };
}
export default useWeb3auth;
