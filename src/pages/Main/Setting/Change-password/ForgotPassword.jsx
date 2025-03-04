import { FaArrowLeft, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import {
  getItemWithExpiration,
  setItemWithExpiration,
} from "../../../../utils/localstorageutils";
import { useForgotPasswordMutation } from "../../../../features/user/authSlice";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const evMessage = getItemWithExpiration("evMessage");

  const [sendEmail, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    try {
      const res = await sendEmail(values).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        setItemWithExpiration("otpEmail", values?.uniqueId, 2);
        navigate("verify-email");
      }
    } catch (error) {
      toast.error(error.message);
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
          {/* Input Fields */}
          <Form
            name="normal_login"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="text-start"
          >
            {/* Enter email */}
            <Form.Item
              label={
                <span className="font-roboto text-[18px] text-black/90">
                  Enter Your E - Mail
                </span>
              }
              className="mt-6"
              name="uniqueId"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter e - mail"
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

export default ForgotPassword;
