import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useGetSettingsQuery } from "../../features/api/apiSlice";
import LoadingSpinner from "../../Components/LoadingSpinner";
import DomPurify from "dompurify";

const TermsConditions = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetSettingsQuery();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner size={12} color="stroke-[#272b28]" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return <p className="text-red-500">Something went wrong!</p>;
  }

  return (
    <>
      {/* Back button */}
      <div
        className="flex items-center gap-2 text-xl cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <GoArrowLeft size={30} />
        <h1 className="font-roboto text-[24px]">Terms & Condition</h1>
      </div>

      <div className="max-w-[1026px]">
        <p
          className="font-roboto text-[18px] leading-[28px] pt-[21px] text-[#5C5C5C]"
          dangerouslySetInnerHTML={{
            __html: DomPurify.sanitize(
              data?.data?.termsAndConditions || "No Terms & Condition found!"
            ),
          }}
        ></p>
      </div>

      <div
        className="w-full flex justify-end items-end pt-[60px]"
        onClick={(e) => navigate(`edit`)}
      >
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="px-2 bg-[#90A4AE] text-[20px] font-roboto"
          style={{ height: "56px", width: "484px", borderRadius: "50px" }}
        >
          Edit
        </Button>
      </div>
    </>
  );
};

export default TermsConditions;
