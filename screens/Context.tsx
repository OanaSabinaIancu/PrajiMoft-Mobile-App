import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface MyContextProps {
  data: any[];
  activeTab: string;
  video: string;
  status: string;
  fetchData: () => void;
  handleTabPress: (tab: string) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyContextProvider: React.FC = ({ children }) => {
  // Define your state and functions
  const [data, setData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [status, setStatus] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
    // const axios = require('axios');

        try {
            const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions', {
            headers: {
                'X-RapidAPI-Key': '367816627bmshc163dbd49276949p1fdcc1jsncdc3418eb0b6',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            },
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


  const handleTabPress = (tab: string) => {
    // Update the activeTab state based on the pressed tab
    setActiveTab(tab);
  };

  // Create the context value object
  const contextValue: MyContextProps = {
    data,
    activeTab,
    video,
    status,
    fetchData,
    handleTabPress,
  };

  // Provide the context value to the children components
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
