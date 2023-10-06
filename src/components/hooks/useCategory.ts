import { useEffect, useMemo } from "react";

// ** Third Party Imports

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Actions Imports
import {
  fetchAllAction,
  fetchOneAction,
  addAction,
  updateAction,
  deleteAction,
} from "../../app/store/categorySlice";
import { AppDispatch, RootState } from "@/app/store/store";

const defaultValues = {
  // title: '',
  name: "",
  order: 1,
  image: "",
};

export const useCategory = () => {
  // ** Hook
  const store = useSelector((state: RootState) => state.categorySlice);
  const dispatch = useDispatch<AppDispatch>();

  const getCategory = async (id: string) => {
    dispatch(fetchOneAction({ id }));
  };

  const getCategories = async ({ query }: any) => {
    dispatch(fetchAllAction({ query }));
  };

  const addCategory = async (data: any) => {
    dispatch(addAction({ data })).then(({ payload }: any) => {
      console.log(payload);
    });
  };

  const updateCategory = async (id: string, data: any) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      console.log(payload);
    });
  };

  const deleteCategory = async (id: string) => {
    dispatch(deleteAction({ id })).then(({ payload }: any) => {
      console.log(payload);
    });
  };

  return {
    store,
    getCategory,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
