import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./Axios/Axios";

export const RealEstateAxiosContext = createContext(null);

const RealEstateContext = ({ children }) => {
  const [newRenderRealEstate, setNewRenderRealEstate] = useState(null);
  const [RealEstateData, setRealEstateData] = useState([]);
  const [RealEstateLoader, setRealEstateLoader] = useState(true);

  useEffect(() => {
    setRealEstateLoader(true)
    axiosUser
      .get("real-estates")
      .then(({data}) => {
        setRealEstateData(data);
        setRealEstateLoader(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [newRenderRealEstate]);

  return (
    <RealEstateAxiosContext.Provider
      value={{
        RealEstateData,
        setNewRenderRealEstate,
        RealEstateLoader,
      }}
    >
      {children}
    </RealEstateAxiosContext.Provider>
  );
};

export default RealEstateContext;
