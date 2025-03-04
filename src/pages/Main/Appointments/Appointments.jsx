import React, { useEffect, useRef, useState } from "react";
import { Button, DatePicker, Input, Table } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import { MdOutlineFileDownload } from "react-icons/md";
import { useGetAllAppointmentsQuery } from "../../../features/appointment/appointmentSlice";
import dayjs from "dayjs"; // For date formatting
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const Appointments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const modalRef = useRef();

  // Debounce effect: updates `debouncedSearchTerm` only after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(searchTerm);
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(handler); // Clear timeout if user types again before 500ms
    };
  }, [searchTerm]);

  // Fetch user data
  const {
    data: res,
    isLoading,
    isError,
  } = useGetAllAppointmentsQuery({
    name: debouncedSearchTerm,
    date: selectedDate ? dayjs(selectedDate).format("DD-MM-YYYY") : "",
  });

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
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      key: "appotDate",
      dataIndex: "appotDate",
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
    res?.data?.map((appot, index) => ({
      transIs: index + 1,
      username: appot.user?.name || "N/A",
      doctorName: appot?.doctor?.name || "N/A",
      amount: appot?.doctor?.consultationFee || "N/A",
      appotDate: appot.date ? dayjs(appot.date).format("DD MMM YYYY") : "N/A",
      ...appot, // Pass full user object for modal display
    })) || [];

  const generatePDF = (saveToFile = true) => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    html2canvas(modalElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      if (saveToFile) {
        // Save as PDF file
        pdf.save("appointment-details.pdf");
      } else {
        // Open print dialog with the generated PDF
        window.open(pdf.output("bloburl"), "_blank");
      }
    });
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
          Appointments
        </h3>
        <div className="flex items-center gap-4 mb-6">
          <DatePicker
            placeholder="Filter by Date"
            onChange={(date) => setSelectedDate(date)}
            className="w-[164px] h-[36px] rounded-[86px] border-none outline-none"
          />
          <Input
            placeholder="Search Appointments"
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
        <div className="py-[24px] font-roboto" ref={modalRef}>
          <h2 className="text-[18px] text-center mb-4 font-roboto">
            User Details
          </h2>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600 px-[16px] py-[20px]">
            <p className="text-[14px] ">User Name: </p>
            <p>{modalData.username}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Packages:</p>
            <p>{modalData?.package || "Online Consultation"}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Date & Time:</p>
            <p>
              {modalData.appotDate}, {modalData.startTime}
            </p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Doctor name:</p>
            <p>{modalData.doctorName}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Appointment fee:</p>
            <p>{modalData.amount}</p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Payment status:</p>
            <p className="bg-[#07D11F] text-white px-2 py-[6px] rounded-full">
              {modalData.status}
            </p>
          </div>
          <div className="border-b border-[#B8C1CF] w-full"></div>
          <div className="flex justify-between mb-2 text-gray-600  px-[16px] py-[20px]">
            <p>Appointment status:</p>
            <p className="bg-[#07D11F] text-white px-2 py-[6px] rounded-full">
              {modalData.status}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-[12px] mx-2 mt-4">
            <button
              onClick={() => generatePDF(true)}
              className="border border-[#545454] w-[200px] h-[48px] rounded-[29px] flex items-center justify-center gap-[10px]"
            >
              {/* <MdOutlineFileDownload size={20} /> */}
              <h2 className="font-roboto text-[18px] text-[#333333]">
                Download
              </h2>
            </button>
            <button
              onClick={() => generatePDF(false)}
              className="bg-[#90A4AE] w-[200px] h-[48px] rounded-[29px] flex items-center justify-center gap-[10px] font-roboto text-white text-[18px]"
            >
              Print
            </button>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Appointments;
