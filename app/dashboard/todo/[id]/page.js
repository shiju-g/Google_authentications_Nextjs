"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";

const page = () => {
  const [todoDetails, setTodoDetails] = useState();
  const [Edit, SetEdit] = useState(false);
  const [todoName, setTodoName] = useState();
  const params = useParams();
  const State = useSelector((state) => state);
  console.log(State.MainTodos.TodoList, "redux state");

  const todos = State?.MainTodos?.TodoList;

  useEffect(() => {
    const filteredTodo = todos.filter((item) => {
      return item.id == params.id;
    });
    setTodoDetails(filteredTodo);
  }, [params.id]);

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-3 py-5 bg-slate-100 ">
        Dashboard
      </h1>
      <h4 className="text-center text-xl mb-3 font-medium text-gray-600">
        Todo Details
      </h4>
      <div className="max-w-3xl mx-auto">
        {!Edit && (
          <button
            onClick={() => SetEdit(true)}
            className="px-4 py-2 text-sm  flex items-center gap-3 font-bold ml-auto mb-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
          >
            Edit <FiEdit className="h-4 w-4" />
          </button>
        )}

        {!Edit &&
          todoDetails &&
          todoDetails.map((item) => (
            <div
              className=" p-5 rounded-xl  bg-slate-200 space-y-3 mb-3 shadow  flex-col sm:justify-normal justify-center items-center"
              key={item.id}
            >
              <h1 className=" text-lg font-bold">
                Id:{" "}
                <span className="justify-self-start text-gray-500 text-2xl text-left font-medium">
                  {item?.id}
                </span>
              </h1>
              <h1 className=" text-lg font-bold">
                Name: <span className="text-gray-500 ml-1"> {item?.desc}</span>
              </h1>
              <h3 className=" text-lg font-bold">
                Status:
                <span
                  className={
                    item.status === "Completed"
                      ? "bg-green-500 px-3 py-1 ml-2 rounded-xl font-semibold text-white"
                      : item.status == "Started"
                      ? "bg-orange-500 px-3 ml-2 py-1 rounded-xl font-semibold text-white"
                      : "bg-red-500 px-3 ml-2 py-1 rounded-xl font-semibold text-white"
                  }
                >
                  {item?.status}
                </span>
              </h3>
            </div>
          ))}

        {Edit && (
          <div className=" p-5 rounded-xl  bg-slate-200 space-y-3 mb-3 shadow  flex-col sm:justify-normal justify-center items-center">
            <button
              onClick={() => SetEdit(false)}
              className="flex text-sm items-center  font-bold mb-3 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              <AiOutlineArrowLeft className="h-5 w-5 mr-1" /> Back
            </button>
            <div>
              <h1 className=" text-lg font-bold">Id:</h1>
            </div>
            <div>
              <h1 className=" text-lg font-bold">Name:</h1>
              <input
                className="mt-1 rounded-lg px-3 w-full py-1"
                type=""
                placeholder="Update your name"
                name=""
                value=""
              />
            </div>
            <div>
              <h3 className=" text-lg font-bold">Status:</h3>
              <input
                className="mt-1 w-full rounded-lg px-3 py-1"
                type=""
                placeholder="Update the status"
                name=""
                value=""
              />
            </div>
            <div className="text-center">
              <button className="bg-green-600 text-white font-bold rounded-lg px-4 py-2 ">
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
