import React from "react";

export const OutletContext = React.createContext(null);

export const useOutletStore = () => React.useContext(OutletContext);

export const OutletContextProvider = ({ children }) => {
  const [outletInfo, setOutletInfo] = React.useState({
    width: 100,
    height: 100,
  });

  const value = React.useMemo(
    () => ({
      outletInfo,
      setOutletInfo,
    }),
    [outletInfo, setOutletInfo]
  );

  return (
    <OutletContext.Provider value={value}>{children}</OutletContext.Provider>
  );
};

export default OutletContextProvider;
