import React, { createContext, useState } from "react";

export const ShareStatesCont = createContext(null);

export function ShareStatesChild({ children }) {
  const [delListPopUp, setDelListPopUp] = useState("");
  
  const [addAgentPopUp, setAddAgentPopUp] = useState(false);
  const handleAddAgentPopUp = () => {
    if (addAgentPopUp) {
      setAddAgentPopUp(false);
    } else {
      setAddAgentPopUp(true);
    }
  };
  const priceData = [
    {
      id: 1,
      name: "50000",
    },
    {
      id: 2,
      name: "100000",
    },
    {
      id: 3,
      name: "150000",
    },
    {
      id: 4,
      name: "200000",
    },
    {
      id: 5,
      name: "300000",
    },
  ];
  const m2Data = [
    {
      id: 1,
      name: "50",
    },
    {
      id: 2,
      name: "100",
    },
    {
      id: 3,
      name: "150",
    },
    {
      id: 4,
      name: "200",
    },
    {
      id: 5,
      name: "300",
    },
  ];

  const ShareStatesValue = {
    delListPopUp,
    setDelListPopUp,
    addAgentPopUp,
    setAddAgentPopUp,
    handleAddAgentPopUp,

    priceData,
    m2Data,
  };

  return (
    <ShareStatesCont.Provider value={ShareStatesValue}>
      {children}
    </ShareStatesCont.Provider>
  );
}
