import React from "react";
import { getLoginInfo } from "../utils/LoginInfo";

interface ActiveCrListProps {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  markComplete: (id: number) => void;
  deleteCr: (id: number) => void;
}
const role = getLoginInfo()?.role;

const ActiveCrList: React.FC<ActiveCrListProps> = (props) => {
  return (
    <div className="mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">{props.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{props.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{props.description}</td>
            <td className="px-6 py-4 whitespace-nowrap">{props.dateTime}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => props.markComplete(props.id)} style={{ display: role != "ADMIN" ? "none" : "" }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                Mark Completed
              </button>
              <button onClick={() => props.deleteCr(props.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ActiveCrList;

