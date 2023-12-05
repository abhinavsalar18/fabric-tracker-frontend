import React from 'react'
import {useNavigate} from "react-router-dom"
const Header = () => {
  const navigate = useNavigate();

  const goToHomeHandler = () => {
      navigate("/");
  }

  const goToViewFabricDetailHandler = () => {
      navigate("/viewFabric");
  }

  const goToViewFabricImagesHandler = () => {
      navigate("/viewFabricImages");
  }
  return (
    <div className="flex justify-between px-4 bg-[#F40083] h-[40px] text-center items-center text-white">
        <div className="cursor-pointer hover:text-green-300 " onClick={goToHomeHandler}>Make Home Furnishing</div>
        <div className='flex'>
        <div className="cursor-pointer hover:text-green-300 px-6" onClick={goToViewFabricDetailHandler}>Detail View</div>
        <div className="cursor-pointer hover:text-green-300" onClick={goToViewFabricImagesHandler}>Image View</div>
        </div>
        
    </div>
  )
}

export default Header