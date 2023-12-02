import React, { useRef, useState } from 'react'
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';

import useGetAllData from '../utils/useGetAllData';
import { setFilteredData } from './store/fabricSlice';
const ViewFabricDetail = () => {
  useGetAllData();

  const [searchValue, setSearchValue] = useState("");
  const [quantityFilter, setQuantityFilter] = useState(false);
  const [lowValue, setLowValue] = useState();
  const [highValue, setHighValue] = useState();
  const dispatch = useDispatch();
  const {fabricData} = useSelector((store) => store.fabric);
  const {filteredData} = useSelector((store) => store.fabric);
  const handleSearch = (searchValue) => {
      const filteredData = fabricData?.filter((item) => {
          return item.fabricName.includes(searchValue) || item.fabricCode.includes(searchValue);
      });
      
      setSearchValue("");
      dispatch(setFilteredData(filteredData));
     
  }

  const handleFilter = () => {
      const filteredData = fabricData?.filter((item) => {
        return item.fabricQuantity >= lowValue && item.fabricQuantity <= highValue;
      });
      
      setLowValue("");
      setHighValue("");
      dispatch(setFilteredData(filteredData));
  }
  return (
    <div>
        <div>
          <Header />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center pt-4 my-4'>
            <input 
                type="text" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='Enter fabric name or code'
                className='w-52 px-2 border border-black rounded mx-8'
            />
            <button  
                onClick={() => handleSearch(searchValue)}
                className='bg-gray-300 rounded px-2 border border-gray-400'
            >    Search
            </button>
          </div>
          <div>
            {
              quantityFilter ?
              <>
                <input 
                  type="text" 
                  value={lowValue}
                  onChange={(e) => setLowValue(e.target.value)}
                  placeholder='Low value'
                  className='w-24 border border-black rounded px-2 mx-2 ml-6'
              />
                <input 
                  type="text" 
                  value={highValue}
                  onChange={(e) => setHighValue(e.target.value)}
                  placeholder='High value'
                  className='w-24 border border-black rounded px-2 mx-2'
              />
              <button  
                  onClick={() => handleFilter()}
                  className='bg-gray-300 rounded px-2 border border-gray-400 ml-6'
              >    Filter
              </button>
            </>
              :
              <button  
                  onClick={() => setQuantityFilter(true)}
                  className='bg-gray-300 rounded px-2 border border-gray-400'
              >  Quantity filter
              </button>
            }
          
          
          </div>
        </div>
        <div className='flex flex-col justify-center items-center py-8'>
          <h1 className='font-bold py-2 text-xl'>Fabric Details</h1>
          <div className='border border-black rounded'>
          <table className=''>
            <thead className='border'>
              <tr>
                <th className='px-4 border py-2'>Fabric Name</th>
                <th className='px-4'>Fabric Quantity</th>
                <th className='px-4'>Fabric Code</th>
              </tr>
            </thead>
            <tbody className='border'>
              { 
                  filteredData?.map((item) => (
                      <tr  key={item.fabricName}  className='text-center items-center border'>
                        <td className='border p-2'>{item.fabricName}</td>
                        <td className='border'>{item.fabricQuantity}</td>
                        <td className='border'>{item.fabricCode}</td>
                    </tr>
                ))
              }
            </tbody>
          </table>
          </div>
        </div>
    </div>
  )
}

export default ViewFabricDetail;