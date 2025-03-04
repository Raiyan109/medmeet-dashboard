import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useResetPassMutation } from "../../../../features/user/authSlice";
import localStorageUtil from "../../../../utils/localstorageutils";
import PageHeading from "../../../../Components/PageHeading";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { FaArrowLeft } from "react-icons/fa6";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPassMutation();
  const resetPassToken = localStorageUtil.getItem("resetPassToken");

  const onFinish = async (values) => {
    try {
      const response = await resetPassword({
        values,
        resetToken: resetPassToken,
      }).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Password reset successful!");
        localStorageUtil.removeItem("resetPassToken");
        localStorageUtil.removeItem("otpEmail");
        localStorageUtil.removeItem("rpev");
        navigate("/settings");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[600px] h-[470px]">
        <div className="flex flex-col  w-full  py-[40px] px-[24px]">
          <div className="flex items-center gap-2 mb-[20px]">
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft size={20} />
            </button>
            <h1 className="font-roboto text-[28px]">Reset password</h1>
          </div>
          <h1 className="font-roboto text-[18px] text-[#545454]">
            Change your password
          </h1>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            requiredMark={false}
            onFinish={onFinish}
            className="text-start"
          >
            <Form.Item
              label={
                <span className="font-roboto text-[18px] text-black/90">
                  Set New Password
                </span>
              }
              className="mt-6"
              name="newPassword"
              dependencies={["currentPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("currentPassword") !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "New password cannot be the same as the old password!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="**********"
                style={{
                  width: "552px",
                  height: "56px",
                  borderRadius: "114px",
                  border: "1px solid #DDDEE0",
                  background: "transparent",
                  paddingLeft: "12px",
                }}
              />
            </Form.Item>

            {/* Re-Enter New Password */}
            <Form.Item
              label={
                <span className="font-roboto text-[18px] text-black/90">
                  Re-Enter New Password
                </span>
              }
              className="mt-6"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="**********"
                style={{
                  width: "552px",
                  height: "56px",
                  borderRadius: "114px",
                  border: "1px solid #DDDEE0",
                  background: "transparent",
                  paddingLeft: "12px",
                }}
              />
            </Form.Item>
            <div className="w-full flex justify-center mt-6">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full bg-[#90A4AE] text-[20px] font-roboto"
                style={{ height: "56px", borderRadius: "50px" }}
              >
                {isLoading ? (
                  <LoadingSpinner color="stroke-[#2e332f]" size={5} />
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
