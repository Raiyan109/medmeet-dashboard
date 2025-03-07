import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import Quill from "quill";
import { GoArrowLeft } from "react-icons/go";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../features/api/apiSlice";
import LoadingSpinner from "../../Components/LoadingSpinner";
import toast from "react-hot-toast";

// Import 'size' style attributor
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["14px", "16px", "18px"]; // Custom font sizes
Quill.register(Size, true);

const modules = {
  toolbar: {
    container: [
      [{ size: ["14px", "16px", "18px"] }], // Use whitelisted sizes
      [{ color: [] }], // Text color dropdown
      ["bold", "italic", "underline", "strike"], // Formatting options
      [{ align: [] }],
      ["image", "link"],
      [{ list: "bullet" }],
    ],
    handlers: {
      align: function (value) {
        this.quill.format("align", value);
      },
    },
  },
};

const formats = [
  "size", // Custom font sizes
  "color",
  "align",
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  "list",
];

const EditAboutUs = () => {
  const navigate = useNavigate();
  const { data: content, isLoading, isError } = useGetSettingsQuery();
  const [about, setAbout] = useState(content?.data?.aboutUs || "");

  const [updateTerms, { isLoading: updateLoading }] =
    useUpdateSettingsMutation();

  useEffect(() => {
    if (content?.data?.aboutUs) {
      setAbout(content.data.aboutUs);
    }
  }, [content]); // Runs when `content` updates

  const handleUpdate = async () => {
    try {
      const res = await updateTerms({ aboutUs: about }).unwrap();

      if (res.success) {
        toast.success(res.message);
        navigate(-1);
      }
    } catch (error) {
      console.log("error while update about us: ", error);
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
    <>
      {/* Back button */}
      <div
        className="flex items-center gap-2 text-xl cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <GoArrowLeft size={30} />
        <h1 className="font-roboto text-[24px]">Edit About Us</h1>
      </div>
      <div className="rounded-lg py-4  mt-8 bg-[#DDE3E6] h-[575px]">
        <div className="space-y-[24px] min-h-[83vh]  rounded-2xl">
          <div className="w-full px-6">
            <div className="h-full  rounded-md">
              <div className="ql-toolbar-container h-56">
                about
                <ReactQuill
                  placeholder="Enter your update terms & conditions..."
                  theme="snow"
                  value={about}
                  onChange={(value) => setAbout(value)}
                  modules={modules}
                  formats={formats}
                  className="custom-quill-editor"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-end pt-[60px]">
        <Button
          onClick={handleUpdate}
          type="primary"
          size="large"
          htmlType="submit"
          className="px-2 bg-[#90A4AE] text-[20px] font-roboto"
          style={{ height: "56px", width: "484px", borderRadius: "50px" }}
        >
          {updateLoading ? (
            <LoadingSpinner size={5} color="stroke-[#272b28]" />
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </>
  );
};

export default EditAboutUs;
