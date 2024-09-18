import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./Axios/Axios";

export const CitiesAxiosContext = createContext(null);

const CitiesContext = ({ children }) => {
  const [newRenderCities, setNewRenderCities] = useState(null);
  const [CitiesData, setCitiesData] = useState([]);
  const [CitiesLoader, setCitiesLoader] = useState(true);

  useEffect(() => {
    axiosUser
      .get("cities")
      .then(({data}) => {
        setCitiesData(data);
        setCitiesLoader(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [newRenderCities]);

  return (
    <CitiesAxiosContext.Provider
      value={{
        CitiesData,
        setNewRenderCities,
        CitiesLoader,
      }}
    >
      {children}
    </CitiesAxiosContext.Provider>
  );
};

export default CitiesContext;
