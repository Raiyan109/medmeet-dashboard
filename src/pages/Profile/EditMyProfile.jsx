import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import dashProfile from "../../assets/images/dashboard-profile.png";
import { FiEdit } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import PhoneCountryInput from "../../Components/PhoneCountryInput";
import PageHeading from "../../Components/PageHeading";
import { PiCameraPlus } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import useAuth from "../../hooks/useAuth";
import { getAssetUrl } from "../../utils";
import { useUpadeProfileMutation } from "../../features/user/authSlice";
import LoadingSpinner from "../../Components/LoadingSpinner";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import localStorageUtil from "../../utils/localstorageutils";

const EditMyProfile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [phone, setPhone] = useState(auth?.phoneNumber || "");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    getAssetUrl(auth?.image) || dashProfile
  );

  const [updateProfile, { isLoading }] = useUpadeProfileMutation();

  // Handle File Input Click
  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  // Handle File Selection & Preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview image
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    const profileData = {
      name: values.name,
      phoneNumber: phone,
    };

    formData.append("data", JSON.stringify(profileData));

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await updateProfile(formData).unwrap();
      console.log(res.data);
      if (res.success) {
        toast.success(res.message);
        dispatch(setUser(res.data));
        localStorageUtil.setItem("user_profile", res?.data);
      }
    } catch (error) {
      console.log("Error while updating profile!", error);
    }
  };

  const profileData = {
    name: auth?.name || "N/A",
    phoneNumber: phone || "0123456789",
    profile: getAssetUrl(auth?.image) || dashProfile,
  };

  return (
    <>
      {/* Back button */}
      <div
        className="flex items-center gap-2 text-xl cursor-pointer pt-[45px]"
        onClick={() => navigate(-1)}
      >
        <GoArrowLeft size={30} />
        <h1 className="font-roboto text-[24px]">Personal information</h1>
      </div>

      <div className="pt-[58px]">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <Form
            onFinish={handleSubmit}
            name="basic"
            layout="vertical"
            className="w-full flex gap-x-[24px]"
            autoComplete="off"
            initialValues={{
              name: profileData.name,
              phoneNumber: profileData.phoneNumber,
            }}
          >
            {/* Profile Image */}
            <div className="col-span-3 space-y-6 ">
              <div className="min-h-[360px] w-[300px] rounded-xl flex flex-col items-center justify-center p-8 bg-[#DDE3E6]">
                <div className="mt-2 pb-[31px]">
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="h-28 w-28 rounded-full cursor-pointer"
                    onClick={handleProfileClick}
                  />
                  <input
                    type="file"
                    // className="hidden"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
                <h5 className="text-[18px] font-poppins text-[#545454] mb-[12px]">
                  {"Profile"}
                </h5>
                <h4 className="text-[24px] text-[#333333] font-poppins">
                  {"Admin"}
                </h4>
              </div>
            </div>

            {/* Profile Inputs */}
            <div className="col-span-9 space-y-[14px] w-full">
              <Form.Item
                className="font-roboto text-[18px]"
                label={
                  <span className="font-roboto text-[14px] text-black/90">
                    Name
                  </span>
                }
                name="name"
              >
                <Input
                  size="large"
                  className="h-[53px] rounded-lg"
                  style={{ border: "1px solid #DDDEE0" }}
                />
              </Form.Item>

              {/* <Form.Item
                className="font-roboto text-[18px]"
                label={
                  <span className="font-roboto text-[14px] text-black/90">
                    Email
                  </span>
                }
                name="email"
              >
                <Input
                  size="large"
                  className="h-[53px] rounded-lg"
                  style={{ border: "1px solid #DDDEE0" }}
                />
              </Form.Item> */}

              <Form.Item
                className="font-roboto text-[18px]"
                label={
                  <span className="font-roboto text-[14px] text-black/90">
                    Phone Number
                  </span>
                }
                name="phoneNumber"
              >
                <PhoneCountryInput value={phone} setPhoneNumber={setPhone} />
              </Form.Item>
              {/* Edit button */}
              <div className="py-4 px-8 flex justify-end items-center">
                {/* <h6 className="text-2xl text-white">Personal Information</h6> */}
                <Button
                  size="large"
                  htmlType="submit"
                  className="px-8 bg-[#90A4AE] text-white flex justify-center w-fit rounded-full font-roboto text-[20px] font-semibold"
                >
                  {isLoading ? (
                    <LoadingSpinner size={5} color="stroke-[#272b28]" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditMyProfile;
