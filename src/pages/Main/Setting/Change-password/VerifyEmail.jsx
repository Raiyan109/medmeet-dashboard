import { FaArrowLeft, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import localStorageUtil, {
  getItemWithExpiration,
  setItemWithExpiration,
} from "../../../../utils/localstorageutils";
import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "../../../../features/user/authSlice";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { useState } from "react";

const ForgotPassword = () => {
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
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[600px] h-[370px]">
        <div className="flex flex-col  w-full  py-[40px] px-[24px]">
          <div className="flex items-center gap-2 mb-[20px]">
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft size={20} />
            </button>
            <h1 className="font-roboto text-[28px]">Forgot password</h1>
          </div>
          <h1 className="font-roboto text-[18px] text-[#545454]">
            Change your password
          </h1>
          {/* Input Fields */}
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

export default ForgotPassword;
