import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TodoList: [
    {
      id: 1,
      desc: "Learn about data structures and algorithms.",
      status: "Completed",
    },
    {
      id: 2,
      desc: "Learn Go Lang",
      status: "Started",
    },
    {
      id: 3,
      desc: "Learn Python",
      status: "Not Started",
    },
    {
      id: 4,
      desc: "Complete Freelance work",
      status: "Not Started",
    },
    {
      id: 5,
      desc: "Create Project using React.js",
      status: "Started",
    },
    {
      id: 6,
      desc: "Create Project using React.js",
      status: "Completed",
    },
  ],
};

export const todoSlice = createSlice({
  name: "main-todos",
  initialState: initialState,
  reducers: {
    MainTodo: (state, action) => {
      state.TodoList.push(action.payload);
    },
    DeleteTodo: (state, action) => {
      state.TodoList = state.TodoList.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const { MainTodo, DeleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
