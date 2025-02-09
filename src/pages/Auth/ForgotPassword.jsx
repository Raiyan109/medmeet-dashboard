import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/forgot.png";
import PageHeading from "../../Components/PageHeading";
import logo from '../../assets/images/logo1.png'
// import { useForgotPasswordMutation } from "../../redux/features/Auth/authApi";
// import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();
  // const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onFinish = async (values) => {
    navigate(`/auth/verify-email`);
    // try {
    //   const response = await forgotPassword(values);
    //   // console.log(response);
    //   if (response?.data?.statusCode == 200) {
    //     navigate(`/auth/verify-email/${values.email}`);
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Failed!!",
    //       text:
    //         response?.data?.message ||
    //         response?.error?.data?.message ||
    //         "Something went wrong. Please try again later.",
    //     });
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Failed!!",
    //     text: "Something went wrong. Please try again later.",
    //   });
    // }
  };
  return (
    <div className="bg-[#E8EBF0] w-[448px] h-[636px] rounded-[16px]">

      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[64px] px-[51.5px] space-y-8">
          <div className="flex items-center justify-center pt-[34px]">
            <img src={logo} alt="" className="w-[182px] h-[150px] object-contain" />
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading backPath={"/auth"} title={"Forgot Password"} disbaledBackBtn={false} />
            <p className="font-roboto text-[14px] leading-[16.41px] text-center pt-[24px] text-[#545454]">
              Please enter your email address to reset
              your password.
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
            <Form.Item
              label={<span className="font-roboto text-[14px] text-black/90">E mail</span>}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input a valid Email!",
                },
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input size="large" placeholder="example@gmail.com" style={{ width: '345px', height: '44px', borderRadius: '114px', border: '1px solid #DDDEE0', background: 'transparent', paddingLeft: '12px' }} />
            </Form.Item>

            <div className="w-full flex justify-center pt-5">
              <Button
                // disabled={isLoading}
                type="primary"

                size="large"
                htmlType="submit"
                className="px-2 w-full bg-[#90A4AE] font-roboto text-[18px] font-medium"
                style={{ width: '345px', height: '48px', borderRadius: '50px' }}
              >
                Send OTP
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
