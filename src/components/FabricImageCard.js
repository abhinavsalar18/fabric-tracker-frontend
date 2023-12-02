import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSelectedFabric } from './store/fabricSlice';

const FabricImageCard = ({title, imageUrl, fabricQuantity, fabricCode}) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
      const data = {fabricName: title, fabricImage: imageUrl, fabricQuantity: fabricQuantity, fabricCode: fabricCode};
      dispatch(setSelectedFabric(data));
  }
  return (
    <div>
        <div 
            onClick={() => handleOnClick()}
            className='shadow-lg border-white bg-white rounded m-4 mt-8 text-center px-[4px] transition-all duration-450 hover:scale-110 cursor-pointer'
        >
            <img 
                src={imageUrl} 
                alt="fabric-img"
                className='w-36 h-36 rounded'

            />
            <h1 className='text-gray-500'>{title}</h1>
        </div>
    </div>
  )
}
export default FabricImageCard;