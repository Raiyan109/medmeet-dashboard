import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Button, Form, Input, Table } from "antd";
import {
  useCreateMedicineMutation,
  useGetAllMedicinesQuery,
} from "../../../features/medicine/medicineSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import DashboardModal from "../../../Components/DashboardModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import dayjs from "dayjs";

const ManageMedicine = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [form] = Form.useForm();

  // Fetch medicines
  const { data: res, isLoading, isError } = useGetAllMedicinesQuery("");
  const [addMedicine, { isLoading: createLoading }] =
    useCreateMedicineMutation();

  // Show modal for Add/Edit medicine
  const showModal = (medicine = null) => {
    setModalData(medicine);
    setIsModalOpen(true);

    if (medicine) {
      form.setFieldsValue({ name: medicine.name });
    } else {
      form.resetFields();
    }
  };

  // Table Columns
  const columns = [
    {
      title: "Medicine name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Added date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, medicine) => (
        <div className="flex items-center justify-center gap-4">
          <FiEdit
            className="text-zinc-600 cursor-pointer"
            size={18}
            onClick={() => showModal(medicine)}
          />
          <RiDeleteBinLine
            className="text-red-500 cursor-pointer"
            size={20}
            onClick={() => handleDelete(medicine._id)}
          />
        </div>
      ),
    },
  ];

  // Transform API data for Table
  const dataSource =
    res?.data?.map((medicine, index) => ({
      key: medicine._id || index,
      name: medicine.name || "N/A",
      date: medicine.createdAt
        ? dayjs(medicine.createdAt).format("DD MMM YYYY")
        : "N/A",
      ...medicine, // Pass full medicine object for modal display
    })) || [];

  // Handle Delete
  const handleDelete = async (medicineId) => {
    try {
      Swal.fire({
        text: "Are you sure you want to delete this medicine?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        showConfirmButton: true,
        confirmButtonColor: "#DC2626",
        reverseButtons: true,
      }).then(async (res) => {
        if (res.isConfirmed) {
          toast.promise(deleteCategory(medicineId).unwrap(), {
            loading: "Deleting medicine...",
            success: "Medicine deleted successfully!",
            error: "Failed to delete medicine!",
          });
        }
      });
    } catch (error) {
      toast.error("Something went wrong while deleting the medicine.");
      console.error("Error deleting medicine:", error);
    }
  };

  // Handle Form Submission (Create/Update)
  const onFinish = async (values) => {
    try {
      if (modalData) {
        // Update medicine
        await updateCategory({
          _id: modalData._id,
          name: values.name,
        }).unwrap();
        toast.success("Medicine updated successfully");
      } else {
        // Create new medicine
        await addMedicine({ name: values.name }).unwrap();
        toast.success("Medicine added successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
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
    <div className="rounded-lg bg-[#DDE3E6] recent-users-table mt-8 py-[20px]">
      {/* Add Medicine Button */}
      <div className="flex justify-end mb-[16px]">
        <button
          className="w-[200px] h-[56px] bg-[#90A4AE] rounded-[8px] flex items-center justify-center gap-[8px] mr-20"
          onClick={() => showModal()}
        >
          <FaPlus size={15} className="text-white" />
          <h1 className="text-white font-roboto text-[20px]">Add Medicine</h1>
        </button>
      </div>

      {/* Medicine Table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ position: ["bottomCenter"] }}
        className="rounded-lg"
      />

      {/* Modal for Create/Update Medicine */}
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="400px"
      >
        <div className="h-[400px]">
          <div className="flex items-center gap-[8px] pt-[24px] pl-[28px]">
            <GoArrowLeft size={30} />
            <h1 className="font-poppins text-[24px]">
              {modalData ? "Edit Medicine" : "Add New Medicine"}
            </h1>
          </div>

          <div className="flex items-center justify-center">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="text-start"
            >
              <Form.Item
                label="Medicine Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter a medicine name!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter medicine name"
                  style={{
                    width: "345px",
                    height: "44px",
                    borderRadius: "114px",
                    border: "1px solid #DDDEE0",
                    background: "transparent",
                    paddingLeft: "12px",
                  }}
                />
              </Form.Item>

              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={createLoading}
                block
                className="px-2 w-full bg-[#90A4AE]"
              >
                {modalData ? "Update Medicine" : "Add Medicine"}
              </Button>
            </Form>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default ManageMedicine;
