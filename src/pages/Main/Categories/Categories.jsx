import general from '../../../assets/images/cat-general.png'
import dentist from '../../../assets/images/cat-dentist.png'
import eye from '../../../assets/images/cat-eye.png'
import cardiology from '../../../assets/images/cat-cardiology.png'
import kidney from '../../../assets/images/cat-kidney.png'
import { FaPlus } from 'react-icons/fa6'

const Categories = () => {
    return (
        <div>
            <div className='flex justify-end mb-[16px]'>
                <button className='w-[200px] h-[56px] bg-[#90A4AE] rounded-[8px] flex items-center justify-center gap-[8px] mr-20'>
                    <FaPlus size={15} className='text-white' />
                    <h1 className='text-white font-roboto text-[20px]'>Add Category</h1>
                </button>
            </div>
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
        </div>
    )
}

export default Categories