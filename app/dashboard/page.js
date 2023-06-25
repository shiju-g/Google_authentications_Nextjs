"use client";
import React from "react";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { MainTodo, DeleteTodo } from "@/redux/features/todos";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { AiOutlineArrowLeft, AiTwotoneDelete } from "react-icons/ai";

const page = () => {
  const router = useRouter();
  const [MainTodos, setMainTodos] = useState();
  const [addTodoState, setAddTodoState] = useState(false);
  const { status, data } = useSession();
  const [todoName, setTodoName] = useState();
  const [todoStatus, setTodoStatus] = useState();
  const dispatch = useDispatch();

  if (status === "unauthenticated") {
    router.push("/");
  }

  const mainTodos = useSelector((state) => state);
  useEffect(() => {
    setMainTodos(mainTodos?.MainTodos?.TodoList);
  }, [mainTodos]);

  function AddTodoHandler() {
    const todo = {
      id: MainTodos.length + 1,
      desc: todoName,
      status: todoStatus,
    };
    dispatch(MainTodo(todo));
    alert("new todo added");
    setAddTodoState(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between sm:px-5 px-2 mb-3 py-5 bg-slate-100 ">
        <h1 className="text-center font-bold sm:text-xl text-lg ">
          Welcome to Dashboard!
        </h1>
        <button
          onClick={() => {
            router.push("/");
            signOut();
          }}
          className="bg-black px-3 py-1 text-white font-bold sm:text-lg rounded-lg"
        >
          SignOut
        </button>
      </div>
      {data && (
        <>
          <h3 className="text-center mb-2  font-semibold text-gray-600">
            Profile Details
          </h3>
          <div className="bg-indigo-100  shadow rounded-xl p-5 md:max-w-xl max-w-xs mx-auto">
            <img
              className="h-20 rounded-full mx-auto  w-20"
              src={data?.user?.image}
              alt=""
            />
            <h4 className="text-center text-lg font-bold mt-1">
              {data?.user?.name}
            </h4>
            <p className="text-center font-semibold text-gray-700">
              {data?.user?.email}
            </p>
          </div>
          <div className="xl:w-9/12 lg:w-10/12 w-11/12 mx-auto bg-slate-100 shadow-inner rounded-xl p-5 mt-5">
            <div className="flex justify-between items-center mb-5 px-2">
              <h4 className="text-lg font-semibold">Todos</h4>

              {!addTodoState && (
                <button
                  onClick={() => setAddTodoState(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-3 py-1 rounded-lg"
                >
                  Add
                </button>
              )}
              {addTodoState && (
                <button
                  onClick={() => setAddTodoState(false)}
                  className="flex text-sm items-center  font-bold mb-3 w-fit bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                >
                  <AiOutlineArrowLeft className="h-5 w-5 mr-1 " /> Back
                </button>
              )}
            </div>
            {addTodoState && (
              <div className="flex flex-col space-y-3">
                <div>
                  <h1 className=" text-lg font-bold">
                    Id: {MainTodos.length + 1}
                  </h1>
                </div>
                <div>
                  <h1 className=" text-lg font-bold">Name:</h1>
                  <input
                    className="mt-1 rounded-lg px-3 w-full py-1"
                    type=""
                    placeholder="Update your name"
                    name=""
                    value={todoName}
                    onChange={(e) => setTodoName(e.target.value)}
                  />
                </div>
                <div>
                  <h3 className=" text-lg font-bold">Status:</h3>
                  <input
                    className="mt-1 w-full rounded-lg px-3 py-1"
                    type=""
                    placeholder="Update the status"
                    name=""
                    value={todoStatus}
                    onChange={(e) => setTodoStatus(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={AddTodoHandler}
                    className="bg-green-600 text-white font-bold rounded-lg px-5 py-2 "
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            {!addTodoState &&
              MainTodos?.map((item, index) => (
                <div
                  className="bg-white p-3 rounded-xl gap-4 mb-3 shadow flex  sm:flex-row flex-col sm:justify-normal justify-center items-center"
                  key={index}
                >
                  <span className="justify-self-start text-2xl text-left font-medium">
                    {index + 1}
                  </span>
                  <h1 className=" text-lg font-bold">
                    {item?.desc}{" "}
                    <span className="text-base text-gray-500 ml-1">
                      (id: {item.id})
                    </span>
                  </h1>
                  <p
                    className={
                      item.status === "Completed"
                        ? "bg-green-500 px-3 py-1 rounded-xl font-semibold text-white"
                        : item.status == "Started"
                        ? "bg-orange-500 px-3 py-1 rounded-xl font-semibold text-white"
                        : "bg-red-500 px-3 py-1 rounded-xl font-semibold text-white"
                    }
                  >
                    {item?.status}
                  </p>
                  <Link
                    href={`/dashboard/todo/${item.id}`}
                    className="sm:ml-auto sm:w-fit w-full text-center bg-blue-500 font-medium rounded-lg px-3 p-1 text-white"
                  >
                    View
                  </Link>
                  <button
                    className="flex items-center gap-2"
                    onClick={() => dispatch(DeleteTodo(item.id))}
                  >
                    <AiTwotoneDelete className="w-6 h-6 text-red-400" />
                    <span className="sm:hidden block font-bold text-red-500">
                      Delete
                    </span>
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
