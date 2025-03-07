import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../assets/images/verify.png";
import PageHeading from "../../Components/PageHeading";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import logo from "../../assets/images/logo1.png";
import { useVerifyEmailMutation } from "../../features/user/authSlice";
import localStorageUtil from "../../utils/localstorageutils";
import LoadingSpinner from "../../Components/LoadingSpinner";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const emailForOtpVerification = localStorageUtil.getItem("otpEmail");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleOtpChange = (text) => {
    setOtp(text);
  };

  const onFinish = async (values) => {
    if (isNaN(otp) || otp.length < 4) {
      return Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please enter 4 digits OTP number!!.",
      });
    }

    try {
      if (!emailForOtpVerification) {
        toast.error("Please give your email again from Frogot Password Page!");
        return;
      }
      const verificationData = {
        ...values,
        oneTimeCode: parseInt(otp),
        uniqueId: emailForOtpVerification.value,
      };

      const response = await verifyEmail(verificationData).unwrap();
      if (response?.success) {
        localStorageUtil.setItem("resetPassToken", response?.data);
        toast.success("Email verified successfully!");
        localStorageUtil.removeItem("rpev");
        localStorageUtil.setItem("rpev", true);
        navigate("/auth/reset-password"); // Navigate to reset-password page on success
      } else {
        toast.error(response?.message || "Verification failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className="bg-[#E8EBF0] w-[600px] rounded-[16px]">
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[64px] lg:px-[44px] space-y-5">
          <div className="flex items-center justify-center pt-[34px]">
            <img
              src={logo}
              alt=""
              className="w-[182px] h-[150px] object-contain"
            />
          </div>
          <div className="flex flex-col items-center">
            <PageHeading
              backPath={"/auth/forgot-password"}
              title={"Verify Email"}
              disbaledBackBtn={false}
            />
            <p className="text-center font-roboto text-[14px] leading-[16.41px] text-[#5C5C5C] pt-[24px] max-w-sm lg:max-w-lg">
              Please check your email. We have sent a code to{" "}
              <span className="text-yellow-500">
                {emailForOtpVerification.value}
              </span>
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
            <Form.Item name="oneTimeCode">
              <div className="py-3 text-2xl font-semibold flex justify-center">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputStyle={{
                    height: "44px",
                    width: "70px",
                    marginRight: "18.67px",
                    background: "transparent",
                    border: "1px solid black",
                    outline: "none",
                    borderRadius: "57px",
                    color: "black",
                  }}
                  renderSeparator={<span> </span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </Form.Item>

            <div className="w-full flex justify-center pt-5">
              <Button
                disabled={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full bg-[#90A4AE] font-roboto text-[18px]"
                style={{ width: "345px", height: "48px", borderRadius: "50px" }}
              >
                {isLoading ? (
                  <LoadingSpinner color="stroke-[#2e332f]" size={5} />
                ) : (
                  "Verify Code"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
