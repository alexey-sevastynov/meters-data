import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAllMetersData } from "@/store/slices/meters-data-slice";
import { MeterData } from "@/store/models/meter-data";

const useMetersData = () => {
    const dispatch: AppDispatch = useDispatch();
    const metersData = useSelector((state: RootState) => state.metersData.metersData);
    const [isDataFromLocalStorage, setIsDataFromLocalStorage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cachedData = localStorage.getItem("metersData");

                if (cachedData) {
                    const parsedData = JSON.parse(cachedData) as MeterData[];

                    dispatch({
                        type: "metersData/fetchAllMetersData/fulfilled",
                        payload: parsedData,
                    });
                    setIsDataFromLocalStorage(true);
                } else {
                    // Otherwise, we make a request to the server
                    const response = await dispatch(fetchAllMetersData());

                    // We save the received data in localStorage
                    localStorage.setItem("metersData", JSON.stringify(response.payload));
                }
            } catch (error) {
                console.error("Error fetching data from Local Storage:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const updateLocalStorage = async () => {
            try {
                localStorage.setItem("metersData", JSON.stringify(metersData.items));
            } catch (error) {
                console.error("Error updating Local Storage:", error);
            }
        };

        if (isDataFromLocalStorage) {
            updateLocalStorage();
        }
    }, [metersData.items, isDataFromLocalStorage]);

    return { isDataFromLocalStorage };
};

export default useMetersData;
