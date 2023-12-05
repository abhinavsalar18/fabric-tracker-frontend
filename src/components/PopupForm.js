import React, { useEffect, useRef, useState } from 'react'
import { SERVER_URL } from '../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import uploadImageOnCloudinary from '../utils/cloudinary';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FaWindowClose } from "react-icons/fa";
import { setFabricData } from './store/fabricSlice';

const PopupForm = ({closeForm}) => {
  // console.log("Popup form");
  const dataToUpdate = useSelector((store) => store.fabric.dataToUpdate);
  const fabricData = useSelector((store) => store.fabric.fabricData);
  // console.log("dataToUpdate: ", dataToUpdate);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  // console.log(fabricName, fabricCode, fabricQuantity, _id);
  const fabricNameRef = useRef(null);
  const fabricQuantityRef = useRef(null);
  const fabricCodeRef = useRef(null);
  const fabricImageRef = useRef(null);

  

  const imageUploadHandler = async (image) => {

    setIsLoading(true);
    try{
      const url = await uploadImageOnCloudinary(image);
      setImageUrl(url);
      toast.success("Image uploaded!", {theme: 'colored', autoClose: 1000});
    }
    catch(err){
      toast.error("Unable to upload image!", {theme: 'colored'});
      console.log("Cloudinary error:", err);
    }
    finally{
      setIsLoading(false)
    }

  }
  
  const closePopupForm = () => {
    closeForm(false);
  }
 
  const clearFileds = () => {
    fabricNameRef.current.value = ""; 
    fabricQuantityRef.current.value = "";             
    fabricCodeRef.current.value = "";
  }
  const editHandler = async () => {
    try{
      const updatedData = await axios.put(`${SERVER_URL}/api/v1/details/updateData/${dataToUpdate._id}`,
            {
                fabricName: fabricNameRef.current.value, 
                fabricQuantity: fabricQuantityRef.current.value, 
                fabricImage: imageUrl, 
                fabricCode: fabricCodeRef.current.value
            }, {new: true}
      );
      console.log("Data updated successfully!", updatedData);
      toast.success(`fabric details updated!`, {theme: 'colored', autoClose: 3000});
      
      const updatedFabricData = await fabricData.map((item) => {
        if(item._id === dataToUpdate._id){
          console.log(updatedData?.data?.data?.fabricName);
          return updatedData?.data?.data;
        }
        return item;
      });
      
      dispatch(setFabricData(updatedFabricData));
      // console.log("updatedFabricData: ", fabricData);
      console.log("response:", updatedData?.data?.data);
      closeForm();
    }
    catch(err){
      toast.error("Unbale to update data!", {theme: 'colored', autoClose: 3000});
    }
  }
  
  

  useEffect(() => {
    // if(fabricNameRef.current === null || !fabricNameRef.current.value){
      fabricNameRef.current.value = dataToUpdate.fabricName;
      fabricCodeRef.current.value = dataToUpdate.fabricCode;
      fabricQuantityRef.current.value = dataToUpdate.fabricQuantity;

    // }
  }, [fabricData]);
  return (
    <div>
        <ToastContainer />
        <h1 className='text-center text-lg font-bold'>Fill the details to update fabric data</h1>
        <div className='flex justify-end py-0 my-0 -mb-4 mr-2 cursor-pointer '>
            <FaWindowClose
              size={25}
              onClick={closePopupForm}
              color='rgb(85,185,185)'
              className='transition-all duration-450 hover:scale-[111%]'
            />
        </div>
        <div className='flex justify-center items-center py-4'>
          {/* <form className='flex- flex-col border broder-black rounded-lg p-4 w-[75%]'  onSubmit={(e) => e.preventDefault()}> */}
          <form className='border-[3px] border-[rgb(85,185,185)] mx-[8px] w-[85%] md:min-w-[450px] md:min-h-[415px] bg-[rgb(231,233,234)] md:w-4/12 p-4 text-white rounded-md shadow-lg'  onSubmit={(e) => e.preventDefault()}>
            <label className='text-[rgb(51,51,51)]'>Fabric Name</label><br></br>
            <input 
                className='p-2 mb-4 w-full rounded-md text-[rgb(51,51,51)] focus:outline-none focus:border-[rgb(85,185,185)] focus:ring-[0.10rem] focus:ring-[rgb(85,185,185)]' 
                type="text" 
                placeholder="Enter fabric name" 
                ref={fabricNameRef} 
            />
            <br></br>
            <label className='text-[rgb(51,51,51)]'>Fabric Quantity</label> <br></br>
            <input 
                className='p-2 mb-4 w-full rounded-md text-[rgb(51,51,51)] focus:outline-none focus:border-[rgb(85,185,185)] focus:ring-[0.10rem] focus:ring-[rgb(85,185,185)]' 
                type="text" 
                placeholder="Enter fabric quantity" 
                ref={fabricQuantityRef} 
            />
            <br></br>
            <label className='text-[rgb(51,51,51)]'>Fabric Code</label> <br></br>
            <input 
                className='p-2 mb-4 w-full rounded-md text-[rgb(51,51,51)] focus:outline-none focus:border-[rgb(85,185,185)] focus:ring-[0.10rem] focus:ring-[rgb(85,185,185)]' 
                type="text" 
                placeholder="Enter fabric code" 
                ref={fabricCodeRef}  
            />
            <br></br>
            <label className='text-[rgb(51,51,51)]'>Fabric Image</label><br></br>
            <input 
              className='p-2 pb- mb-4 w-full rounded-md text-[rgb(51,51,51)]  bg-white focus:outline-none focus:border-[rgb(85,185,185)] focus:ring-[0.10rem] focus:ring-[rgb(85,185,185)]'
              type="file"
              ref={fabricImageRef}
              onChange={(e) => imageUploadHandler(e.target.files[0])}
              /> <br></br>
              <p className='text-red-600 text-sm -mt-2'>* Modify the fields you want to update </p>
            <div className='flex justify-center flex-col items-center'>
              <button 
                  
                  className={`border-2 shadow-xl border-[rgb(85,185,185)] rounded px-2 p-[4px] mt-4 text-center text-[rgb(51,51,51)] cursor-pointer hover:bg-[rgb(195,195,195)] hover:border-[rgb(205,205,205)] ${isLoading ? 'opacity-70' : ''}`}
                  onClick={editHandler}
              >    Update Data
              </button>
            </div>
          </form>
          
        </div>
    </div>
  )
}

export default PopupForm