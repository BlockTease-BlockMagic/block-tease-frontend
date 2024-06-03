// import { MockUSDABI, PurchaseSubscriptionABI, BatchABI } from '@/constant/abi';
import { PaymasterMode } from '@biconomy/account';
import { ethers } from 'ethers';

import { chainConfig } from '@/hooks/useWeb3auth';

import batchAbi from '../constant/Batch.json';
import nftAutomationAbi from '../constant/MarketplaceAutomation.json';
import {
  default as mockUsdAbi,
  default as UsdcEthSepoliaAbi,
} from '../constant/MockUSD.json';
import nftAbi from '../constant/nft.json';
import nftMarketPlaceSepoliaAbi from '../constant/NftMarketPlaceSepolia.json';
import NftsMarketPlaceMoonAbi from '../constant/nftsMarketPlaceAbi.json';
import precompileAbi from '../constant/Precompile.json';
import purchaseSubsAvaAbi from '../constant/purchaseSubsAva.json';
import purchaseSubscriptionAbi from '../constant/PurchaseSubscription.json';
//const provider = new ethers.providers.Web3Provider(window.ethereum);
import UsdcAvaAbi from '../constant/usdcAva.json';
import userOnBoardingAbi from '../constant/userOnBoarding.json';
const nftAutomationAddr = '0xD8D9E346Ad32D1f56bC5Fc959440D0A3A2118981';
const usdcSepoliaEthAddr = '0x9d24c52916A14afc31D86B5Aa046b252383ee444';
const purchaseSubscriptionAddress =
  '0xF99b791257ab50be7F235BC825E7d4B83942cf38';
const purchaseSubscriptionAddressMorph =
  '0xF99b791257ab50be7F235BC825E7d4B83942cf38';
const purchaseSubsAva = '0xf6b6A9EFAFd008b1170D703C32Fe32C0dA92fc2F';
// const usdcAvaAddr = '0x6F3c4787bAB4EeEbf62eFB8C35Dc9259FDc9D9f4';
const usdcAvaAddr = '0x5425890298aed601595a70AB815c96711a31Bc65';
const mockUsdAddress = '0xf7409b94F7285d27Ab1A456638A1110A4E55bFEC';
const userOnboardingAddress = '0x82376dA85a76360BC9FfC9a542961429A2A653ff';
const batchAddress = '0x0000000000000000000000000000000000000808';
const precompileAddress = '0x000000000000000000000000000000000000080a';
// const nftMarketPlaceAddrMoon = '0xc96b21eDA35A43eFfc57d459688e066315106f59';
const nftMarketPlaceAddrMoon = '0xA524319d310fa96AAf6E25F8af729587C2DEaE8a';
const nftMarketPlaceAddrSepolia = '0xc36B6BFa0ce8C6bdD8efcCd23CeC2E425768f64a';
const nft = '0x12B77FEb2c44dC16d57d96a1FedEd3136Ad02FBB';

type minitingNftProps = {
  modelId: number;
  fromAddr: string;
  subscriptionId: number;
  duration: number;
};
type batchSubscribeProps = {
  modelId: number;
  subscriptionId: number;
  priceInUsd: number;
  provider: ethers.providers.JsonRpcProvider;
};
type approveNSubscribeProps = {
  priceInUsd: number;
  provider: any;
};

