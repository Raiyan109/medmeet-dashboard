import { FaArrowLeft, FaEye, FaLock } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

const ChangePassword = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        navigate(location.state ? location.state : "/");
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
        <div className="flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-lg mt-8 w-[600px] h-[570px]">
                <div className="flex flex-col  w-full  py-[40px] px-[24px]">
                    <div className="flex items-center gap-2 mb-[20px]">
                        <FaArrowLeft size={20} />
                        <h1 className="font-roboto text-[28px]">Set password</h1>
                    </div>
                    <h1 className="font-roboto text-[18px] text-[#545454]">Set the percentage for per appointment transaction</h1>
                    {/* Input Fields */}
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

                        {/* Enter Old Password */}
                        <Form.Item
                            label={<span className="font-roboto text-[18px] text-black/90">Enter Old Password</span>}
                            className="mt-6"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password size="large" placeholder="**********" style={{ width: '552px', height: '56px', borderRadius: '114px', border: '1px solid #DDDEE0', background: 'transparent', paddingLeft: '12px' }} />
                        </Form.Item>

                        {/* Set New Password */}
                        <Form.Item
                            label={<span className="font-roboto text-[18px] text-black/90">Set New Password</span>}
                            className="mt-6"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password size="large" placeholder="**********" style={{ width: '552px', height: '56px', borderRadius: '114px', border: '1px solid #DDDEE0', background: 'transparent', paddingLeft: '12px' }} />
                        </Form.Item>

                        {/* Re-Enter New Password */}
                        <Form.Item
                            label={<span className="font-roboto text-[18px] text-black/90">Re-Enter New Password</span>}
                            className="mt-6"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password size="large" placeholder="**********" style={{ width: '552px', height: '56px', borderRadius: '114px', border: '1px solid #DDDEE0', background: 'transparent', paddingLeft: '12px' }} />
                        </Form.Item>

                        <div className="w-full flex justify-center ">
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                className="px-2 w-full bg-[#90A4AE] text-[20px] font-roboto"
                                style={{ height: '56px', borderRadius: '50px' }}
                            >
                                Update Password
                            </Button>
                        </div>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default ChangePassword
