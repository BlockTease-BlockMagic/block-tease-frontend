import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import * as React from 'react';
import BuyModal from '@/components/ui/BuyModal';
import { buyNft } from '@/lib/func';

import useWeb3auth from '@/hooks/useWeb3auth';
import { toastStyles } from '@/lib/utils';
import { allModelData, IndianModelCardData } from '@/utils/modelData';
import toast from 'react-hot-toast';
import useGlobalStore from '@/hooks/useGlobalStore';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#130D1A',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: '#130D1A',
    color: theme.palette.common.white,
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

function createData(
  tokenId: any,
  id: number,
  icon: any,
  name: string,
  floor: number,
  floor1d: number,
  volume: number,
  TopOffer: number,
  Sales: number,
  Listed: number
) {
  return {
    icon,
    name,
    floor,
    floor1d,
    volume,
    TopOffer,
    Sales,
    Listed,
    id,
    tokenId,
  };
}

const rows = IndianModelCardData.map((model) => {
  const randomNum = Math.floor(Math.random() * 10) + 1; // Generating a random number between 1 and 100
  const newListPrice = model.ListPrice - randomNum; // Adding the random number to the original listPrice
  return createData(
    model.tokenId,
    model.id,
    model.icon,
    model.name,
    model.ListPrice,
    model.value,
    model.views,
    newListPrice,
    model.Tease,
    model.posts
  );
});

export default function CustomizedTables() {
  const [data, setData] = React.useState([]);
  const { smartAccount, login } = useWeb3auth();
  const { smartAddress } = useGlobalStore();
  const [progress, setProgress] = React.useState(0);

  const [selectActiveData, setSelectActiveData] = React.useState<any>({
    id: '',
    tokenId: '',
    price: '',
    icon: '',
    name: '',
    listingPrice: '',
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const [txHash, setTxHash] = React.useState('');
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://db-graph-backend.onrender.com/api/listed-subscriptions'
        );
        const jsonData = await response.json();
        setData(
          jsonData.data.sort(
            (a: any, b: any) => parseFloat(b.price) - parseFloat(a.price)
          )
        );
        return;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleBuyNft = async (
    tokenId: string,
    listingId: string,
    price: string
  ) => {
    login(1);
    setProgress(10);
    toast.loading('Buying NFT', toastStyles);
    const resp = await buyNft(smartAccount, listingId, price);
    try {
      if (resp.hash) {
        setTxHash(resp.hash);
        const result = await fetch(
          'https://db-graph-backend.onrender.com/api/update-subscription',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tokenId: tokenId,
              wallet_address: smartAddress,
            }),
          }
        );
        setProgress(66);
        const data = await result.json();
        if (data.success) {
          setProgress(99);
          toast.dismiss();
          toast.success('NFT successfully purchased', toastStyles);
        }
      } else {
        toast.dismiss();
        toast.success('Something went wrong', toastStyles);
      }
    } catch (err) {
      toast.dismiss();
      toast.success('Something went wrong', toastStyles);
    }
  };
  return (
    <TableContainer
      component={Paper}
      className='w-[1100px]  bg-[#130D1A] text-white border-fuchsia-700 border'
      sx={{ border: 'none' }}
    >
      {' '}
      {selectActiveData.icon !== '' && (
        <BuyModal
          txHash={txHash}
          progress={progress}
          listingPrice={selectActiveData.listingPrice}
          icon={selectActiveData.icon}
          isOpen={isOpen}
          onClick={() => {
            handleBuyNft(
              selectActiveData.tokenId,
              selectActiveData.listingPrice,
              selectActiveData.price
            );
          }}
          onClose={() => {
            setIsOpen(false);
            setProgress(0);
            setTxHash('');
            setSelectActiveData({
              icon: '',
              id: '',
              listingPrice: '',
              name: '',
              price: '',
              tokenId: '',
            });
          }}
          name={selectActiveData.name}
        />
      )}
      <Table
        sx={{ minWidth: 100, border: 'none' }}
        aria-label='customized table'
      >
        <TableHead>
          <TableRow className=''>
            <StyledTableCell align='left'>#</StyledTableCell>
            <StyledTableCell align='left'>collection</StyledTableCell>
            <StyledTableCell align='right'>floor</StyledTableCell>
            <StyledTableCell align='right'>floor&nbsp;1d</StyledTableCell>
            <StyledTableCell align='right'>volume</StyledTableCell>
            <StyledTableCell align='right'>Top Offer</StyledTableCell>
            <StyledTableCell align='right'>Sales</StyledTableCell>
            <StyledTableCell align='right'>Listed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => {
            const modelData = allModelData.filter(
              (item) => item.id.toString() === row.model.modelId
            )[0];

            if (!modelData) return null;
            return (
              <StyledTableRow key={modelData.id}>
                <StyledTableCell component='th' scope='row'>
                  <Image
                    src={modelData.icon}
                    className='w-10 h-10 rounded-full'
                    alt='modelIcon'
                  />
                </StyledTableCell>
                <StyledTableCell component='th' scope='row'>
                  <div className='flex items-center  gap-2 '>
                    {modelData.name}
                    <svg
                      onClick={() => {
                        setIsOpen(true);
                        setSelectActiveData({
                          id: modelData.id.toString(),
                          tokenId: row.tokenId,
                          price: row.price,
                          icon: modelData.icon,
                          name: modelData.name,
                          listingPrice: row.price,
                        });
                      }}
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${'cursor-pointer'}' hover:text-fuchsia-600 w-5 h-5'`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                  </div>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {parseInt(row.price)}
                  <span className='text-slate-400'>USDC</span>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <span className='text-green-500 items-center flex  justify-end gap-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941'
                      />
                    </svg>
                    {/* {row.floor1d} % */}
                    "---"
                  </span>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {modelData.views}
                  <span className='text-slate-400'>K</span>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {parseInt(row.price) - 0.2} USDC
                </StyledTableCell>
                <StyledTableCell align='right'>--</StyledTableCell>
                <StyledTableCell align='right'>100%</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* <div onClick={handleBuyNft}>Buy</div> */}
    </TableContainer>
  );
}
