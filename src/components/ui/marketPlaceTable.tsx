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
import toast from 'react-hot-toast';

import useWeb3auth from '@/hooks/useWeb3auth';
import { BuyNft } from '@/lib/func';
import { toastStyles } from '@/lib/utils';

import { allModelData } from '@/utils/modelData';

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

export default function CustomizedTables({ chain }: { chain: string }) {
  console.log(chain, 'chan');

  const [provider, setProvider] = React.useState<any>(undefined);

  const { email, login } = useWeb3auth(2);

  const handleBuyNft = async (modelId: any, tokenId: any, price: any) => {
    toast.loading('Buying NFT', toastStyles);
    const _provider = await login(2);
    const resp = await BuyNft(_provider, tokenId, price);
    try {
      if (chain.toLowerCase() !== 'moonbeam') return;
      const apiResponse = await fetch(
        'https://db-graph-backend.onrender.com/api/update-subscription-moonbeam',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenId,
            email: email,
          }),
        }
      );
      const responseData = await apiResponse.json();
      if (!apiResponse.ok) {
        throw new Error(responseData.message || 'Failed to purchase NFT');
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to purchase NFT', toastStyles);
    }
    if (resp.dispatch) {
      toast.dismiss();
      toast.success('NFT successfully purchased', toastStyles);
    }
  };

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (chain.toLowerCase() !== 'moonbeam') {
          const response = await fetch(
            'https://db-graph-backend.onrender.com/api/listed-subscriptions'
          );
          const jsonData = await response.json();
          setData(
            jsonData.data.sort(
              (a, b) => parseFloat(b.price) - parseFloat(a.price)
            )
          );
          return;
        }
        // await login(2)
        const response = await fetch(
          'https://db-graph-backend.onrender.com/api/listed-subscriptions-moonbeam'
        );
        const jsonData = await response.json();
        setData(
          jsonData.data.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          )
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [chain]);

  return (
    <TableContainer
      component={Paper}
      className='w-[1100px]  bg-[#130D1A] text-white border-fuchsia-700 border'
      sx={{ border: 'none' }}
    >
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
          {data.map((row) => {
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
                      onClick={() =>
                        handleBuyNft(modelData.id, row.tokenId, row.price)
                      }
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        localStorage.getItem(modelData.id.toString()) !==
                        modelData.tokenId
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer'
                      }' hover:text-fuchsia-600 w-5 h-5'`}
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
    </TableContainer>
  );
}
