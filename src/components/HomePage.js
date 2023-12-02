
import React, { useRef, useState } from 'react'
import Header from './Header'
import axios from "axios"
import uploadImageOnCloudinary from '../utils/cloudinary';
import { SERVER_URL } from '../utils/constants';


const HomePage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fabricName = useRef(null);
  const fabricQuantity = useRef(null);
  const fabricCode = useRef(null);
  const fabricImage = useRef(null);

  const imageUploadHandler = async (image) => {

    setIsLoading(true);
    try{
      const url = await uploadImageOnCloudinary(image);
      setImageUrl(url);
    }
    catch(err){
      console.log("Cloudinary error:", err);
    }
    finally{
      setIsLoading(false)
    }

  }
  
  const clearFields = () => {
    setMessage(null);
    fabricName.current.value = "";
    fabricQuantity.current.value = "";
    fabricCode.current.value = "";
    fabricImage.current.value = "";
  }

  const addDataHandler = async (event) => {
    try{
      
        if(!imageUrl) return;
        console.log(SERVER_URL);
        console.log("imageUrl: ", imageUrl, fabricQuantity.current.value, fabricCode.current.value);
        const response  = await axios.post(`${SERVER_URL}/api/v1/details/addData`, 
            {
              fabricName: fabricName.current.value, 
              fabricQuantity: fabricQuantity.current.value, 
              fabricImage: imageUrl, 
              fabricCode: fabricCode.current.value
            }
        );
        if(response){
          clearFields();
        } 
        console.log("Post response: ", response);
        setMessage("Fabric details added successfully!");
        
    }
    catch (err){
      console.log(err);
    }
      
      
  }

  return (
    <div>
        <div>
            <Header></Header>
        </div>
        <h1 className='text-center mt-4 text-lg'>Fill the details to add fabric data</h1>
        <div className='flex justify-center items-center py-4'>
          {/* <form className='flex- flex-col border broder-black rounded-lg p-4 w-[75%]'  onSubmit={(e) => e.preventDefault()}> */}
          <form className='mx-[8px] w-[85%] md:min-w-[450px] md:min-h-[450px] bg-[rgb(231,233,234)] md:w-4/12 p-4 text-white rounded-md shadow-lg'  onSubmit={(e) => e.preventDefault()}>
            <label className='text-[rgb(51,51,51)]'>Fabric Name</label><br></br>
            <input 
                className='p-2 mb-4 w-full rounded-md text-[rgb(51,51,51)]' 
                type="text" 
                placeholder="Enter fabric name" 
                ref={fabricName} 
            />
            <br></br>
            <label className='text-[rgb(51,51,51)]'>Fabric Quantity</label> <br></br>
            <input 
                className='p-2 mb-4 w-full rounded-md text-[rgb(51,51,51)]' 
                type="text" 
                placeholder="Enter fabric quantity" 
                ref={fabricQuantity} 
            />
            <br></br>
            <label className='text-[rgb(51,51,51)]'>Fabric Code</label> <br></br>
            <input 
                className='p-2 mb-4 w-full rounded-md text-[rgb(51,51,51)]' 
                type="text" 
                placeholder="Enter fabric code" 
                ref={fabricCode}  
            />
            <br></br>
            <label className='text-[rgb(51,51,51)]'>Fabric Image</label><br></br>
            <input 
              className='p-2 mb-4 w-full rounded-md focus:bg-[rgb(51,51,51)]  bg-white text-[rgb(51,51,51)]'
              type="file"
              ref={fabricImage}
              onChange={(e) => imageUploadHandler(e.target.files[0])}
              /> <br></br>
            <div className='flex justify-center flex-col items-center'>
            {
                message &&
                <div className='font-bold text-green-500 text-xl py-4'>{message}</div>
            }
              <button 
                  
                  className={`border shadow-xl border-[rgb(185,185,185)] rounded px-2 p-[4px] mt-4 text-center text-[rgb(51,51,51)] cursor-pointer hover:bg-[rgb(195,195,195)] hover:border-[rgb(205,205,205)] ${isLoading ? 'opacity-70' : ''}`}
                  onClick={addDataHandler}
              >    Add Data
              </button>
            </div>
          </form>
          
        </div>
    </div>
  )
}

export default HomePage