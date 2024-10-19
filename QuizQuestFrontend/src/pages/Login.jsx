import { useState } from 'react';
import svgImage from '../images/right-img.svg';
import googleImg from '../images/google-img.jpg';
import {  useNavigate } from 'react-router-dom';
import { loginAPI } from '@/api/apiRequests';
import { Input } from '@/components/ui/input';

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAPI({username:formData.name, email: formData.email, password: formData.password});

      if (!response) {
        throw new Error('Login failed');
      }

      console.log('Login successful:', response);
      sessionStorage.setItem('accessToken', response.accessToken);
      navigate("/");
      
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

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

            <p className="text-center text-sm text-[whitesmoke]">OR</p>

            <form className="grid gap-y-[28px]" onSubmit={handleSubmit}>
              {/* <div>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="outline-none bg-[#0E1C1B] border-[1px] border-[#aad1a9] w-[300px] h-[45px] rounded-lg pl-[13px] placeholder-[#aad1a9]"
                  placeholder="Name"
                  required
                />
              </div> */}
              <div>
                {/* <label htmlFor="Email">Email:</label> */}
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="outline-none bg-[#0E1C1B] border-[1px] border-[#aad1a9] w-[300px] h-[45px] rounded-lg pl-[13px] placeholder-[#aad1a9]"
                  required
                />
              </div>
              <div>
                {/* <label htmlFor="password">Password:</label> */}
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="outline-none bg-[#0E1C1B] border-[1px] border-[#aad1a9] w-[300px] h-[45px] rounded-lg pl-[13px] placeholder-[#aad1a9]"
                  required
                />
              </div>
              <button type="submit" className="bg-[#aad1a9] rounded-lg h-[35px] text-[#2b3d2a] font-medium">Login</button>
            </form>

            {/* <p className="text-center text-[whitesmoke]">OR</p> */}
            <p className="text-center text-[whitesmoke]">
              Don't have an account?
              <span className="text-[#aad1a9] cursor-pointer"> SignUp</span>
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

export default Login;
