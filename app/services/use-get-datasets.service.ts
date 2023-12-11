'use client';

import { useEffect, useState } from 'react';
import { DatasetModel } from '../type';

async function getDataset() {
  const data = await fetch('/api/dataset');
  return data;
}

export function useGetDatasets() {
  const [datasets, setDatasets] = useState<DatasetModel[]>([]);
  const [originData, setOriginData] = useState<DatasetModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSearchDatasets(valueSearch: string = '') {
    if (!valueSearch.trim()) {
      setDatasets(originData);
      return;
    }

    const filteredValue = originData.filter((data) =>
      data.label.toLowerCase().includes(valueSearch.toLocaleLowerCase()),
    );

    setDatasets(filteredValue);
  }

  useEffect(() => {
    setIsLoading(true);

    getDataset()
      .then(async (data) => {
        const res = await data.json();
        setDatasets(res);
        setOriginData(res);
      })
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    datasets,
    handleSearchDatasets,
    isLoading,
  };
}
