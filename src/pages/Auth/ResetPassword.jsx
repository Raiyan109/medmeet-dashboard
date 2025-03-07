import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import logo from "../../assets/images/logo1.png";
import { useResetPassMutation } from "../../features/user/authSlice";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/LoadingSpinner";
import localStorageUtil from "../../utils/localstorageutils";

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
        navigate("/auth/sign-in");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-[#E8EBF0] w-[448px] rounded-[16px]">
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] px-[51.5px]">
          <div className="flex items-center justify-center pt-[34px]">
            <img
              src={logo}
              alt=""
              className="w-[182px] h-[150px] object-contain"
            />
          </div>
          <div className="flex flex-col items-center">
            <PageHeading
              backPath={-1}
              title={"Reset password"}
              disbaledBackBtn={false}
            />
            <p className="text-center font-roboto text-[14px] leading-[16.41px] text-[#5C5C5C] pt-[24px] max-w-sm lg:max-w-lg">
              Your password must be 8-10 character long.
            </p>
          </div>
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
                <span className="font-roboto text-[14px] text-black/90">
                  Password
                </span>
              }
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input new password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="**********"
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
            <Form.Item
              label={
                <span className="font-roboto text-[14px] text-black/90">
                  Confirm New Password
                </span>
              }
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please Re-Enter the password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
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
                  width: "345px",
                  height: "44px",
                  borderRadius: "114px",
                  border: "1px solid #DDDEE0",
                  background: "transparent",
                  paddingLeft: "12px",
                }}
              />
            </Form.Item>
            <div className="w-full flex justify-center pt-4 ">
              <Button
                // disabled={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full bg-[#90A4AE]"
                style={{ width: "345px", height: "48px", borderRadius: "50px" }}
              >
                {isLoading ? (
                  <LoadingSpinner color="stroke-[#2e332f]" size={5} />
                ) : (
                  "Reset Password"
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
