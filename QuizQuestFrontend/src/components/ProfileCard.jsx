import React,{useState} from 'react'

function ProfileCard() {
    const [firstname, setFirstName] = useState('Bhumika');
    const[lastName,setLastName]=useState('Sharma')
    const [image, setImage] = useState("https://freesvg.org/img/publicdomainq-0006224bvmrqd.png");
    const[emailId,setEmailId]=useState("sharmabhmi@gmail.com")
    const[occupation,setOccupation]=useState("Student");
    const[currentStatus,setCurrentStatus]=useState("Building QuizQuest")
    const[bgColor,setBgColor]=useState('bg-yellow-100')
    const[noOfTrophy, setNoOfTrophy]=useState('4')
  return (

    
<div className=" bg-black justify-center items-center">
         <div className='p-32 flex w-full justify-center items-center'>
         <div className="bg-[#2F3236]  w-1/3 mt-10 text-white flex flex-col gap-3 h-[500px]">
            <div className={`w-full ${bgColor} flex justify-center`}>
                <img src={image} width="110"/>
            </div>
           
  <div className='p-4 flex flex-col gap-3 '>
  <div className='flex justify-between'>
    <h1 className='text-2xl space-x-2 font-semibold'><span>{firstname}</span><span>{lastName}</span></h1>
<p className='text-white'><span>🏆</span>: {noOfTrophy} </p>
  </div>
  <div className='text-sm'>
    <p>{emailId}</p>
    <p>{occupation}</p>
    <p>{currentStatus}</p>
  </div>
  </div>
            </div>

           </div>
         </div>
      
   

  )
}

export default ProfileCard