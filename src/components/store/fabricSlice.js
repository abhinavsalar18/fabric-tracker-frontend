import { createSlice } from "@reduxjs/toolkit";

const fabricSlice = createSlice({
        name: "fabric",
        initialState: {
            fabricData: null,
            filteredData: null,
            isUpdated: false,
            selectedFabric: null,
            dataToUpdate: null,
        },
        reducers: {
            setFabricData: (state, action) => {
                state.fabricData = action.payload;
                state.filteredData = action.payload;
            },
            setFilteredData: (state, action) => {
                state.filteredData = action.payload;
            },
            setIsUpdated: (state, action) => {
                state.isUpdated = action.payload;
            },
            setSelectedFabric: (state, action) => {
                state.selectedFabric = action.payload;
            },
            setDataToUpdate: (state, action) => {
                state.dataToUpdate = action.payload;
            }
        }
    });

export const {setFabricData, setFilteredData, setIsUpdated, setSelectedFabric, setDataToUpdate} = fabricSlice.actions;
export default fabricSlice.reducer;