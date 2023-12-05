
import { useDispatch, useSelector } from 'react-redux';
import { setDataToUpdate, setFabricData, setSelectedFabric } from './store/fabricSlice';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { SERVER_URL } from '../utils/constants';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetAllData from '../utils/useGetAllData';
import { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';

const FabricImageCard = (props) => {
  const {data, showForm} = props;
  const [isLoading, setIsLoading] = useState(false);
  // console.log(data);
    const fabricData = useSelector((store) => store.fabric.fabricData);
  const {fabricName, fabricImage, _id} = data;
  const dispatch = useDispatch();

  const handleOnClick = () => {
      dispatch(setSelectedFabric(data));
  }

  const editHandler = async () => {
    showForm(true);
    dispatch(setDataToUpdate(data));

  }

  const deleteHandler = async () => {
    setIsLoading(true);
    console.log(isLoading);
    try{
        const response = await axios.delete(`${SERVER_URL}/api/v1/details/deleteData/${_id}`);
        console.log(response);
        dispatch(setSelectedFabric(null));
        toast.success("Data deleted!", {autoClose: 2000});
        const remData = fabricData?.filter((item) => {
            return item._id !==_id;
        });

        dispatch(setFabricData(remData));
      }
      catch(err){
        toast.error("Unable to delete data!", {autoClose: 4000});
        console.log(err);
      }
      finally{
        setIsLoading(false);
      }
  }

  return (
    <div>
        <ToastContainer />
        {
              isLoading && 
              <div className='absolute px-8 py-8'>
              <Triangle
                    height="120"
                    width="120"
                    color="rgb(85,185,185)"
                    ariaLabel="triangle-loading"
                    visible={true}
                  /> 
              </div>
            }
        <div 
            onClick={() => handleOnClick()}
            className={`shadow-lg border-white bg-white rounded m-4 mt-8 text-center px-[4px] transition-all duration-450 hover:scale-110 cursor-pointer`}
        >
            <div className={``}>
              <img 
                  src={fabricImage} 
                  alt="fabric-img"
                  className='w-36 h-36 rounded'

              />
            </div>
            
            <div className='flex justify-between mt-2'>
                <FaEdit 
                    onClick={editHandler}
                    size={20} 
                    className='ml-[2px] cursor-pointer transition-all duration-450 hover:scale-[140%]' 
                     color="rgb(0,100, 0)" 
                />
                <h1 className=''>{fabricName}</h1>
                <MdDelete 
                    className='cursor-pointer transition-all duration-450 hover:scale-[140%]'
                    onClick={deleteHandler}
                    size={22} 
                    color="rgb(150,0,0)"
                    disabled={isLoading}
                />
            </div>
        </div>
    </div>
  )
}
export default FabricImageCard;