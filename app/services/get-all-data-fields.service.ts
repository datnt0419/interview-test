'use client';

import { useEffect, useState } from 'react';
import { DatasetModel } from '../type';
import {
  QueryDataFieldsOptionsType,
  getDatFields,
} from './get-data-fields.service';

export function useGetAllDataFields({ dataset }: QueryDataFieldsOptionsType) {
  const [allFields, setAllFields] = useState<DatasetModel[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!dataset) return;
    setLoading(true);

    getDatFields({ dataset, type: 'all' })
      .then(async (data) => {
        const res = await data.json();
        setAllFields(res);
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  }, [dataset]);

  return {
    allFields,
    isLoading,
  };
}
