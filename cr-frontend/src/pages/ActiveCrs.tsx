import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/Api.Constants";
import ActiveCrList from "../components/ActiveCrList";


interface CrModel {
  title: string;
  description: string;
  date: string;
  id: number;
}
function ActiveCrs() {
  const [crs, setCrs] = React.useState<CrModel[]>([]);
  const title: any = React.useRef();
  const description: any = React.useRef();

  // get all crs not completed with respect to userid
  const getAllNotCompletedCrs = async () => {
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      const response = await custom_axios.get(ApiConstants.CR.FIND_NOT_COMPLETED(userId), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      setCrs(response.data);
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  const saveCr = async () => {
    if (title.current.value == "") {
      toast.info("Please Provide Title");
      return;
    }
    if (description.current.value == "") {
        toast.info("Please Provide Description");
        return;
      }
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      const response = await custom_axios.post(
        ApiConstants.CR.ADD(userId),
        {
          title: title.current.value,
          description: description.current.value,
        },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      getAllNotCompletedCrs();
      title.current.value = "";
      description.current.value = "";
      toast.success("CR Added Scuessfully!!");
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  React.useEffect(() => {
    if (crs.length == 0) getAllNotCompletedCrs();
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <div className="container mb-2 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4">
          <span className="text-black text-2xl ">Enter Title : </span>
          <input ref={title} className="mt-2 p-2  rounded-xl "></input>
          <span className="text-black text-2xl ">Enter Description : </span>
          <input ref={description} className="mt-2 p-2  rounded-xl "></input>
          <button onClick={saveCr} className="w-36 px-2 py-4 text-white mx-auto mb-12 mt-2 bg-green-400 rounded-xl hover:bg-green-500 text-2xl">
            Save
          </button>

          {crs.map((cr) => {
            return (
              <ActiveCrList
                key={cr.id}
                dateTime={cr.date}
                deleteCr={async () => {
                  const response = await custom_axios.delete(ApiConstants.CR.DELETE(cr.id), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                  getAllNotCompletedCrs();
                  toast.success("CR Deleted Sucessfully!!");
                }}
                markComplete={async () => {
                  const response = await custom_axios.patch(ApiConstants.CR.MARK_COMPLETED(cr.id), {}, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                  getAllNotCompletedCrs();
                  toast.success("CR Marked Completed");
                }}

                title={cr.title}
                description={cr.description}
                id={cr.id}
              ></ActiveCrList>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ActiveCrs;