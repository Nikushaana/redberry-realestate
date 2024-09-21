import { createContext, useContext, useEffect, useState } from "react";
import { axiosUser } from "./Axios/Axios";
import { ShareStatesCont } from "./sharedStates";

export const CitiesAxiosContext = createContext(null);

const CitiesContext = ({ children }) => {
  const { setAddListingLoader } = useContext(ShareStatesCont);
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
      .finally(() => {
        setAddListingLoader(false)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
