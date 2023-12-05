import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FabricImageCard from './FabricImageCard';
import Header from './Header';
import useGetAllData from '../utils/useGetAllData';
import { setDataToUpdate, setSelectedFabric } from './store/fabricSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import PopupForm from './PopupForm';
import ViewImageShimmer from './shimmer/ViewImageShimmer';

const ViewFabricImage = () => {

    useGetAllData();
    const selectedFabric = useSelector((store) => store.fabric.selectedFabric);
    const fabricData = useSelector((store) => store.fabric.fabricData);
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState(0);

    useEffect(() => {
    }, [popupPosition])

    const removePopupHandler = () => {
        dispatch(setSelectedFabric(null));
        toast.success("Popup removed!", {autoClose: 1000});
    }
   

    const handlePopupClose = () => {
      setShowPopup(false);
      dispatch(setDataToUpdate(null));
    }
  return !fabricData ? <div>
    <Header></Header>
    <ViewImageShimmer />
  </div> : (
    <div>
        <div>
            <Header />
        </div>
        <ToastContainer 
          autoClose={2000}
        />
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
        {
          
          selectedFabric &&
          <div className='flex flex-col items-center bg-[#F40083] w-96 mx-auto text-center mt-4 rounded shadow-lg text-white'>
            <div className='flex'>
                <h1 className='font-bold text-lg'>Selected Fabric Details</h1>
                  <MdDelete  
                      className='absolute mx-64'
                      onClick={removePopupHandler}
                      size={28} 
                      color="white"
                  />
            </div>
            <div className='flex flex-row mt-2'>
                <h1 
                    className='pr-[2px] text-gray-200'>
                    Fabric Code: <span className='font-bold text-white'>{selectedFabric.fabricCode}</span>
                </h1>
                <h1 
                    className='px-[4px] text-gray-200'>
                    Fabric Name: <span className='font-bold text-white'>{selectedFabric.fabricName}</span>
                </h1>
                <h1 
                    className='px-[4px] text-gray-200'>
                    Fabric Quantity/m: <span className='font-bold text-white'>{selectedFabric.fabricQuantity}</span>
                </h1>
            </div>
          </div>
        }
        <div className='flex  flex-wrap justify-center'>
        {
            fabricData?.map((item) => (
                    <FabricImageCard 
                        key={item._id} 
                        data={item}
                        showForm={(state) => setShowPopup(state)}
                    />
            ))
        }
        </div>
        </div>
        
    </div>
  )
}

export default ViewFabricImage