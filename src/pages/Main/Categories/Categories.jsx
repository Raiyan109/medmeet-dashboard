import general from '../../../assets/images/cat-general.png'
import dentist from '../../../assets/images/cat-dentist.png'
import eye from '../../../assets/images/cat-eye.png'
import cardiology from '../../../assets/images/cat-cardiology.png'
import kidney from '../../../assets/images/cat-kidney.png'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import DashboardModal from '../../../Components/DashboardModal'
import { GoArrowLeft } from "react-icons/go";
import { Button, Form, Input, Upload } from 'antd'
import { BsUpload } from 'react-icons/bs'

const Categories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const showModal = () => {
        setIsModalOpen(true);
        setModalData(data);
        console.log(isModalOpen);

    };

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
        <div>
            {/* Add Category button */}
            <div className='flex justify-end mb-[16px]' onClick={() => showModal()}>
                <button className='w-[200px] h-[56px] bg-[#90A4AE] rounded-[8px] flex items-center justify-center gap-[8px] mr-20'>
                    <FaPlus size={15} className='text-white' />
                    <h1 className='text-white font-roboto text-[20px]'>Add Category</h1>
                </button>
            </div>
            {/* Category cards */}
            <div className='grid grid-cols-6 gap-[23px]'>
                {Array(12).fill(0).map((ar, i) => (
                    <div key={i} className='w-[152px] h-[166px] rounded-[8px] bg-[#DDE3E6] flex flex-col items-center justify-center'>
                        {/* Image */}
                        <div className='bg-white w-[76px] h-[76px] rounded-[12px] flex items-center justify-center mb-[8px]'>
                            <img src={general} alt="" className='w-[48px] h-[48px] object-contain' />
                        </div>
                        <h1 className='font-roboto text-[18px] text-[#333333] mb-[12px]'>General</h1>
                        <div className='flex items-center justify-center gap-[8px]'>
                            <button className='w-[56px] h-[20px] font-roboto text-[12px] bg-transparent border border-[#545454] rounded-[2px]'>Delete</button>
                            <button className='w-[56px] h-[20px] font-roboto text-[12px] bg-[#90A4AE] text-white rounded-[2px]'>Edit</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dashboard Modal */}
            <DashboardModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                maxWidth="400px"
            // backgroundColor={'#E8EBF0'}
            >
                <div className='  h-[400px]'>
                    <div className='flex items-center gap-[8px] pt-[24px] pl-[28px]'>
                        <GoArrowLeft size={30} />
                        <h1 className='font-poppins text-[24px]'>Add new category</h1>
                    </div>

                    <div className='flex items-center justify-center'>
                        <div className='flex items-center justify-center mt-[40px]'>
                            {/* Form */}
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
                                <Form.Item
                                    label={<span className="font-roboto text-[14px] text-black/90">Category name</span>}
                                    name="category name"
                                    rules={[
                                        {
                                            type: "category name",
                                            message: "Please input a valid category name!",
                                        },
                                        {
                                            required: true,
                                            message: "Please input your category name!",
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder="Enter category name" style={{ width: '345px', height: '44px', borderRadius: '114px', border: '1px solid #DDDEE0', background: 'transparent', paddingLeft: '12px' }} />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <span className="font-roboto text-[14px] text-black/90">
                                            Upload Category Icon
                                        </span>
                                    }
                                    className="mt-6"
                                    name="categoryIcon"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please upload a category icon!",
                                        },
                                    ]}
                                >
                                    <Upload
                                        beforeUpload={() => false} // Prevent automatic upload
                                        showUploadList={false} // Hide default upload list
                                    >
                                        <button
                                            type="button"
                                            className="w-[345px] h-[44px] rounded-[114px] border border-[#DDDEE0] bg-transparent px-4 flex items-center justify-between text-gray-500 hover:bg-gray-100 transition"
                                        >
                                            Upload Icon
                                            <FaPlus className="text-gray-500 mr-2" />
                                        </button>
                                    </Upload>
                                </Form.Item>

                                <div className="w-full flex justify-center ">
                                    <Button
                                        type="primary"
                                        size="large"
                                        htmlType="submit"
                                        className="px-2 w-full bg-[#90A4AE]"
                                        style={{ width: '345px', height: '48px', borderRadius: '50px' }}
                                    >
                                        Add Category
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </DashboardModal>
        </div>
    )
}

export default Categories