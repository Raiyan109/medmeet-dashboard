import Swal from "sweetalert2";
import { driverItems } from '../../../constants/driver.constants'
import { DatePicker, Input, Table } from "antd";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import exlamIcon from "../../../assets/images/exclamation-circle.png";

const DriverRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "License ID",
      dataIndex: "licenseId",
      key: "licenseId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div className="  text-yellow-500 font-roboto text-[14px] flex items-center justify-center">
          <div className="w-[75px] h-[24px] rounded-[37px] bg-white">
            {text}
          </div>
        </div>
      )
    },
    {
      title: "Action",
      key: "Review",
      aligen: 'center',
      render: (_, data) => (
        <div className="  items-center justify-around text-center flex " >
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
  for (let index = 0; index < 20; index++) {
    data.push({
      sl: `${index + 1}`,
      licenseId: '9893489038',
      username: "Henry",
      Email: "sharif@gmail.com",
      specialization: "Nurology",
      status: "Pending",
      Phone: "+12746478994",
      Review: "See Review",
      date: "16 Apr 2024",
      _id: index,
    });
  }
  const handleDeleteConfirmation = () => {
    Swal.fire({
      text: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonText: "     Sure    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        // dispatch(logout());
        // localStorage.removeItem("token");
        // localStorage.removeItem("user-update");
        // navigate("/auth");
      }
    });
  };
  return (
    <div className="rounded-lg bg-[#DDE3E6] mt-8 recent-users-table py-[20px]">
      <div className="flex justify-between px-2">
        <h3 className="text-[20px] font-poppins text-[#333333] pl-[20px]">Doctor List</h3>
        <div className="flex items-center gap-4 mb-6">
          <DatePicker placeholder="Date" className="w-[164px] h-[36px] rounded-[86px] border-none outline-none" />
          <Input placeholder="User Name" className="w-[187px] h-[36px] rounded-[86px] border-none outline-none" />

          <button style={{ border: 'none', backgroundColor: '#545454', color: 'white', borderRadius: '50%', padding: '7px' }}><IoSearch size={20} /></button>
        </div>
      </div>
      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
        className="rounded-lg"
      />

      {/* Dashboard Modal */}
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      // maxWidth="840px"
      // backgroundColor={'#E8EBF0'}
      >
        <div className="py-[24px] font-roboto">
          <h2 className="text-[18px] text-center mb-4 font-roboto">Doctor Details</h2>

          <div className="flex justify-between mb-2 text-gray-600 px-[16px] py-[20px]">
            <p className="text-[14px] ">Doctor Name: </p>
            <p>{modalData.username}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Specialization</p>
            <p>{modalData.email}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Experience:</p>
            <p>{modalData.username}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Clinic Name:</p>
            <p>{modalData.Phone}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Clinic Address</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Consultation Fee</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Professional ID Image</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Medical License (PDF)</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>About Doctor</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="px-[10px] h-[160px] w-full">
            <textarea className="h-[160px] w-full border border-[#DDDEE0] bg-transparent rounded-[12px] focus:outline-none" ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-[12px] mx-2 mt-[8px]">
            <div className="border border-[#EE1D23] w-[200px] h-[48px] rounded-[29px] flex items-center justify-center gap-[10px]">

              <h2 className="font-roboto text-[18px] text-[#EE1D23]">Reject</h2>
            </div>
            <div className="bg-[#90A4AE] w-[200px] h-[48px] rounded-[29px] flex items-center justify-center gap-[10px] font-roboto text-white text-[18px]">
              Approve
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  )
}

export default DriverRequest
