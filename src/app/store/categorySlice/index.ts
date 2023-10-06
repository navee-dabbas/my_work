// ** Redux Imports
import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";

// ** Employee Service Imports
import CategoryService from "../../../components/services/category.service";
import { AppDispatch, RootState } from "../store";

// ** Initial State Of Slice

interface InitialState {
  entities: [];
  entity: {};
  params: any;
  status: "pending" | "error" | "success" | "idle";
}

// Api Error
const ApiError = (
  error: any,
  dispatch: AppDispatch,
  rejectWithValue: (reasaon: string) => void
) => {
  dispatch(CategorySlice.actions.handleStatus("error"));
  return rejectWithValue(error.response.data.message || "Something Went Wrong");
};

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: Dispatch<any>;
}>();

// ** Fetch One
export const fetchOneAction = createAppAsyncThunk(
  "category/fetchOne",
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CategorySlice.actions.handleStatus("pending"));
    try {
      const response = await CategoryService.getById(id);
      dispatch(CategorySlice.actions.handleStatus("success"));
      return response.data;
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue);
    }
  }
);

// ** Fetch All
export const fetchAllAction = createAppAsyncThunk(
  "category/fetchAll",
  async (params: any, { getState, dispatch, rejectWithValue }) => {
    dispatch(CategorySlice.actions.handleStatus("pending"));
    try {
      dispatch(CategorySlice.actions.handleQuery(params.query));
      // query && (query.limit = `${params.pagination?.limit}` || "10")
      // query && (query.page = `${params.pagination?.page}` || "1")
      // dispatch(CategorySlice.actions.handleQuery({ query }))
      const response = await CategoryService.getAll({ query: "" });
      dispatch(CategorySlice.actions.handleStatus("success"));
      return response.data;
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue);
    }
  }
);

// ** Add
export const addAction = createAppAsyncThunk(
  "category/add",
  async ({ data }: { data: any }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CategorySlice.actions.handleStatus("pending"));
    try {
      const response = await CategoryService.add(data);
      dispatch(fetchAllAction({ query: "" }));
      dispatch(CategorySlice.actions.handleStatus("success"));
      return response.data;
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue);
    }
  }
);

// ** Update
export const updateAction = createAppAsyncThunk(
  "category/update",
  async (
    { id, data }: { id: string; data: any },
    { getState, dispatch, rejectWithValue }
  ) => {
    dispatch(CategorySlice.actions.handleStatus("pending"));
    try {
      const response = await CategoryService.update(id, data);
      dispatch(fetchAllAction({ query: "" }));
      dispatch(CategorySlice.actions.handleStatus("success"));
      return response.data;
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue);
    }
  }
);

// ** Delete
export const deleteAction = createAppAsyncThunk(
  "category/delete",
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CategorySlice.actions.handleStatus("pending"));
    try {
      const response = await CategoryService.delete(id);
      dispatch(fetchAllAction({ query: "" }));
      dispatch(CategorySlice.actions.handleStatus("success"));
      return response.data;
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue);
    }
  }
);

export const CategorySlice = createSlice({
  name: "category",
  initialState: {
    entities: [],
    entity: {},
    params: {},
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload;
    },
    handleQuery: (state, action) => {
      const prev_query = state.params.query || {};
      state.params.query = { ...prev_query, ...action.payload };
    },
    resetQuery: (state) => {
      state.params.query = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllAction.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.entities = data?.entities || [];
      state.params.pagination = data?.pagination;
    });
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.entity = data.entity;
    });
  },
});

export default CategorySlice.reducer;
