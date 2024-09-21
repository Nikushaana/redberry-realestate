import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./Axios/Axios";

export const RegionsAxiosContext = createContext(null);

const RegionsContext = ({ children }) => {
  const [newRenderRegions, setNewRenderRegions] = useState(null);
  const [RegionsData, setRegionsData] = useState([]);
  const [RegionsLoader, setRegionsLoader] = useState(true);

  useEffect(() => {
    axiosUser
      .get("regions")
      .then(({data}) => {
        setRegionsData(data);
        setRegionsLoader(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [newRenderRegions]);

  return (
    <RegionsAxiosContext.Provider
      value={{
        RegionsData,
        setNewRenderRegions,
        RegionsLoader,
      }}
    >
      {children}
    </RegionsAxiosContext.Provider>
  );
};

export default RegionsContext;