export async function mintingNft({
  modelId,
  subscriptionId,
  duration,
  fromAddr,
}: minitingNftProps) {
  const customNetwork = {
    name: 'ETH Sepolia',
    chainId: 11155111,
    url: 'https://sepolia.infura.io/v3/e00483b0387b4f9e909acbb3f1a7172e',
  };
  const nftProvider = new ethers.providers.JsonRpcProvider(customNetwork.url);
  console.log(nftProvider);
  const thirdPartyGasSigner = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    nftProvider
  );
  console.log(thirdPartyGasSigner);
  const nftMarketPlace = new ethers.Contract(
    nftMarketPlaceAddrSepolia,
    nftMarketPlaceSepoliaAbi,
    thirdPartyGasSigner
  );
  console.log(nftMarketPlace);

  const txResponse = await nftMarketPlace.mintUnsafe(
    modelId,
    subscriptionId,
    duration,
    fromAddr
  );
  console.log(txResponse);
  const resp = await txResponse.wait();
  console.log(resp);
  return { trxHash: resp.transactionHash };
}
export async function checkBalances(signer: any) {
  const signerAddress = await signer.getAddress();
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);
  const subscriptionBalance = ethers.utils.formatUnits(
    await mockUsd.balanceOf(nftMarketPlaceAddrMoon),
    8
  );
  const signerBalance = ethers.utils.formatUnits(
    await mockUsd.balanceOf(signerAddress),
    8
  );

  console.log(
    `PurchaseSubscription ${nftMarketPlaceAddrMoon} has a balance of: ${subscriptionBalance} mUSD`
  );
  console.log(
    `Account ${signerAddress} has a balance of: ${signerBalance} mUSD`
  );
  return { subscriptionBalance, signerBalance };
}
// export async function batchSubscribe({
//   modelId,
//   subscriptionId,
//   priceInUsd,
//   provider,
// }: batchSubscribeProps) {
//   await checkBalances(provider);

//   const thirdPartyGasSigner = new ethers.Wallet(
//     process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
//     provider
//   );

//   console.log(thirdPartyGasSigner);
//   const domain = {
//     name: 'Call Permit Precompile',
//     version: '1',
//     chainId: 1287,
//     verifyingContract: precompileAddress,
//   };

//   const types = {
//     CallPermit: [
//       { name: 'from', type: 'address' },
//       { name: 'to', type: 'address' },
//       { name: 'value', type: 'uint256' },
//       { name: 'data', type: 'bytes' },
//       { name: 'gaslimit', type: 'uint64' },
//       { name: 'nonce', type: 'uint256' },
//       { name: 'deadline', type: 'uint256' },
//     ],
//   };

//   const signer = provider.getSigner();

//   const userSigner = signer.getAddress();
//   const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);

//   const purchaseSubscription = new ethers.Contract(
//     purchaseSubscriptionAddress,
//     purchaseSubscriptionAbi,
//     signer
//   );

//   const batch = new ethers.Contract(batchAddress, batchAbi, signer);

//   const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 8);

//   const approvalCallData = mockUsd.interface.encodeFunctionData('approve', [
//     purchaseSubscriptionAddress,
//     priceInMinUnits,
//   ]);
//   //rename to purchaase subs data
//   const subscribeCallData = purchaseSubscription.interface.encodeFunctionData(
//     'subscribeWithToken', //puracseSubscrition call this
//     [modelId, subscriptionId, priceInMinUnits] // send this m,s,duration
//   );

//   const batchInterface = new ethers.utils.Interface(batchAbi);
//   const data = batchInterface.encodeFunctionData('batchAll', [
//     [mockUsdAddress, purchaseSubscriptionAddress], //nftmarketplaceaddr
//     [],
//     [approvalCallData, subscribeCallData],
//     [],
//   ]);

//   const callPermit = new ethers.Contract(
//     precompileAddress, // Call Permit contract
//     precompileAbi,
//     thirdPartyGasSigner
//   );

//   const nonce = await callPermit.nonces(userSigner);

//   const gasLimit = 24000000;
//   const message = {
//     from: (await provider.getSigner().getAddress()).toString(),
//     to: batchAddress, // BatchAddress
//     value: 0,
//     data,
//     gaslimit: gasLimit,
//     nonce,
//     deadline: '1714762357000', // Randomly created deadline in the future
//   };

//   const signature = await provider
//     .getSigner()
//     ._signTypedData(domain, types, message);
//   console.log(`Signature hash: ${signature}`);

//   const formattedSignature = ethers.utils.splitSignature(signature);

//   // This gets dispatched using the dApps signer
//   const dispatch = await callPermit.dispatch(
//     message.from,
//     message.to,
//     message.value,
//     message.data,
//     message.gaslimit,
//     message.deadline,
//     formattedSignature.v.toString(),
//     formattedSignature.r,
//     formattedSignature.s
//   );

//   await dispatch.wait();
//   console.log(`Gasless Batch Precompile Transaction hash: ${dispatch.hash}`);

