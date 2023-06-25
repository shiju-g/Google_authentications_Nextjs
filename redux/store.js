import { configureStore } from "@reduxjs/toolkit";
import MainTodos from "@/redux/features/todos";
import AddTodo from "@/redux/features/update";
export const store = configureStore({
  reducer: {
    MainTodos,
    AddTodo,
  },
});
