import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../assets/images/verify.png";
import PageHeading from "../../Components/PageHeading";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import logo from '../../assets/images/logo1.png'
// import { useVerifyEmailMutation } from "../../redux/features/Auth/authApi";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [otp, setOtp] = useState("");
  // const [mutation, { isLoading }] = useVerifyEmailMutation();
  const onFinish = async (values) => {
    if (isNaN(otp) || otp.length < 4) {
      return Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please enter 4 digits OTP number!!.",
      });
    }
    navigate(`/auth/reset-password`);
    // try {
    //   const response = await mutation({
    //     email: id,
    //     code: Number(otp),
    //   });
    //   // console.log(response);
    //   if (response?.data?.statusCode == 200) {
    //     localStorage.setItem("verify-token", response?.data?.data);
    //     navigate(`/auth/reset-password`);
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "failed!",
    //       text:
    //         response?.data?.message ||
    //         response?.error?.data?.message ||
    //         "Something went wrong. Please try again later.",
    //     });
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     // title: "Login Failed , Try Again...",
    //     text: "Something went wrong. Please try again later.",
    //   });
    // }
  };
  return (
    <div className="bg-[#E8EBF0] w-[448px] rounded-[16px]">

      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[64px] lg:px-[44px] space-y-5">
          <div className="flex items-center justify-center pt-[34px]">
            <img src={logo} alt="" className="w-[182px] h-[150px] object-contain" />
          </div>
          <div className="flex flex-col items-center">
            <PageHeading
              backPath={"/auth/forgot-password"}
              title={"Verify Email"}
              disbaledBackBtn={false}
            />
            <p className="text-center font-roboto text-[14px] leading-[16.41px] text-[#5C5C5C] pt-[24px] max-w-sm lg:max-w-lg">
              Please check your email. We have sent a code to contact @gmail.com
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div className="py-3 text-2xl font-semibold flex justify-center">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputStyle={{
                  height: "44px",
                  width: "76px",
                  marginRight: "18.67px",
                  background: "transparent",
                  border: "1px solid #DDDEE0",
                  // marginRight: "auto",
                  outline: "none",
                  borderRadius: "57px",
                  color: "black",
                }}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div className="w-full flex justify-center pt-5">
              <Button
                // disabled={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full bg-[#90A4AE] font-roboto text-[18px]"
                style={{ width: '345px', height: '48px', borderRadius: '50px' }}
              >
                Verify Code
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
