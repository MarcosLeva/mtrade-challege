import React, { useState, useEffect } from "react";


function useDataApi(requestFunction, defaultValueData = [], autoLoad = true) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(defaultValueData);
  const [count, setCount] = useState(defaultValueData.length);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (autoLoad) {
      load();
    }
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const response = await requestFunction();
      setResponse(response);
      if (response.data.results) {
        setData(response.data.results);
        if (typeof response.data.count === "number") {
          setCount(response.data.count);
        }
      } else {
        setData(response.data);
      }
    } catch (err) {
      setData(defaultValueData);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateIndex = (index, value) => {
    const _data = [...data];
    _data[index] = value;
    setData(_data);
  };

  return {
    isLoading,
    data,
    error,
    reload: load,
    updateIndex,
    count,
    response,
  };
}

export default useDataApi;
