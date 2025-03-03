import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Button, Form, Input, Upload } from "antd";
import {
  useCreateACategoryMutation,
  useDeleteACategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateACategoryMutation,
} from "../../../features/category/categorySlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import DashboardModal from "../../../Components/DashboardModal";
import { getAssetUrl } from "../../../utils";
import notFoundImage from "../../../assets/images/not-found.png";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();

  // Fetch categories
  const { data: res, isLoading, isError } = useGetAllCategoriesQuery("");

  // RTK Query mutations
  const [createCategory, { isLoading: createLoading }] =
    useCreateACategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateACategoryMutation();
  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteACategoryMutation();

  // Show modal for Add/Edit category
  const showModal = (category = null) => {
    setModalData(category);
    setIsModalOpen(true);

    if (category) {
      form.setFieldsValue({ name: category.name });
      setPreviewImage(getAssetUrl(category.image)); // Show existing category image
    } else {
      form.resetFields();
      setPreviewImage(null);
    }
    setSelectedFile(null);
  };

  // Handle Delete
  const handleDelete = async (categoryId) => {
    try {
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
          toast.promise(deleteCategory(categoryId).unwrap(), {
            loading: "Deleting category...",
            success: (response) =>
              response.message || "Category deleted successfully!",
            error: (err) => {
              console.log(err);
              return err.data.message || "Failed to delete category!";
            },
          });
        }
      });
    } catch (error) {
      toast.error("Something went wrong durinc category deletation");
      console.error("Error deleting category:", error);
    }
  };

  // Handle Form Submission (Create/Update)
  const onFinish = async (values) => {
    const formData = new FormData();
    // If no image is selected, prevent submission
    if (!selectedFile && !previewImage) {
      toast.error("Icon can't be empty");
      return;
    }
    formData.append("data", JSON.stringify({ name: values.name }));

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      if (modalData) {
        // Update category
        if (!selectedFile && !previewImage) {
          toast.error("Icon can't be empty");
          return;
        }

        await updateCategory({
          _id: modalData._id,
          name: values.name,
          image: selectedFile,
        }).unwrap();
        toast.success("Category updated successfully");
      } else {
        // Create category
        await createCategory(formData).unwrap();
        toast.success("Category created successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle file selection
  const handleFileChange = ({ file }) => {
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file)); // Show preview of selected image
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
    <div>
      {/* Add Category button */}
      <div className="flex justify-end mb-[16px]">
        <button
          className="w-[200px] h-[56px] bg-[#90A4AE] rounded-[8px] flex items-center justify-center gap-[8px] mr-20"
          onClick={() => showModal()}
        >
          <FaPlus size={15} className="text-white" />
          <h1 className="text-white font-roboto text-[20px]">Add Category</h1>
        </button>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-6 gap-[23px]">
        {res?.data.map((cat, i) => (
          <div
            key={i}
            className="w-[152px] h-[166px] rounded-[8px] bg-[#DDE3E6] flex flex-col items-center justify-center"
          >
            {/* Image */}
            <div className="bg-white w-[76px] h-[76px] rounded-[12px] flex items-center justify-center mb-[8px]">
              <img
                src={getAssetUrl(cat.image)}
                onError={(e) => (e.target.src = notFoundImage)}
                alt={cat?.name}
                className="w-[65px] h-[65px] object-contain"
              />
            </div>
            <h1 className="font-roboto text-[18px] text-[#333333] mb-[12px]">
              {cat?.name}
            </h1>
            <div className="flex items-center justify-center gap-[8px]">
              <button
                onClick={() => handleDelete(cat._id)}
                className="w-[56px] h-[20px] font-roboto text-[12px] bg-transparent border border-[#545454] rounded-[2px]"
              >
                Delete
              </button>
              <button
                onClick={() => showModal(cat)}
                className="w-[56px] h-[20px] font-roboto text-[12px] bg-[#90A4AE] text-white rounded-[2px]"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Create/Update Category */}
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="400px"
      >
        <div className="h-[400px]">
          <div className="flex items-center gap-[8px] pt-[24px] pl-[28px]">
            <GoArrowLeft size={30} />
            <h1 className="font-poppins text-[24px]">
              {modalData ? "Edit Category" : "Add New Category"}
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
                label="Category Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter a category name!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter category name"
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

              <Form.Item label="Upload Category Icon" name="image">
                <Upload
                  beforeUpload={() => false}
                  showUploadList={false}
                  onChange={handleFileChange}
                >
                  <button
                    type="button"
                    className="w-[345px] h-[44px] rounded-[114px] border border-[#DDDEE0] bg-transparent px-4 flex items-center justify-between text-gray-500 hover:bg-gray-100 transition"
                  >
                    Upload Icon
                    <FaPlus className="text-gray-500 mr-2" />
                  </button>
                </Upload>
              </Form.Item>

              {/* Show selected image preview */}
              {previewImage && (
                <div className="mt-4 flex justify-center relative w-fit  mb-4">
                  <img
                    src={previewImage}
                    alt="Selected Category"
                    className="w-[50px] h-[50px] object-contain rounded-md"
                  />
                  <p
                    onClick={() => {
                      setPreviewImage(null);
                      setSelectedFile(null);
                    }}
                    className="flex size-5 justify-center items-center bg-red-500/50 absolute -right-2 -top-2 rounded-full cursor-pointer"
                  >
                    X
                  </p>
                </div>
              )}

              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={createLoading || updateLoading}
                block
                className="px-2 w-full bg-[#90A4AE]"
              >
                {modalData ? "Update Category" : "Add Category"}
              </Button>
            </Form>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Categories;
