import React, { useState } from "react";
import { Button, DatePicker, Input, Table } from "antd";
import { IoSearch } from "react-icons/io5";
import DashboardModal from "../../../Components/DashboardModal";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import { useGetAllUSersQuery } from "../../../features/user/authSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  // Fetch user data
  const { data: res, isLoading, isError } = useGetAllUSersQuery();

  // Show modal function
  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
    console.log(data);
  };

  // Columns for Table
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Action",
      key: "Review",
      align: "center",
      render: (_, data) => (
        <div className="flex items-center justify-around">
          <img
            src={exlamIcon}
            alt="Review"
            className="btn px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
        </div>
      ),
    },
  ];

  // Transform API data for Table
  const dataSource =
    res?.data?.map((user, index) => ({
      key: user._id || index,
      username: user.name || "N/A",
      email: user.email || "N/A",
      date: user.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "N/A",
      ...user, // Pass full user object for modal display
    })) || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner size={12} color="stroke-primary" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return <p className="text-red-500">Something went wrong!</p>;
  }

  return (
    <div className="rounded-lg bg-[#DDE3E6] mt-8 py-[20px]">
      <div className="flex justify-between px-2">
        <h3 className="text-[20px] font-poppins text-[#333333] pl-[20px]">
          User List
        </h3>
        <div className="flex items-center gap-4 mb-6">
          <DatePicker
            placeholder="Date"
            className="w-[164px] h-[36px] rounded-[86px] border-none outline-none"
          />
          <Input
            placeholder="User Name"
            className="w-[187px] h-[36px] rounded-[86px] border-none outline-none"
          />
          <button
            style={{
              border: "none",
              backgroundColor: "#545454",
              color: "white",
              borderRadius: "50%",
              padding: "7px",
            }}
          >
            <IoSearch size={20} />
          </button>
        </div>
      </div>

      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ position: ["bottomCenter"] }}
        className="rounded-lg"
      />

      {/* Dashboard Modal */}
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="400px"
      >
        <div className="py-[24px] font-roboto">
          <h2 className="text-[18px] text-center mb-4 font-roboto">
            User Details
          </h2>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600 px-[16px] py-[20px]">
            <p className="text-[14px] ">User Name: </p>
            <p>{modalData.username || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Email</p>
            <p>{modalData.email || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Phone number</p>
            <p>{modalData.phoneNumber || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Country</p>
            <p>{modalData.country || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Joining date</p>
            <p>{modalData.date || "N/A"}</p>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Users;