//   await checkBalances(provider);
//   return { fromAddr: dispatch.from, dispatch: dispatch.hash };
// }
export async function batchSubscribeFor({
  modelId,
  subscriptionId,
  priceInUsd,
  provider,
}: batchSubscribeProps) {
  const signer = provider.getSigner();
  await checkBalances(signer);
  const thirdPartyGasSigner = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    provider
  );
  const domain = {
    name: 'Call Permit Precompile',
    version: '1',
    chainId: 1287,
    verifyingContract: precompileAddress,
  };
  const types = {
    CallPermit: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'gaslimit', type: 'uint64' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };
  const userSigner = signer.getAddress();
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);
  //1 -> replace purchase subs with nft marketplace
  const nftMarketPlace = new ethers.Contract(
    nftMarketPlaceAddrMoon,
    NftsMarketPlaceMoonAbi,
    signer
  );
  const batch = new ethers.Contract(batchAddress, batchAbi, signer);
  const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 8);
  const approvalCallData = mockUsd.interface.encodeFunctionData('approve', [
    nftMarketPlaceAddrMoon,
    priceInMinUnits,
  ]);
  // const approvalCallData = mockUsd.interface.encodeFunctionData(
  //   'purchaseSubscription',
  //   [nftMarketPlaceAddrMoon, priceInMinUnits]
  // );
  const subscribeCallData = nftMarketPlace.interface.encodeFunctionData(
    'purchaseSubscription', //puracseSubscrition call this
    [modelId, subscriptionId, priceInMinUnits] // send this m,s,duration
  );
  const batchInterface = new ethers.utils.Interface(batchAbi);
  const data = batchInterface.encodeFunctionData('batchAll', [
    [mockUsdAddress, nftMarketPlaceAddrMoon], //nftmarketplaceaddr
    [],
    [approvalCallData, subscribeCallData],
    [],
  ]);
  const callPermit = new ethers.Contract(
    precompileAddress, // Call Permit contract
    precompileAbi,
    thirdPartyGasSigner
  );
  const nonce = await callPermit.nonces(userSigner);

  const gasLimit = 24000000;
  const message = {
    from: (await provider.getSigner().getAddress()).toString(),
    to: batchAddress, // BatchAddress
    value: 0,
    data,
    gaslimit: gasLimit,
    nonce,
    deadline: '1714762357000', // Randomly created deadline in the future
  };

  const signature = await provider
    .getSigner()
    ._signTypedData(domain, types, message);
  console.log(`Signature hash: ${signature}`);

  const formattedSignature = ethers.utils.splitSignature(signature);

  // This gets dispatched using the dApps signer
  const dispatch = await callPermit.dispatch(
    message.from,
    message.to,
    message.value,
    message.data,
    message.gaslimit,
    message.deadline,
    formattedSignature.v.toString(),
    formattedSignature.r,
    formattedSignature.s
  );

  await dispatch.wait();
  console.log(`Gasless Batch Precompile Transaction hash: ${dispatch.hash}`);

  await checkBalances(signer);
  return { fromAddr: dispatch.from, dispatch: dispatch.hash };
}
//apporve on morphs and subscribe
export async function approveNSubscribe({
  provider,
  priceInUsd,
}: approveNSubscribeProps) {
  const signer = provider.getSigner();
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);
  const purchaseSubscription = new ethers.Contract(
    purchaseSubscriptionAddress,
    purchaseSubscriptionAbi,
    signer
  );
  const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 8);
  const approve = await mockUsd.approve(
    purchaseSubscriptionAddressMorph.toString(),
    priceInMinUnits
  );
  await approve.wait();
  console.log(`Approval hash: ${approve.hash}`);
  const Subscribe = await purchaseSubscription.subscribeWithToken(
    4,
    3,
    priceInMinUnits
  );
  const res = await Subscribe.wait();
  console.log(res);
  return { fromAddr: res.from, hash: res.transactionHash };
}
export async function getModalPayment(id: number) {
  const nftProvider = new ethers.providers.JsonRpcProvider(
    chainConfig[1].rpcTarget
  );
  const thirdPartyProvider = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    nftProvider
  );
  const mockUsd = new ethers.Contract(
    nftAutomationAddr,
    nftAutomationAbi,
    thirdPartyProvider
  );
  const modelBalance = await mockUsd.models(id);
  const modelBalanceValue = ethers.utils.formatUnits(modelBalance.priceUSD, 8);
  return modelBalanceValue;
}
export async function checkUserBalance(provider: any) {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, provider);
  const signerBalance = ethers.utils.formatUnits(
    await mockUsd.balanceOf(signerAddress),
    8
  );
  return { signerBalance, signerAddress };
}
export async function checkUserBalanceWeb3Auth(smartAccount: any) {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-sepolia.public.blastapi.io'
  );
  const signerAddress = await smartAccount.getAddress();
  const usdc = new ethers.Contract(
    usdcSepoliaEthAddr,
    UsdcEthSepoliaAbi,
    provider
  );
  const signerBalance = ethers.utils.formatUnits(
    await usdc.balanceOf(signerAddress),
    8
  );

  return { signerBalance };
}
export async function getTestFunds(provider: any) {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const thirdPartyProvider = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    provider
  );
  console.log(thirdPartyProvider);
  const mockUsd = new ethers.Contract(
    mockUsdAddress,
    mockUsdAbi,
    thirdPartyProvider
  );
  const trx = await mockUsd.transfer(signerAddress, 100e8);
  return { trxhash: trx.hash };
}
export async function getTestFundsWeb3Auth(smartAccount: any) {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-sepolia.public.blastapi.io'
  );
  const signerAddress = await smartAccount.getAddress();
  const thirdPartyProvider = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    provider
  );
  console.log(thirdPartyProvider);
  const usdc = new ethers.Contract(
    usdcSepoliaEthAddr,
    UsdcEthSepoliaAbi,
    thirdPartyProvider
  );
  const trx = await usdc.transfer(signerAddress, 100e8);
  return { trxhash: trx.hash };
}
export async function balanceOffModel(provider: any, modelId: string) {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const nftUsd = new ethers.Contract(nft, nftAbi, provider);
  const checkBalance = await nftUsd.balanceOf(
    signerAddress,
    localStorage.getItem(modelId) || ''
  );

  const BalanceValue = parseInt(checkBalance._hex, 16);

  return BalanceValue > 0;
}
export async function batchList(
  provider: any,
  tokenId: string | null,
  priceInUsd: number
) {
  const signer = provider.getSigner();
  await checkBalances(signer);
  const thirdPartyGasSigner = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    provider
  );
  console.log(thirdPartyGasSigner);
  const domain = {
    name: 'Call Permit Precompile',
    version: '1',
    chainId: 1287,
    verifyingContract: precompileAddress,
  };
  const types = {
    CallPermit: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'gaslimit', type: 'uint64' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };
  const userSigner = await signer.getAddress();
  const listNft = new ethers.Contract(nft, nftAbi, signer);
  const nftMarketPlace = new ethers.Contract(
    nftMarketPlaceAddrMoon,
    NftsMarketPlaceMoonAbi,
    signer
  );
  const batch = new ethers.Contract(batchAddress, batchAbi, signer);
  const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 8);
  console.log(priceInMinUnits);
  const approvalCallData = listNft.interface.encodeFunctionData(
    'setApprovalForAll',
    [nftMarketPlaceAddrMoon, true]
  );
  console.log(approvalCallData);
  const listCallData = nftMarketPlace.interface.encodeFunctionData('listNFT', [
    tokenId,
    priceInMinUnits,
  ]);
  console.log(listCallData);
  const batchInterface = new ethers.utils.Interface(batchAbi);
  const data = batchInterface.encodeFunctionData('batchAll', [
    [nft, nftMarketPlaceAddrMoon], //nftmarketplaceaddr
    [],
    [approvalCallData, listCallData],
    [],
  ]);
  const callPermit = new ethers.Contract(
    precompileAddress, // Call Permit contract
    precompileAbi,
    thirdPartyGasSigner
  );
  const nonce = await callPermit.nonces(userSigner);

  const gasLimit = 24000000;
  const message = {
    from: (await provider.getSigner().getAddress()).toString(),
    to: batchAddress, // BatchAddress
    value: 0,
    data,
    gaslimit: gasLimit,
    nonce,
    deadline: '1714762357000', // Randomly created deadline in the future
  };

  const signature = await provider
    .getSigner()
    ._signTypedData(domain, types, message);
  console.log(`Signature hash: ${signature}`);

  const formattedSignature = ethers.utils.splitSignature(signature);

  // This gets dispatched using the dApps signer
  const dispatch = await callPermit.dispatch(
    message.from,
    message.to,
    message.value,
    message.data,
    message.gaslimit,
    message.deadline,
    formattedSignature.v.toString(),
    formattedSignature.r,
    formattedSignature.s
  );

  await dispatch.wait();
  console.log(dispatch);
  console.log(`Gasless Batch Precompile Transaction hash: ${dispatch.hash}`);

  await checkBalances(signer);
  return { fromAddr: dispatch.from, dispatch: dispatch.hash };
}
export async function BuyNft(provider: any, tokenId: any, price: any) {
  const signer = provider.getSigner();
  await checkBalances(signer);
  const thirdPartyGasSigner = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    provider
  );
  const domain = {
    name: 'Call Permit Precompile',
    version: '1',
    chainId: 1287,
    verifyingContract: precompileAddress,
  };
  const types = {
    CallPermit: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'gaslimit', type: 'uint64' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const userSigner = await signer.getAddress();
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);
  //1 -> replace purchase subs with nft marketplace
  const nftMarketPlace = new ethers.Contract(
    nftMarketPlaceAddrMoon,
    NftsMarketPlaceMoonAbi,
    signer
  );
  const scaledDownPrice = ethers.utils.parseUnits(price, 8);

  const batch = new ethers.Contract(batchAddress, batchAbi, signer);
  const approvalCallData = mockUsd.interface.encodeFunctionData('approve', [
    nftMarketPlaceAddrMoon,
    scaledDownPrice,
  ]);
  const buyNFT = nftMarketPlace.interface.encodeFunctionData(
    'buyNFTWithUSDC', //puracseSubscrition call this
    [tokenId] // tokenid
  );
  const batchInterface = new ethers.utils.Interface(batchAbi);
  const data = batchInterface.encodeFunctionData('batchAll', [
    [mockUsdAddress, nftMarketPlaceAddrMoon], //nftmarketplaceaddr
    [],
    [approvalCallData, buyNFT],
    [],
  ]);
  const callPermit = new ethers.Contract(
    precompileAddress, // Call Permit contract
    precompileAbi,
    thirdPartyGasSigner
  );
  const nonce = await callPermit.nonces(userSigner);

  const gasLimit = 24000000;
  const message = {
    from: (await provider.getSigner().getAddress()).toString(),
    to: batchAddress, // BatchAddress
    value: 0,
    data,
    gaslimit: gasLimit,
    nonce,
    deadline: '1714762357000', // Randomly created deadline in the future
  };

  const signature = await provider
    .getSigner()
    ._signTypedData(domain, types, message);
  console.log(`Signature hash: ${signature}`);

  const formattedSignature = ethers.utils.splitSignature(signature);

  // This gets dispatched using the dApps signer
  const dispatch = await callPermit.dispatch(
    message.from,
    message.to,
    message.value,
    message.data,
    message.gaslimit,
    message.deadline,
    formattedSignature.v.toString(),
    formattedSignature.r,
    formattedSignature.s
  );

  await dispatch.wait();
  console.log(`Gasless Batch Precompile Transaction hash: ${dispatch.hash}`);
  await checkBalances(signer);
  return { fromAddr: dispatch.from, dispatch: dispatch.hash };
}
// export async function userOnBoarding(provider: any, name: string | undefined) {
//   const ethersProvider = new ethers.providers.Web3Provider(provider);
//   const signer = ethersProvider.getSigner();
//   console.log(await signer.getAddress());
//   const userOnboarded = new ethers.Contract(
//     userOnboardingAddress,
//     userOnBoardingAbi,
//     signer
//   );
//   const tokenId = await userOnboarded.getTokenId();
//   const resp = await userOnboarded.sendRequest(8292, [name], 300000);
//   return { hash: resp.hash, tokenId: tokenId };
// }
export const userOnBoarding = async (
  name: string | undefined,
  smartAccount: any
) => {
  try {
    const contractAddress = userOnboardingAddress;
    const provider = new ethers.providers.JsonRpcProvider(
      'https://api.avax-test.network/ext/bc/C/rpc'
    );
    const contractInstance = new ethers.Contract(
      contractAddress,
      userOnBoardingAbi,
      provider
    );
    const tokenId = await contractInstance.getTokenId();
    const minTx = await contractInstance.populateTransaction.sendRequest(
      8292,
      [name],
      300000
    );
    console.log('Mint Tx Data', minTx.data);
    const tx1 = {
      to: contractAddress,
      data: minTx.data,
    };

    const userOpResponse = await smartAccount.sendTransaction(tx1, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });

    const { transactionHash } = await userOpResponse.waitForTxHash();
    console.log('Transaction Hash', transactionHash);

    if (transactionHash) {
      return { hash: transactionHash, tokenId: tokenId };
    }
  } catch (error) {
    console.log(error);
  }
};
export async function PurchaseSubsAva(provider: any) {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const signerAddress = await signer.getAddress();
    console.log('Signer Address:', signerAddress);

    // Instantiate the USDC contract with signer
    const usdcAva = new ethers.Contract(usdcAvaAddr, UsdcAvaAbi, signer);
    console.log('USDC Contract Instance:', usdcAva);
    console.log(
      `Contract Address: ${usdcAva.address}, Signer: ${signerAddress}`
    );

    // Check the balance of USDC for the signer
    const balance = await usdcAva.balanceOf(signerAddress);
    console.log('USDC Balance:', ethers.utils.formatUnits(balance, 6));

    // Perform approval for USDC spending
    const priceInUsd = 1;
    const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 6);
    console.log('Approving USDC spend...');
    const approveTx = await usdcAva.approve(purchaseSubsAva, priceInMinUnits);
    await approveTx.wait();
    console.log('Approval complete.');

    // Instantiate the purchase subscription contract with signer
    const purchaseSubscriptionAva = new ethers.Contract(
      purchaseSubsAva,
      purchaseSubsAvaAbi,
      signer
    );
    console.log(
      'Purchase Subscription Contract Instance:',
      purchaseSubscriptionAva
    );
    console.log(
      `Contract Address: ${purchaseSubscriptionAva.address}, Signer: ${signerAddress}`
    );

    const destinationSelector = ethers.BigNumber.from('16015286601757825753');
    console.log('Destination Selector For Sepolia', destinationSelector);

    console.log('Initiating cross-chain subscription purchase...');
    const Subscribe = await purchaseSubscriptionAva.sendUsdcCrossChainNFTMint(
      destinationSelector, // sepolia destination selector
      '0xf04484038947d0a4C55157898fdD10DffEB08961', // Deployed Instance on target chain
      1, // modelId,
      4, // subscriptionId,
      3600, // duration,
      priceInMinUnits
    );

    const result = await Subscribe.wait();
    console.log('Transaction Receipt:', result);
    return { txnHash: result.transactionHash };
  } catch (error) {
    console.error('Error during subscription purchase:', error);
    throw error;
  }
}

