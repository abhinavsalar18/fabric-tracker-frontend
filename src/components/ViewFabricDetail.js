import React, { useEffect, useRef, useState } from 'react'
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useGetAllData from '../utils/useGetAllData';
import { setDataToUpdate, setFabricData, setFilteredData, setSelectedFabric } from './store/fabricSlice';
import axios from 'axios';
import { SERVER_URL } from '../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import PopupForm from './PopupForm';
import TableShimmer from './shimmer/ShimmerTable';
import ShimmerTable from './shimmer/ShimmerTable';
const ViewFabricDetail = () => {
  useGetAllData();

  const [searchValue, setSearchValue] = useState("");
  const [quantityFilter, setQuantityFilter] = useState(false);
  const [lowValue, setLowValue] = useState();
  const [highValue, setHighValue] = useState();
  
  // for handling the pop form
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState(0);

  const dispatch = useDispatch();
  const {fabricData} = useSelector((store) => store.fabric);
  const {filteredData} = useSelector((store) => store.fabric);

  useEffect(() => {
    // console.log(popupPosition);
  }, [popupPosition])
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

  const editHandler = (event, dataToUpdate) => {
    const { clientY } = event;
    const topOfViewport = window.scrollY;
    console.log(clientY, topOfViewport);
    // Set the position of the popup relative to the clicked entry
    setPopupPosition(topOfViewport);
  
    // Show the popup
    setShowPopup(true);
    // console.log("Popup Position: ", popupPosition, clientY); // This may not reflect the updated state immediately
  
    dispatch(setDataToUpdate(dataToUpdate));
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    dispatch(setDataToUpdate(null));
  }
  const deleteHandler = async (fabricId, fabricName) => {
    try{
        const response = await axios.delete(`${SERVER_URL}/api/v1/details/deleteData/${fabricId}`);
        console.log(response);
        toast.success(`${fabricName} details deleted!`, {autoClose: 2000});
        const remData = fabricData?.filter((item) => {
            if(item._id === fabricId)
            // console.log(item.fabricName);
            return item._id !== fabricId;
        });

        dispatch(setFabricData(remData));
      }
      catch(err){
        toast.error("Unable to delete data!", {autoClose: 4000});
        console.log(err);
      }
  }

// console.log("pop: ", popupPosition);
  return (
    <div>
        <div>
          <Header />
        </div>
        <ToastContainer />
        {
          showPopup &&
          <div className={`absolute z-10 top-[${popupPosition + 120}px] md:left-[20%] left-[15%] lg:left-[35%] flex justify-center self-center items-center`}>
            <PopupForm 
                closeForm={(state) => {
                  // console.log(state);
                  setShowPopup(state)
                }}
            />
          </div>
        }
        <div className={`${showPopup ? 'blur-md pointer-events-none' : ''}`}>
        <div className={`flex flex-col justify-center items-center`}>
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
                <th className='px-4 border py-2'>Fabric Code</th>
                <th className='px-4 border'>Fabric Name</th>
                <th className='px-4 border'>Fabric Quantity/m</th>
                <th className='px-4 border'>Modify Details</th>
              </tr>
            </thead>
            {
              !filteredData ? 
              <ShimmerTable />
              :
              filteredData?.map((item) => (
                      <tr  key={item.fabricName}  className='text-center items-center border'>
                        <td className='border py-2'>{item.fabricCode}</td>
                        <td className='border'>{item.fabricName}</td>
                        <td className='border'>{item.fabricQuantity}</td>
                        <td className='border'>
                          <div className='flex justify-center mx-2'>
                              <FaEdit 
                                  onClick={(event) => editHandler(event, item)}
                                  size={25} 
                                  className='mr-8 cursor-pointer transition-all duration-450 hover:scale-[120%]'  
                                  color="rgb(0,100, 0)" 
                              />
                              <MdDelete 
                                  onClick={() => deleteHandler(item._id, item.fabricName)}
                                  size={28} 
                                  color="rgb(150,0,0)"
                                  className='cursor-pointer transition-all duration-450 hover:scale-[120%]'
                              />
                          </div>
                        </td>
                    </tr>
                ))
            }
            {/* <tbody className='border'>
              { 
                  
              }
            </tbody> */}
          </table>
          </div>
        </div>
        </div>
        
    </div>
  )
}

export default ViewFabricDetail;