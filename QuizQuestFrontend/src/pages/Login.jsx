import svgImage from '../images/right-img.svg';
import googleImg from '../images/google-img.jpg';

function LoginPage() {
  return (
    <>
      <div className="flex flexbox h-screen  justify-center  bg-[#0E1C1B] text-[#aad1a9] py-[10vh]">
        <div className="flex flexbox items-center justify-center gap-x-[100px] border-[1px] border-[#1a2224] px-[100px] w-[1000px] rounded-3xl sphere-card">
          <div className="grid gap-y-[20px]">
            <div className="border-solid w-[300px] h-[45px] text-l text-center cursor-pointer flex justify-center text-center">
              <div className="text-center justify-center px-1 py-[4px] w-[250px] h-[45px] border-[1px] border-[#aad1a9] rounded-3xl gap-x-[10px] relative">
                <img className="h-[35px] rounded-[162px] w-[38px] object-cover" src={googleImg}></img>
                <span className="mt-[5px] w-[200px] absolute top-[3px] left-[30px]">Continue with Google</span>
              </div>
            </div>

            <p className="text-center text-[whitesmoke]">OR</p>

            <form className="grid gap-y-[28px]">
              <div>
                {/* <label htmlFor="name">Name:</label> */}
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="outline-none bg-[#0E1C1B] border-[1px] border-[#aad1a9] w-[300px] h-[45px] rounded-lg pl-[13px] placeholder-[#aad1a9]"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                {/* <label htmlFor="Email">Email:</label> */}
                <input
                  type="email"
                  id="name"
                  name="Email"
                  placeholder="Email"
                  // value= "value1"
                  // onChange={handleChange}
                  className="outline-none bg-[#0E1C1B] border-[1px] border-[#aad1a9] w-[300px] h-[45px] rounded-lg pl-[13px] placeholder-[#aad1a9]"
                  required
                />
              </div>
              <div>
                {/* <label htmlFor="password">Password:</label> */}
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="outline-none bg-[#0E1C1B] border-[1px] border-[#aad1a9] w-[300px] h-[45px] rounded-lg pl-[13px] placeholder-[#aad1a9]"
                  required
                />
              </div>
              <button type="submit" className="bg-[#aad1a9] rounded-lg h-[35px] text-[#2b3d2a] font-medium">Sign-up</button>
            </form>

            <p className="text-center text-[whitesmoke]">OR</p>
            <p className="text-center text-[whitesmoke]">
              Already have an account?
              <span className="text-[#aad1a9] cursor-pointer"> SignIn</span>
            </p>
          </div>

          <div>
            <img src={svgImage} className=''></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