export async function PurchaseSubsAvaGasslessBundle(
  smartAccount: any,
  modelId: number,
  subscriptionId: number,
  priceInUsd: number
) {
  console.log('Starting PurchaseSubsAvaGasslessBundle');
  console.log(`SmartAccount provided: ${smartAccount}`);
  try {
    const usdcContractAddress = usdcAvaAddr;
    const purchaseSubAddress = purchaseSubsAva;
    const provider = new ethers.providers.JsonRpcProvider(
      'https://api.avax-test.network/ext/bc/C/rpc'
    );
    console.log('Provider initialized');

    const usdcContractInstance = new ethers.Contract(
      usdcContractAddress,
      UsdcAvaAbi,
      provider
    );
    console.log('USDC Contract instance created');

    const approvalUsdcAmount = priceInUsd * 3;
    const approvePriceInUsdc = ethers.utils.parseUnits(
      approvalUsdcAmount.toString(),
      6
    );
    console.log(`Approval Price in USDC: ${approvePriceInUsdc}`);

    // Step 1: Approve the purchaseSub contract to spend USDC
    const approvalTx = await usdcContractInstance.populateTransaction.approve(
      purchaseSubAddress,
      approvePriceInUsdc
    );
    console.log('Approval transaction created');

    const approvalTransaction = {
      to: usdcContractAddress,
      data: approvalTx.data,
    };
    console.log(`Approval Transaction Data: ${approvalTransaction.data}`);

    // Step 2: Create and call sendUsdcCrossChainNFTMint on the purchaseSub contract
    const purchaseSubInstance = new ethers.Contract(
      purchaseSubAddress,
      purchaseSubsAvaAbi,
      provider
    );
    console.log('Purchase Subscription Contract instance created');

    // We are going to select the ethereum chain
    const transferPrice = ethers.utils.parseUnits(priceInUsd.toString(), 6);
    const destinationSelector = ethers.BigNumber.from('16015286601757825753');
    console.log(`Destination Selector: ${destinationSelector}`);

    const mintTx =
      await purchaseSubInstance.populateTransaction.sendUsdcCrossChainNFTMint(
        destinationSelector,
        nftAutomationAddr,
        modelId,
        subscriptionId,
        3600,
        transferPrice
      );
    console.log('Mint transaction created');

    const subTransaction = {
      to: purchaseSubAddress,
      data: mintTx.data,
    };
    console.log(`Subscription Transaction Data: ${subTransaction.data}`);

    const txs = [approvalTransaction, subTransaction];
    console.log('Transactions bundled', txs);

    console.log('Sending bundle transaction through SmartAccount...');
    const bundleTransaction = await smartAccount?.sendTransaction(txs, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    console.log('Bundle transaction sent');

    const { transactionHash } = await bundleTransaction.waitForTxHash();
    console.log('Final Transaction Hash', transactionHash);

    if (transactionHash) {
      return { hash: transactionHash };
    }
  } catch (error) {
    console.error('Error in PurchaseSubsAvaGasslessBundle', error);
  }
}
export async function chainLinkAutomationSubscription(
  smartAccount: any,
  modelId: number,
  subscriptionId: number,
  priceInUsd: number
) {
  console.log('Starting PurchaseSubsAvaGasslessBundle');
  console.log(`SmartAccount provided: ${smartAccount}`);
  try {
    const usdcContractAddress = usdcSepoliaEthAddr;
    const purchaseSubAddress = nftAutomationAddr;

    const provider = new ethers.providers.JsonRpcProvider(
      'https://eth-sepolia.public.blastapi.io'
    );

    console.log('Provider initialized');

    const usdcContractInstance = new ethers.Contract(
      usdcContractAddress,
      UsdcEthSepoliaAbi,
      provider
    );
    console.log('USDC Contract instance created');

    const approvalAmount = priceInUsd * 3; // 3 times the duration
    const approvalUsdc = ethers.utils.parseUnits(approvalAmount.toString(), 8);
    console.log(`Price in USDC: ${approvalUsdc}`);

    // Step 1: Approve the nft automation contract to spend USDC
    const approvalTx = await usdcContractInstance.populateTransaction.approve(
      purchaseSubAddress,
      approvalUsdc
    );
    console.log('Approval transaction created');

    const approvalTransaction = {
      to: usdcContractAddress,
      data: approvalTx.data,
    };
    console.log(`Approval Transaction Data: ${approvalTransaction.data}`);

    // Step 2: Create and call purchaseSubscription on the nftautomation contract
    const purchaseSubInstance = new ethers.Contract(
      purchaseSubAddress,
      nftAutomationAbi,
      provider
    );
    console.log('Purchase Subscription Contract instance created');

    const mintTx =
      await purchaseSubInstance.populateTransaction.purchaseSubscription(
        modelId,
        subscriptionId
      );
    console.log('Mint transaction created');

    const subTransaction = {
      to: purchaseSubAddress,
      data: mintTx.data,
    };
    console.log(`Subscription Transaction Data: ${subTransaction.data}`);

    const txs = [approvalTransaction, subTransaction];
    console.log('Transactions bundled', txs);

    console.log('Sending bundle transaction through SmartAccount...');
    const bundleTransaction = await smartAccount?.sendTransaction(txs, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    console.log('Bundle transaction sent');

    const { transactionHash } = await bundleTransaction.waitForTxHash();
    console.log('Final Transaction Hash', transactionHash);

    if (transactionHash) {
      return { hash: transactionHash };
    }
  } catch (error) {
    console.error('Error in PurchaseSubscription in nftAutomation', error);
  }
}
