'use client';

import React, { SetStateAction, useEffect, useState } from 'react';
import { DataFieldModel } from '../type';

type ParamsType = {
  type?: 'all';
  dataset: string;
};

export async function getDatFields(params: ParamsType) {
  const { dataset, type } = params;
  const bastURL = `/api/data-fields?dataset=${dataset}`;
  const url = type ? `${bastURL}&type=${type}` : bastURL;

  const data = await fetch(url);
  return data;
}

export type QueryDataFieldsOptionsType = {
  dataset: string | null;
  setFieldsWithLabel?: React.Dispatch<SetStateAction<DataFieldModel[]>>;
};

export function useGetDataFields({
  dataset,
  setFieldsWithLabel,
}: QueryDataFieldsOptionsType) {
  const [dataFields, setDataFields] = useState<DataFieldModel[]>([]);
  const [isLoading, setLoading] = useState(false);

  function handleRemoveField(value: string) {
    setDataFields((prev) => prev.filter((pre) => pre.value !== value));
    setFieldsWithLabel &&
      setFieldsWithLabel((prev) => prev.filter((pre) => pre.value !== value));
  }

  function handleSetDataFields(fields: DataFieldModel[]) {
    setDataFields(fields);
    setFieldsWithLabel &&
      setFieldsWithLabel((prev) => {
        const intersection = fields.filter((field) =>
          prev.every((pre) => pre !== field),
        );

        return [...prev, ...intersection];
      });
  }

  useEffect(() => {
    if (!dataset) return;
    setLoading(true);

    getDatFields({ dataset })
      .then(async (data) => {
        const res = await data.json();
        setDataFields(res);
        setFieldsWithLabel && setFieldsWithLabel(res);
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  }, [dataset, setFieldsWithLabel]);

  return {
    dataFields,
    isLoading,
    handleRemoveField,
    handleSetDataFields,
  };
}
