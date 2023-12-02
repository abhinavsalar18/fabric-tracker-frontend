import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FabricImageCard from './FabricImageCard';
import Header from './Header';
import useGetAllData from '../utils/useGetAllData';
import { setSelectedFabric } from './store/fabricSlice';

const ViewFabricImage = () => {

    useGetAllData();
    const selectedFabric = useSelector((store) => store.fabric.selectedFabric);
    const fabricData = useSelector((store) => store.fabric.fabricData);
    const dispatch = useDispatch();
  return (
    <div>
        <div>
            <Header />
        </div>
        {
          
          selectedFabric &&
          <div className='flex flex-col items-center bg-[#F40083] w-96 mx-auto text-center mt-4 rounded shadow-lg text-white'>
            <div className='flex'>
                <h1 className='font-bold text-lg'>Selected Fabric Details</h1>
                <svg
                  onClick={() => dispatch(setSelectedFabric(null))}

                  className='absolute ml-64 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="30" height="30" style={{fill: "#FFFFFF"}}>
                  <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                </svg>
            </div>
            <div className='flex flex-row mt-2'>
                <h1 
                    className='px-[4px] text-gray-200'>
                    Fabric Name: <span className='font-bold text-white'>{selectedFabric.fabricName}</span>
                </h1>
                <h1 
                    className='px-[4px] text-gray-200'>
                    Fabric Code: <span className='font-bold text-white'>{selectedFabric.fabricCode}</span>
                </h1>
                <h1 
                    className='px-[4px] text-gray-200'>
                    Fabric Quantity: <span className='font-bold text-white'>{selectedFabric.fabricQuantity}</span>
                </h1>
            </div>
          </div>
        }
        <div className='flex  flex-wrap justify-center'>
        {
            fabricData?.map((item) => (
                    <FabricImageCard key={item.fabricName} title={item.fabricName} imageUrl={item.fabricImage} fabricQuantity={item.fabricQuantity} fabricCode={item.fabricCode}/>
            ))
        }
        </div>
        
    </div>
  )
}

export default ViewFabricImage