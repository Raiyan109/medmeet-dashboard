import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/reset-pass.png";
// import ComponentContainer from "../../Components/ComponentContainer";
import PageHeading from "../../Components/PageHeading";
import logo from '../../assets/images/logo1.png'
// import { useChangePasswordMutation } from "../../redux/features/Auth/authApi";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { setUser } from "../../redux/features/Auth/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
  // const [mutation, { isLoading }] = useChangePasswordMutation();


  const onFinish = async (values) => {
    navigate("/auth");
    // try {
    //   const response = await mutation({
    //     password: values.newPassword,
    //     // token: token,
    //   });
    //   if (response?.data?.statusCode == 200) {
    //     localStorage.setItem("verify-token", null);
    //     dispatch(
    //       setUser({
    //         user: null,
    //         token: null,
    //       })
    //     );
    //     navigate("/auth");
    //     Swal.fire({
    //       icon: "success",
    //       title: response?.data?.message,
    //       showConfirmButton: false,
    //       timer: 1000,
    //     });
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
    //     title: "Failed !!",
    //     text: "Something went wrong.",
    //   });
    // }
  };
  return (
    <div className="bg-[#E8EBF0] w-[448px] rounded-[16px]">

      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] px-[51.5px]">
          <div className="flex items-center justify-center pt-[34px]">
            <img src={logo} alt="" className="w-[182px] h-[150px] object-contain" />
          </div>
          <div className="flex flex-col items-center">
            <PageHeading backPath={-1} title={"Reset password"} disbaledBackBtn={false} />
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
              label={<span className="font-roboto text-[14px] text-black/90">Password</span>}
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input new password!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="**********" style={{ width: '345px', height: '44px', borderRadius: '114px', border: '1px solid #DDDEE0', background: 'transparent', paddingLeft: '12px' }} />
            </Form.Item>
            <Form.Item
              label={<span className="font-roboto text-[14px] text-black/90">Confirm New Password</span>}
              name="rePassword"
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
              <Input.Password size="large" placeholder="**********" style={{ width: '345px', height: '44px', borderRadius: '114px', border: '1px solid #DDDEE0', background: 'transparent', paddingLeft: '12px' }} />
            </Form.Item>
            <div className="w-full flex justify-center pt-4 ">
              <Button
                // disabled={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full bg-[#90A4AE]"
                style={{ width: '345px', height: '48px', borderRadius: '50px' }}
              >
                Reset Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
