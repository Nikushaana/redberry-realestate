import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./Axios/Axios";

export const AgentsAxiosContext = createContext(null);

const AgentsContext = ({ children }) => {
  const [newRenderAgents, setNewRenderAgents] = useState(null);
  const [AgentsData, setAgentsData] = useState([]);
  const [AgentsLoader, setAgentsLoader] = useState(true);

  useEffect(() => {
    axiosUser
      .get("agents")
      .then(({data}) => {
        setAgentsData(data);
        setAgentsLoader(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [newRenderAgents]);

  return (
    <AgentsAxiosContext.Provider
      value={{
        AgentsData,
        setNewRenderAgents,
        AgentsLoader,
      }}
    >
      {children}
    </AgentsAxiosContext.Provider>
  );
};

export default AgentsContext;
