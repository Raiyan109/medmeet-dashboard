import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { FaAngleLeft } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Back button */}
      <div className="flex items-center gap-2 text-xl cursor-pointer" onClick={() => navigate(-1)}>
        <GoArrowLeft size={30} />
        <h1 className="font-roboto text-[24px]">Privacy Policy</h1>
      </div>

      <div className="max-w-[1026px]">
        <p className="font-roboto text-[18px] leading-[28px] pt-[21px] text-[#5C5C5C]">Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.</p>
      </div>
      <div className="max-w-[1026px]">
        <p className="font-roboto text-[18px] leading-[28px] pt-[21px] text-[#5C5C5C]">Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.</p>
      </div>

      <div className="w-full flex justify-end items-end pt-[60px]" onClick={(e) => navigate(`edit`)}>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="px-2 bg-[#90A4AE] text-[20px] font-roboto"
          style={{ height: '56px', width: '484px', borderRadius: '50px' }}
        >
          Edit
        </Button>
      </div>
    </>
  );
};

export default PrivacyPolicy;
