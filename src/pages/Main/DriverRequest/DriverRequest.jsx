import Swal from "sweetalert2";
import { driverItems } from "../../../constants/driver.constants";
import { DatePicker, Input, Table } from "antd";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import {
  useGetAllDoctorsQuery,
  useUpdateDoctorStatsMutation,
} from "../../../features/doctor/doctorSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { Link } from "react-router-dom";
import { getAssetUrl } from "../../../utils";
import notFoundImage from "../../../assets/images/not-found.png";
import toast from "react-hot-toast";

const DriverRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const [updateStats, { isLoading: statsLoading }] =
    useUpdateDoctorStatsMutation();

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
  // useEffect(() => {
  //   if (selectedDate && res?.data) {
  //     const formattedDate = dayjs(selectedDate).format("DD MMM YYYY"); // Format date
  //     const filtered = res.data.filter(
  //       (user) => dayjs(user.createdAt).format("DD MMM YYYY") === formattedDate
  //     );
  //     setFilteredUsers(filtered);
  //   } else {
  //     setFilteredUsers(res?.data || []);
  //   }
  // }, [selectedDate, res]);

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
            className={`py-1 flex justify-center rounded-full font-semibold text-center ${bgColor} ${textColor}`}
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
        </div>
      ),
    },
  ];

  const dataSource =
    res?.data.map((user, index) => ({
      drId: user.doctorId || index,
      username: user.name || "N/A",
      email: user.email || "N/A",

      specialized_in: user.specialist?.name || "N/A",
      states: user.approvedStatus || "N/A",
      ...user, // Pass full user object for modal display
    })) || [];

  const handleDoctorStats = async (stats) => {
    if (stats === "rejected") {
      Swal.fire({
        text: "Are you sure you want to reject the request?",
        showCancelButton: true,
        confirmButtonText: "     Sure    ",
        cancelButtonText: "Cancel",
        showConfirmButton: true,
        confirmButtonColor: "#DC2626",
        reverseButtons: true,
      }).then(async (res) => {
        if (res.isConfirmed) {
          const response = await updateStats({
            stats: { status: "rejected" },
            doctorId: modalData._id,
          }).unwrap();

          if (response?.success) {
            setIsModalOpen(false);
            toast.success("Doctor request rejected.");
          }
        }
      });
    } else {
      const response = await updateStats({
        stats: { status: "approved" },
        doctorId: modalData._id,
      }).unwrap();

      if (response?.success) {
        setIsModalOpen(false);
        toast.success(response.message);
      }
    }
  };

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
            <p>{modalData.username || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Specialist</p>
            <p>{modalData.specialized_in || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Experience:</p>
            <p>{modalData.experience || "N/A"} years</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Clinic Name:</p>
            <p>{modalData.clinic || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Clinic Address</p>
            <p>{modalData.clinicAddress || "N/A"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Consultation Fee</p>
            <p>{modalData.consultationFee || "N/A"}</p>
          </div>
          {/* professional id */}
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Professional ID Image</p>
            {modalData.professionalIdFront || modalData.professionalIdBack ? (
              <div>
                <p
                  className="text-[#1E65FF] cursor-pointer"
                  onClick={() => {
                    setModalImage(modalData.professionalIdFront);
                    setShowImageModal(true);
                  }}
                >
                  {modalData.professionalIdFront?.split("/").pop()}
                </p>
                <p
                  className="text-[#1E65FF] cursor-pointer"
                  onClick={() => {
                    setModalImage(modalData.professionalIdBack);
                    setShowImageModal(true);
                  }}
                >
                  {modalData.professionalIdBack?.split("/").pop()}
                </p>
              </div>
            ) : (
              "N/A"
            )}
          </div>

          {/* medical lisence */}
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Medical License (PDF)</p>
            {modalData.medicalLicense ? (
              <Link
                to={getAssetUrl(modalData.medicalLicense)}
                target="_blank"
                className="text-[#1E65FF] hover:text-blue-400"
              >
                {modalData.medicalLicense?.split("/").pop()}
              </Link>
            ) : (
              "N/A"
            )}
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>About Doctor</p>
            {/* <p>{modalData.transIs}</p> */}
          </div>
          <div className="px-[10px] h-[160px] w-full">
            <textarea
              value={modalData.aboutDoctor || "N/A"}
              className="h-[160px] p-6 w-full border border-[#DDDEE0] bg-transparent rounded-[12px] focus:outline-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-[12px] mx-2 mt-[8px]">
            {statsLoading ? (
              <div className="flex justify-center w-full">
                <LoadingSpinner size={5} color="stroke-[#272b28]" />
              </div>
            ) : (
              <>
                {modalData.approvedStatus !== "rejected" && (
                  <button
                    onClick={() => handleDoctorStats("rejected")}
                    className="font-roboto border border-[#EE1D23] text-[#EE1D23] text-[18px] w-[200px] h-[48px] rounded-[29px] flex items-center justify-center gap-[10px]"
                  >
                    Reject
                  </button>
                )}
                {modalData.approvedStatus !== "approved" && (
                  <button
                    onClick={() => handleDoctorStats("approved")}
                    className="bg-[#90A4AE] w-[200px] h-[48px] rounded-[29px] flex items-center justify-center gap-[10px] font-roboto text-white text-[18px]"
                  >
                    Approve
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </DashboardModal>

      {/* image modal */}
      <DashboardModal
        isModalOpen={showImageModal}
        setIsModalOpen={setShowImageModal}
        // maxWidth="840px"
        // backgroundColor={'#E8EBF0'}
      >
        <div className="flex p-24 bg-transparent justify-center">
          <img
            src={getAssetUrl(modalImage)}
            alt={modalImage?.split("/").pop || "N/A"}
            onError={(e) => (e.target.src = notFoundImage)}
          />
        </div>
      </DashboardModal>
    </div>
  );
};

export default DriverRequest;
