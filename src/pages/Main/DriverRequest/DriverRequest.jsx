import Swal from "sweetalert2";
import { driverItems } from "../../../constants/driver.constants";
import { DatePicker, Input, Table } from "antd";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import { useGetAllDoctorsQuery } from "../../../features/doctor/doctorSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const DriverRequest = () => {
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
    status: "",
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
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Specialization",
      key: "specialized_in",
      dataIndex: "specialized_in",
    },
    {
      title: "States",
      key: "states",
      dataIndex: "states",
      render: (state) => {
        let bgColor, textColor;

        // Define styles based on the state
        switch (state.toLowerCase()) {
          case "pending":
            bgColor = "bg-yellow-100";
            textColor = "text-yellow-500";
            break;
          case "approved":
            bgColor = "bg-green-100";
            textColor = "text-green-600";
            break;
          case "reject":
          case "rejected":
            bgColor = "bg-red-100";
            textColor = "text-red-500";
            break;
          default:
            bgColor = "bg-gray-100";
            textColor = "text-gray-600";
        }

        return (
          <div
            className={` py-1 flex justify-center rounded-full font-semibold text-center ${bgColor} ${textColor}`}
          >
            {state}
          </div>
        );
      },
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

      specialized_in: user.specialist?.name || "N/A",
      states: user.approvedStatus || "N/A",
      ...user, // Pass full user object for modal display
    })) || [];

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
    <div className="rounded-lg bg-[#DDE3E6] mt-8 recent-users-table py-[20px]">
      <div className="flex justify-between px-2">
        <h3 className="text-[20px] font-poppins text-[#333333] pl-[20px]">
          Doctor List
        </h3>
        <div className="flex items-center gap-4 mb-6">
          {/* <DatePicker placeholder="Date" className="w-[164px] h-[36px] rounded-[86px] border-none outline-none" /> */}
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
        // maxWidth="840px"
        // backgroundColor={'#E8EBF0'}
      >
        <div className="py-[24px] font-roboto">
          <h2 className="text-[18px] text-center mb-4 font-roboto">
            Doctor Details
          </h2>

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
            <textarea className="h-[160px] w-full border border-[#DDDEE0] bg-transparent rounded-[12px] focus:outline-none"></textarea>
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
  );
};

export default DriverRequest;
