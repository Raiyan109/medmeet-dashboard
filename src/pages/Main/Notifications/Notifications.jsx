import { Button } from "antd";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  return (
    <div className=" rounded-lg min-h-screen bg-[#DDE3E6]">
      <div className="px-[32px] py-6 text-white bg-info rounded-t-lg flex items-center gap-3 border-b border-[#C0C0C0]">
        {/* <FaAngleLeft onClick={() => navigate(-1)} className="text-white" size={34} /> */}
        <h1 className="text-[30px] text-[#193664] pl-5">Notification</h1>
      </div>
      <div className="p-[24px]">
        <div className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer hover:bg-gray-100 transition-all">
          <IoIosNotificationsOutline
            style={{ cursor: "pointer" }}
            className={`border border-white w-[42px] h-[42px] rounded-lg p-1.5 shadow-sm bg-white`}
          />
          <div className="space-y-[2px]">
            <h6 className="text-lg">You have received $500 from John Doe</h6>
            <small className="text-[12px] text-gray-500">Fri, 12:30pm</small>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Notifications;
