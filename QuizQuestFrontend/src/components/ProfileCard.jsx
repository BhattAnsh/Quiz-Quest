import React,{useState} from 'react'
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoMail,IoPerson } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";

function ProfileCard() {
    const [firstname, setFirstName] = useState('Bhumika');
    const[lastName,setLastName]=useState('Sharma')
    const [image, setImage] = useState("https://freesvg.org/img/publicdomainq-0006224bvmrqd.png");
    const[emailId,setEmailId]=useState("sharmabhmi@gmail.com")
    const[occupation,setOccupation]=useState("Student");
    const[currentStatus,setCurrentStatus]=useState("Building QuizQuest")
    const[bgColor,setBgColor]=useState('bg-yellow-100')
    const[noOfTrophy, setNoOfTrophy]=useState('4')
    const[profileImg,setProfileImg]=useState('/images/male.png')
  return (

    
<div className=" bg-[#081400] justify-center items-center">
         <div className='p-32 flex w-full justify-center items-center'>
         <div className="bg-[#1A1A19] w-1/3 mt-10 text-white flex flex-col  h-[33vw] rounded-md font-nunito">
         <div className={`w-full ${bgColor} flex justify-center relative bg-[#F2EED7]`}>
    <img src={image} width="110" />
    
    {/* New Rounded Div with Overlap */}
    <div className="absolute rounded-full w-28 h-28 bg-[#1A1A19] -bottom-12 left-4 border-2 border-[#1A1A19] ">
  {/* Profile Image */}
  <img src={profileImg} className="w-full h-full object-cover p-1 rounded-full" />

  {/* Green Status Indicator */}
  <div 
    className="absolute w-5 h-5 bg-green-700 rounded-full border-2 border-[#1A1A19] right-2 bottom-2 p-1"
      
  >
    
  </div>
</div>

    <div className="absolute  px-4 py-2 ml-2  bg-[#1a2713] -bottom-10 left-32 border-2 border-[#1A1A19] overflow-hidden rounded-xl ">
     <h1 className='text-xs flex gap-1 items-center text-gray-300 hover:text-white'><BsFillPlusCircleFill/><span >Add Status</span></h1>
    </div>
    <div className="absolute rounded-full w-4 h-4 bg-[#1a2713] -bottom-3 left-[9.5em]  border-2 border-[#1a2713] overflow-hidden">
    </div>
    <div className="absolute rounded-full w-2 h-2 bg-[#1a2713] bottom-1 left-[8.5em]  border-2 border-[#1a2713] overflow-hidden">
    </div>
  </div>

  <div className="p-3 flex flex-col gap-3 pt-14">
    <div className="flex justify-between">
      <h1 className="text-2xl space-x-2 font-bold">
        <span>{firstname}</span>
        <span>{lastName}</span>
      </h1>
      <p className="text-white mr-2 font-semibold">
        <span role="img" aria-label="trophy" >🏆</span>: {noOfTrophy}
      </p>
    </div>
    <div className='bg-[#1a2713] p-3 space-y-3 text-xs rounded-md h-[41vh]'>
    <div className='border-b-2 pb-1 border-[#273a1d]'>
    <h1 className='underline underline-offset-8'>About Me</h1>
    </div>
    <div className='flex flex-col gap-1' >
      <p className='flex items-center gap-1'><span className='text-gray-300'><IoMail/></span>{emailId}</p>
      <p className='flex items-center gap-1'><span className='text-gray-300'><IoPerson/></span>{occupation}</p>
      <p className='flex items-center gap-1'><span className='text-gray-300'><MdOutlineWork /></span>
      {currentStatus}</p>
    </div>
    </div>
    
  </div>
</div>


           </div>
         </div>
      
   

  )
}

export default ProfileCard