import { createSlice } from "@reduxjs/toolkit";

const fabricSlice = createSlice({
        name: "fabric",
        initialState: {
            fabricData: null,
            filteredData: null,
            isUpdated: false,
            selectedFabric: null
        },
        reducers: {
            setFabricData: (state, action) => {
                state.fabricData = action.payload;
            },
            setFilteredData: (state, action) => {
                state.filteredData = action.payload;
            },
            setIsUpdated: (state, action) => {
                state.isUpdated = action.payload;
            },
            setSelectedFabric: (state, action) => {
                state.selectedFabric = action.payload;
            }
        }
    });

export const {setFabricData, setFilteredData, setIsUpdated, setSelectedFabric} = fabricSlice.actions;
export default fabricSlice.reducer;