import { FaArrowLeft, FaEye, FaLock } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useChangePasswordMutation } from "../../../../features/user/authSlice";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onFinish = async (values) => {
    try {
      const res = await changePassword(values).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log("Error while changing password");
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[600px] h-[670px]">
        <div className="flex flex-col  w-full  py-[40px] px-[24px]">
          <div className="flex items-center gap-2 mb-[20px]">
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft size={20} />
            </button>
            <h1 className="font-roboto text-[28px]">Set password</h1>
          </div>
          <h1 className="font-roboto text-[18px] text-[#545454]">
            Change your password
          </h1>
          {/* Input Fields */}
          <Form
            name="normal_login"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="text-start"
          >
            {/* Enter Old Password */}
            <Form.Item
              label={
                <span className="font-roboto text-[18px] text-black/90">
                  Enter Old Password
                </span>
              }
              className="mt-6"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
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

            {/* Set New Password */}
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

            <Link to={"forgot-password"} className="hover:text-cyan-600">
              Forgot password?
            </Link>

            <div className="w-full flex justify-center mt-6">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full bg-[#90A4AE] text-[20px] font-roboto"
                style={{ height: "56px", borderRadius: "50px" }}
              >
                {isLoading ? <LoadingSpinner size={5} /> : "Update Password"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
