import { useEffect, useState } from "react";

// import get from "lodash.get";
import BaseCrud from "/src/@core/utils/api_helper";
import { QueryParams } from "/src/@core/utils/types";

// import { useSnackbar } from 'notistack';

export const useDataTable = (endPoint: string, paramsTable: QueryParams, dataPath:string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState(false);


  // const { enqueueSnackbar } = useSnackbar();
  const crud = new BaseCrud(endPoint)

  const handleClickVariant = (variant: any) => () => {
    // variant could be success, error, warning, info, or default
    // enqueueSnackbar('This is a success message!', { variant });
  };


  const refetchTable = async () => {
    setLoading(true);
    await crud.index({...paramsTable}).then((res) => {
      setLoading(false);
      const resolved = res;
      setData(resolved);
    });
  };

 // TOTD add debounce when search

  useEffect(() => {
    refetchTable()
  }, []);



  const create = async (data: Record<string, unknown>) => {
    setWorking(true);
    await crud.create({ ...data, ...paramsTable },paramsTable)
      .then((res) => {
        refetchTable()
        handleClickVariant("success")

        return res;
      })
      .finally(() => {
        setWorking(false);
      });
  };


  const update = async (id ,data: Record<string, unknown>) => {
    setWorking(true);
    await crud.update(id,{ ...data, ...paramsTable }).then((res) => {
      refetchTable()
      handleClickVariant("success")

      return res;
    })
      .finally(() => {
        setWorking(false);
      });
  }


  const deleteTable = async (id:number) => {
    setWorking(true);
    await crud.destroy(id).then((res) => {
      refetchTable()
      handleClickVariant("error")

      return res;
    })
      .finally(() => {
        setWorking(false);
      });
  }

  return {
    data,
    loading,
    create,
    working,
    update,
    deleteTable,
    setData
  };
};
