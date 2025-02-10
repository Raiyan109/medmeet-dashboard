import { Button } from "antd";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";

// Import 'size' style attributor
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["14px", "16px", "18px"]; // Custom font sizes
Quill.register(Size, true);

const modules = {
  toolbar: {
    container: [
      [{ size: ["14px", "16px", "18px"] }], // Use whitelisted sizes
      [{ color: [] }], // Text color dropdown
      ["bold", "italic", "underline", 'strike'], // Formatting options
      [{ align: [] }],
      ["image", "link"],
      [{ list: 'bullet' }],
    ],
    handlers: {
      align: function (value) {
        this.quill.format('align', value);
      },
    },
  },
};

const formats = [
  "size", // Custom font sizes
  "color",
  "align",
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  "list",
];

const EditPrivacyPolicy = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const placeholder = "Enter your update privacy policy...";
  console.log(content);
  return (
    <>
      {/* Back button */}
      <div className="flex items-center gap-2 text-xl cursor-pointer" onClick={() => navigate(-1)}>
        <GoArrowLeft size={30} />
        <h1 className="font-roboto text-[24px]">Edit Privacy Policy</h1>
      </div>
      <div className="rounded-lg py-4  mt-8 bg-[#DDE3E6] h-[575px]">
        <div className="space-y-[24px] min-h-[83vh]  rounded-2xl">

          <div className="w-full px-6">
            <div className="h-full  rounded-md">
              <div className="ql-toolbar-container h-56">
                {/* <div id="toolbar">
                      <span className="ql-formats">
    
                        <button className="ql-align" value="left">
                          Left
                        </button>
                        <button className="ql-align" value="center">
                          Center
                        </button>
                        <button className="ql-align" value="right">
                          Right
                        </button>
                        <button className="ql-align" value="justify">
                          Justify
                        </button>
                      </span>
    
                    </div> */}
                <ReactQuill
                  placeholder="Enter your update terms & conditions..."
                  theme="snow"
                  value={content}
                  onChange={(value) => setContent(value)}
                  modules={modules}
                  formats={formats}
                  className="custom-quill-editor"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-end pt-[60px]">
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="px-2 bg-[#90A4AE] text-[20px] font-roboto"
          style={{ height: '56px', width: '484px', borderRadius: '50px' }}
        >
          Update
        </Button>
      </div>
    </>
  );
};

export default EditPrivacyPolicy;
