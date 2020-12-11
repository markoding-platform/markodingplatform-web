import { useState, useContext, createContext } from 'react';
import { node } from 'prop-types';

const GlobalFormContext = createContext();

export const GlobalFormProvider = ({ children }) => {
  const [inputs, setInputs] = useState({});
  return (
    <GlobalFormContext.Provider value={{ inputs, setInputs }}>
      {children}
    </GlobalFormContext.Provider>
  );
};

GlobalFormProvider.propTypes = {
  children: node.isRequired,
};

export const useGlobalFormContext = () => useContext(GlobalFormContext);
