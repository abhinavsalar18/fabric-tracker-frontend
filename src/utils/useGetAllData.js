import { useDispatch } from "react-redux";
import { setFabricData, setFilteredData} from "../components/store/fabricSlice";
import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "./constants";

const useGetAllData = () => {
    const dispatch = useDispatch();
    const getAllData = async () => {
        const config = {
            headers: { "Content-type" : "application/json"}
          };
        
          try{
            const data = await axios.get(`${SERVER_URL}/api/v1/details/getAllData`, config);
              dispatch(setFabricData(data.data.data));
              dispatch(setFilteredData(data.data.data));
          }
          catch(err){
            console.log(err);
          }
    }

    useEffect(() => {
        getAllData();
    }, [])
}

export default useGetAllData;