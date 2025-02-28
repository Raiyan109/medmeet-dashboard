import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../../assets/images/reset-pass.png";
import logo from "../../assets/images/logo1.png";
// import { useDispatch } from "react-redux";
// import { usePostLoginMutation } from "../../redux/features/Auth/authApi";
// import { setUser } from "../../redux/features/Auth/authSlice";
// import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useDispatch();
  // const [setData, { isLoading }] = usePostLoginMutation();
  const onFinish = async (values) => {
    console.log(values);
    // navigate(location.state ? location.state : "/");
    // try {
    //   const response = await setData(values);
    //   // console.log(response);
    //   if (response?.data?.statusCode == 200) {
    //     if (response?.data?.data?.user?.role === "ADMIN") {
    //       localStorage.setItem("token", response?.data?.data?.token);
    //       dispatch(
    //         setUser({
    //           user: response?.data?.data?.user,
    //           token: response?.data?.data?.token,
    //         })
    //       );
    //       // navigate(from, { replace: true });
    //       navigate(location.state ? location.state : "/");
    //     } else {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Login Failed!!",
    //         text: "You are not a Valid",
    //       });
    //     }
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title:
    //         response?.data?.message ||
    //         response?.error?.data?.message ||
    //         "Login Failed!!",
    //       text: "Something went wrong. Please try again later.",
    //     });
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Login Failed!!",
    //     text: "Something went wrong. Please try again later.",
    //   });
    // }
  };
  return (
    <div className="bg-[#E8EBF0] w-[448px] h-[636px] rounded-[16px]">
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] px-[51.5px]">
          <div className="flex items-center justify-center pt-[34px]">
            <img
              src={logo}
              alt=""
              className="w-[182px] h-[150px] object-contain"
            />
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            requiredMark={false}
            className="text-start"
          >
            <h1 className="text-[24px] text-center font-roboto pt-[24px] font-medium">
              Sign In
            </h1>

            {/* UserName */}
            <Form.Item
              label={
                <span className="font-roboto text-[14px] text-black/90">
                  Username
                </span>
              }
              name="name"
              rules={[
                {
                  type: "name",
                  message: "Please input a valid User Name!",
                },
                {
                  required: true,
                  message: "Please input your User Name!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="username"
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

            {/* Password */}
            <Form.Item
              label={
                <span className="font-roboto text-[14px] text-black/90">
                  Password
                </span>
              }
              className="mt-6"
              name="password"
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
                  width: "345px",
                  height: "44px",
                  borderRadius: "114px",
                  border: "1px solid #DDDEE0",
                  background: "transparent",
                  paddingLeft: "12px",
                }}
              />
            </Form.Item>

            {/* Checkbox */}
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="font-poppins text-[#545454] text-[16px]">
                  Remember me
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <button
                  className="text-[16px] text-[#333333] font-poppins"
                  onClick={() => navigate("/auth/forgot-password")}
                >
                  Forget password?
                </button>
                {/* <Button
                  onClick={() => navigate("/auth/forgot-password")}
                  type="link"
                  className="text-[16px] text-[#333333] font-poppins"
                >
                  Forget password?
                </Button> */}
              </Form.Item>
            </div>
            <div className="w-full flex justify-center ">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full bg-[#90A4AE]"
                style={{ width: "345px", height: "48px", borderRadius: "50px" }}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
