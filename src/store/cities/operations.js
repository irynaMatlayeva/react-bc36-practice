import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { fetchCities } from "../../API/citiesAPI/citiesAPI";

export const fetchCitiesOperation = createAsyncThunk('cities/fetchAll', async (
    _, thunkAPI
) => {
    try {
        const { data } = await fetchCities()
        return(data);
    }
    catch (error) { 
        return thunkAPI.rejectWithValue(error.message)
    }
})