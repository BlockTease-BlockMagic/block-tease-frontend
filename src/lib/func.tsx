// import { MockUSDABI, PurchaseSubscriptionABI, BatchABI } from '@/constant/abi';
import { ethers } from 'ethers';

import batchAbi from '../constant/Batch.json';
import mockUsdAbi from '../constant/MockUSD.json';
import nftMarketPlaceAbi from '../constant/NftMarketPlace.json';
import precompileAbi from '../constant/Precompile.json';
import purchaseSubscriptionAbi from '../constant/PurchaseSubscription.json';
//const provider = new ethers.providers.Web3Provider(window.ethereum);

const purchaseSubscriptionAddress =
  '0xF99b791257ab50be7F235BC825E7d4B83942cf38';
const mockUsdAddress = '0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA';
const batchAddress = '0x0000000000000000000000000000000000000808';
const precompileAddress = '0x000000000000000000000000000000000000080a';
const nft = '0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA';
const nftMarketPlaceAddr = '0x3FA6cfdC28Ad346c4360AA0543b5BfdA551c7111';
type minitingNftProps = {
  modelId: number;
  fromAddr: string;
};
type batchSubscribeProps = {
  modelId: number;
  subscriptionId: number;
  priceInUsd: number;
  provider: any;
};

export async function mintingNft({ modelId, fromAddr }: minitingNftProps) {
  const customNetwork = {
    name: 'Polygon Amoy Testnet',
    chainId: 80002,
    url: 'https://rpc-amoy.polygon.technology',
  };
  const nftProvider = new ethers.providers.JsonRpcProvider(customNetwork.url);
  console.log(nftProvider);
  const thirdPartyGasSigner = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    nftProvider
  );
  console.log(thirdPartyGasSigner);
  const nftMarketPlace = new ethers.Contract(
    nftMarketPlaceAddr,
    nftMarketPlaceAbi,
    thirdPartyGasSigner
  );
  console.log(nftMarketPlace);

  const txResponse = await nftMarketPlace.purchaseSubscription(
    modelId,
    fromAddr
  );
  console.log(txResponse);
  const resp = await txResponse.wait();
  console.log(resp);
  return { trxHash: resp.transactionHash };
}
export async function checkBalances(provider: any) {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  console.log(signer);
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, provider);

  const subscriptionBalance = ethers.utils.formatUnits(
    await mockUsd.balanceOf(purchaseSubscriptionAddress),
    8
  );
  const signerBalance = ethers.utils.formatUnits(
    await mockUsd.balanceOf(signerAddress),
    8
  );

  console.log(
    `PurchaseSubscription ${purchaseSubscriptionAddress} has a balance of: ${subscriptionBalance} mUSD`
  );
  console.log(
    `Account ${signerAddress} has a balance of: ${signerBalance} mUSD`
  );
  return { subscriptionBalance, signerBalance };
}
export async function batchSubscribe({
  modelId,
  subscriptionId,
  priceInUsd,
  provider,
}: batchSubscribeProps) {
  await checkBalances(provider);

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

  const signer = provider.getSigner();

  const userSigner = signer.getAddress();
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);

  const purchaseSubscription = new ethers.Contract(
    purchaseSubscriptionAddress,
    purchaseSubscriptionAbi,
    signer
  );

  const batch = new ethers.Contract(batchAddress, batchAbi, signer);

  const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 8);

  const approvalCallData = mockUsd.interface.encodeFunctionData('approve', [
    purchaseSubscriptionAddress,
    priceInMinUnits,
  ]);

  const subscribeCallData = purchaseSubscription.interface.encodeFunctionData(
    'subscribeWithToken',
    [modelId, subscriptionId, priceInMinUnits]
  );

  const batchInterface = new ethers.utils.Interface(batchAbi);
  const data = batchInterface.encodeFunctionData('batchAll', [
    [mockUsdAddress, purchaseSubscriptionAddress],
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

  await checkBalances(provider);
  return { fromAddr: dispatch.from, dispatch: dispatch.hash };
}

// export const main = async () => {
//   //call here

//   const resp = await batchSubscribe({
//     modelId: 4,
//     subscriptionId: 3,
//     priceInUsd: 10,
//   });
//   //end here
//   // callback();

//   if (resp.dispatch) {
//     await mintingNft({
//       modelId: 1,
//       fromAddr: resp.fromAddr,
//     });
//   }
// };
