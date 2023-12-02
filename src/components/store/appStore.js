import {configureStore} from "@reduxjs/toolkit"
import fabricReducer from "./fabricSlice"

const appStore = configureStore(
    {
        reducer: {
            fabric: fabricReducer
        },
    },
)

export default appStore;