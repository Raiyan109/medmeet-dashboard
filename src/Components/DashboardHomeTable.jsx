import { Table } from "antd";
import { Link } from "react-router-dom";
import exlamIcon from "../assets/images/exclamation-circle.png";
import { useState } from "react";
import DashboardModal from "./DashboardModal";

const DashboardHomeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "transIs",
      key: "transIs",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorname",
      key: "doctorname",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Action",
      key: "Review",
      aligen: 'center',
      render: (_, data) => (
        <div className="  items-center justify-around textcenter flex">
          {/* Review Icon */}
          <img src={exlamIcon} alt="" className="btn  px-3 py-1 text-sm rounded-full cursor-pointer" onClick={() => showModal(data)} />
          {/* <Link to={'/reviews'} className="btn bg-black text-white px-3 py-1 text-sm rounded-full">
           
            View
          </Link> */}
        </div>
      ),
    },
  ];

  const data = [];
  for (let index = 0; index < 6; index++) {
    data.push({
      transIs: `${index + 1}`,
      username: "Henry",
      doctorname: "John Doe",
      amount: "$250",
      Review: "See Review",
      date: "16 Apr 2024",
      _id: index,
    });
  }

  return (
    <div className="rounded-lg bg-[#DDE3E6] mt-8 recent-users-table py-[20px]">
      <h3 className="text-[20px] font-poppins text-[#333333] mb-4 pl-[20px]">Recent Transactions</h3>
      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
        className="rounded-lg font-poppins"
      />

      {/* Dashboard Modal */}
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
      // backgroundColor={'#E8EBF0'}
      >
        <div className="py-[24px] font-roboto">
          <h2 className="text-[18px] text-center mb-4 font-roboto">Transaction Details</h2>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600 px-[16px] py-[20px]">
            <p className="text-[14px] ">Transaction ID: </p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Date</p>
            <p>{modalData.date}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>User name:</p>
            <p>{modalData.username}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>A/C number:</p>
            <p>{modalData.Phone}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>A/C holder name</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Transaction amount</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Doctor name</p>
            <p>{modalData.transIs}</p>
          </div>

        </div>
      </DashboardModal>
    </div>
  );
};

export default DashboardHomeTable;
