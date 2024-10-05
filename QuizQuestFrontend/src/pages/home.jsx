// import image from '/images/Grid.svg'
function Home() {
  return (
    <div className="flex h-screen w-screen justify-center  "style={{ backgroundImage: `url('/images/bgImage.avif')`, backgroundRepeat:"no-repeat",backgroundSize:"cover",  backgroundPosition: 'center' }}>
     <div className="flex items-center justify-evenly w-11/12 ">
     <div className="flex flex-col m-8 gap-6" >
        <div className="">
          <h1 className="text-6xl font-bold text-[#FFFFFF] "><span className="text-[#CFF466]">QUIZ</span> QUEST</h1>
        </div>
        <div className="w-[22vw] ">
          <p className="leading-tight text-lg text-[#FFFFFF]">Where knowledge meets fun - build, join, and host quizzes with a community of quiz enthusiasts!</p>
        </div>
        <div className=" border-2 bg-[#CFF466] border-[#CFF466] rounded-lg py-1 text-center w-[9vw]">
          <button className=" text-[#1E5128] text-sm">Create Now</button>
        </div>
      </div>
      <div className="border border-[#7e9442] shadow-[1px_1px_20px_1px__rgba(207,244,102,1)]  w-6/12 rounded-xl overflow-hidden">
    <img src="/images/quiz.jpg" alt="Grid" className=""/>
</div>
     </div>
    </div>
  );
}

export default Home;
