import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchAllServices } from "../redux/slices/ServicesSlice";

const useUtilityPrices = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, status } = useSelector(
    (state: RootState) => state.services.services
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // We are trying to get data from localStorage
        const cachedData = localStorage.getItem("utilityPrices");

        if (cachedData) {
          // If the data is in the cache, use it
          const parsedData = JSON.parse(cachedData);
          dispatch({
            type: "services/fetchAllServices/fulfilled",
            payload: parsedData,
          });
        } else {
          // Otherwise, we make a request to the server
          const response = await dispatch(fetchAllServices());

          // We save the received data in localStorage
          localStorage.setItem(
            "utilityPrices",
            JSON.stringify(response.payload)
          );
        }
      } catch (error) {
        console.error("Error fetching or caching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return { items, status };
};

export default useUtilityPrices;
