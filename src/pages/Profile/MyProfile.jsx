import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import dashProfile from "../../assets/images/dashboard-profile.png";
import { FiEdit } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import PhoneCountryInput from "../../Components/PhoneCountryInput";
import PageHeading from "../../Components/PageHeading";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import { FaAngleLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";


const MyProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profileData = {
    name: "Jane Kooper",
    email: "enrique@gmail.com",
    phone: "+880 1550597212",
    profile: dashProfile,
  };
  // console.log(code);
  return (
    <>
      <div className="flex justify-between items-center">
        {/* Back button */}
        <div className="flex items-center gap-2 text-xl cursor-pointer" onClick={() => navigate(-1)}>
          <GoArrowLeft size={30} />
          <h1 className="font-roboto text-[24px]">Personal information</h1>
        </div>

        {/* Edit button */}
        <div className="py-4 px-8 flex justify-end items-center">
          {/* <h6 className="text-2xl text-white">Personal Information</h6> */}
          <Button
            onClick={(e) => navigate(`edit`)}
            size="large"
            type="default"
            className="px-8 bg-[#90A4AE] text-white rounded-full font-semibold"
          >
            <FaRegEdit />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="pt-[58px]">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <Form
            name="basic"
            layout="vertical"
            className="w-full flex gap-x-[24px]"
            autoComplete="off"
            initialValues={{
              name: profileData.name,
              email: profileData.email,
            }}
          >
            {/* Profile Image */}
            <div className="col-span-3 space-y-6 ">
              <div className="min-h-[360px] w-[300px] rounded-xl flex flex-col items-center justify-center p-8 bg-[#DDE3E6]">
                <div className="mt-2 pb-[31px]">
                  <img
                    src={dashProfile}
                    alt=""
                    className="h-28 w-28 rounded-full"
                  />
                </div>
                <h5 className="text-[18px] font-poppins text-[#545454] mb-[12px]">{"Profile"}</h5>
                <h4 className="text-[24px] text-[#333333] font-poppins">{"Admin"}</h4>
              </div>

            </div>

            {/* Profile Inputs */}
            <div className="col-span-9 space-y-[14px] w-full">
              <Form.Item
                className="font-roboto text-[18px]"
                label={<span className="font-roboto text-[14px] text-black/90">Name</span>}
                name="name"
              >
                <Input
                  readOnly
                  size="large"
                  className="h-[53px] rounded-lg"
                  style={{ border: '1px solid #DDDEE0' }}
                />
              </Form.Item>
              <Form.Item
                className="font-roboto text-[18px]"
                label={<span className="font-roboto text-[14px] text-black/90">Email</span>}
                name="email"
              >
                <Input
                  readOnly
                  size="large"
                  className="h-[53px] rounded-lg"
                  style={{ border: '1px solid #DDDEE0' }}
                />
              </Form.Item>

              <Form.Item
                className="font-roboto text-[18px]"
                label={<span className="font-roboto text-[14px] text-black/90">Phone Number</span>}
                name="phone"
              >
                <PhoneCountryInput />
              </Form.Item>
            </div>
          </Form>

          <PasswordChangeModalForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>

    </>
  );
};

export default MyProfile;
