import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import { useLogInMutation } from "../../features/user/authSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import localStorageUtil from "../../utils/localstorageutils";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/LoadingSpinner";
// import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [logInUser, { isLoading }] = useLogInMutation();

  const onFinish = async (values) => {
    try {
      const res = await logInUser(values);
      if (res?.data?.success && res?.data?.data?.accessToken) {
        let userProfile = res?.data?.data?.user;
        if (userProfile?.password) {
          const { password, ...rest } = userProfile;
          localStorageUtil.setItem("user_profile", rest);
          localStorageUtil.setItem("rpev", false); // rpev: reset password email verification
          dispatch(setUser(rest));
        } else {
          localStorageUtil.setItem("user_profile", userProfile);
          localStorageUtil.setItem("rpev", false); // rpev: reset password email verification
          dispatch(setUser(userProfile));
        }
        toast.success("Login Successfull.");
        navigate("/");
      } else if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="bg-[#E8EBF0] w-[448px] h-[636px] rounded-[16px]">
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] px-[51.5px]">
          <div className="flex items-center justify-center pt-[34px]">
            <img
              src={logo}
              alt="logo"
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
              name="uniqueId"
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
              {/* <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="font-poppins text-[#545454] text-[16px]">
                  Remember me
                </Checkbox>
              </Form.Item> */}
              <Form.Item>
                <p
                  className="text-[16px] text-[#333333] font-poppins"
                  onClick={() => navigate("/auth/forgot-password")}
                >
                  Forget password?
                </p>
              </Form.Item>
            </div>
            <div className="w-full flex justify-center ">
              <Button
                disabled={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full bg-[#90A4AE]"
                style={{ width: "345px", height: "48px", borderRadius: "50px" }}
              >
                {isLoading ? (
                  <LoadingSpinner color="stroke-[#333333]" size={5} />
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
