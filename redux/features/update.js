import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const AddTodos = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      return { data: action.payload };
    },
  },
});

export const { addTodo } = AddTodos.actions;
export default AddTodos.reducer;
