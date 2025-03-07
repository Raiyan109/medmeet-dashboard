import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, Table } from "antd";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import { useGetAllDoctorsQuery } from "../../../features/doctor/doctorSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const Doctor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Debounce effect: updates `debouncedSearchTerm` only after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(handler); // Clear timeout if user types again before 500ms
    };
  }, [searchTerm]);

  const {
    data: res,
    isLoading,
    isError,
  } = useGetAllDoctorsQuery({
    searchTerm: debouncedSearchTerm,
    status: "approved",
  });

  // Filter users by selected date
  useEffect(() => {
    if (selectedDate && res?.data) {
      const formattedDate = dayjs(selectedDate).format("DD MMM YYYY"); // Format date
      const filtered = res.data.filter(
        (user) => dayjs(user.createdAt).format("DD MMM YYYY") === formattedDate
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(res?.data || []);
    }
  }, [selectedDate, res]);

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#Dr. Id",
      dataIndex: "drId",
      key: "drId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Doctor Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Specialized In",
      key: "specialized_in",
      dataIndex: "specialized_in",
    },
    {
      title: "Action",
      key: "Review",
      aligen: "center",
      render: (_, data) => (
        <div className="  items-center justify-around textcenter flex ">
          {/* Review Icon */}
          <img
            src={exlamIcon}
            alt=""
            className="btn  px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
          {/* <Link to={'/reviews'} className="btn bg-black text-white px-3 py-1 text-sm rounded-full">
                 
                  View
                </Link> */}
        </div>
      ),
    },
  ];

  const dataSource =
    filteredUsers?.map((user, index) => ({
      drId: user.doctorId || index,
      username: user.name || "N/A",
      email: user.email || "N/A",
      phone: user.phoneNumber || "N/A",
      specialized_in: user.specialist?.name || "N/A",
      ...user, // Pass full user object for modal display
    })) || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner size={12} color="stroke-[#272b28]" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return <p className="text-red-500">Something went wrong!</p>;
  }

  return (
    <div className="rounded-lg bg-[#DDE3E6] mt-8 recent-users-table py-[20px]">
      <div className="flex justify-between px-2">
        <h3 className="text-[20px] font-poppins text-[#333333] pl-[20px]">
          Doctor List
        </h3>
        <div className="flex items-center gap-4 mb-6">
          {/* <DatePicker
            placeholder="Filter by Date"
            onChange={(date) => setSelectedDate(date)}
            className="w-[164px] h-[36px] rounded-[86px] border-none outline-none"
          /> */}
          <Input
            placeholder="Search Doctor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[187px] h-[36px] rounded-[86px] border-none outline-none"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="size-8 flex justify-center items-center"
              style={{
                border: "none",
                backgroundColor: "#545454",
                color: "white",
                borderRadius: "50%",
                padding: "7px",
              }}
            >
              X
            </button>
          )}
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
        // backgroundColor={'#E8EBF0'}
      >
        <div className="py-[24px] font-roboto">
          <h2 className="text-[18px] text-center mb-4 font-roboto">
            User Details
          </h2>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600 px-[16px] py-[20px]">
            <p className="text-[14px] ">Doctor Name </p>
            <p>{modalData.username || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Email</p>
            <p>{modalData.email || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Phone Number</p>
            <p>{modalData.phoneNumber || "N/A"}</p>
          </div>

          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Specialized In</p>
            <p>{modalData.specialized_in || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Experience</p>
            <p>{modalData.experience || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Clinic Address</p>
            <p>{modalData.clinicAddress || "N/A"}</p>
          </div>

          {/* Buttons */}
          {/* <div className="flex items-center justify-center gap-[12px] mx-2">
          <div className="border border-[#545454] w-[200px] h-[48px] rounded-[29px] flex items-center justify-center gap-[10px]">
            <MdOutlineFileDownload size={20} />
            <h2 className="font-roboto text-[18px] text-[#333333]">Download</h2>
          </div>
          <div className="bg-[#90A4AE] w-[200px] h-[48px] rounded-[29px] flex items-center justify-center gap-[10px] font-roboto text-white text-[18px]">
            Print
          </div>
        </div> */}
        </div>
      </DashboardModal>
    </div>
  );
};

export default Doctor;
