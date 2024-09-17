import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./Axios/Axios";

export const EstateAxiosContext = createContext(null);

const EstateContext = ({ children }) => {
  const [newRenderEstate, setNewRenderEstate] = useState(null);
  const [EstateData, setEstateData] = useState([]);
  const [EstateLoader, setEstateLoader] = useState(true);

  useEffect(() => {
    axiosUser
      .get("front/product")
      .then((res) => {
        setEstateData(res.data.data);
        setEstateLoader(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [newRenderEstate]);

  return (
    <EstateAxiosContext.Provider
      value={{
        newRenderEstate,
        setNewRenderEstate,
        EstateData,
        setEstateData,
        EstateLoader,
        setEstateLoader,
      }}
    >
      {children}
    </EstateAxiosContext.Provider>
  );
};

export default EstateContext;
