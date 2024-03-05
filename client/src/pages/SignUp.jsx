import React,{useState} from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from '../https/index'

import { motion } from 'framer-motion';
const SignUp = () => {
  const[toggle,setToggle]=useState(false);
  const[open,setOpen]=useState(false);
  const[email, setEmail] = useState("");
  const[name, setName] = useState("");
  const[password, setPassword] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let errorMessage = "";

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(newEmail);
    // const isValid = validator.isEmail(newEmail);
    setIsValidEmail(isValid);
};

  const handleSignupSubmit = async(e) => {
    console.log("in handlesubmit for signup");
    e.preventDefault();

    //check if all fields are filled
    if(email === ""){
      errorMessage = "Email is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }
    
    if(name === ""){
      errorMessage = "Name is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(password === ""){
      errorMessage = "Password is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(confirmPassword === ""){
      errorMessage = "Confirm Password is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(password !== confirmPassword){
      errorMessage = "Password does not match.";
      console.log(errorMessage);
      toast.error(errorMessage, toastOptions);
      return;
    }

    setIsLoading(true);
    try {
      const data = {
        email: email,
        name : name,
        password: password,
      };

      console.log("calling api")
      const response = await Register(data);
      console.log(response)
      // setUserRes(response.data);

      if(response.status !== 200) {
        errorMessage = response.data.message || 'Server Error';
        toast.error(errorMessage, toastOptions);
        return;
      } else {
        notifySuccess("Contact Us message sent to your email id");
      }

      setEmail("");
      setName("");

  } catch(error) {
    // errorMessage = "Failed to create an account.";
    toast.error(error, toastOptions);
    }
    setIsLoading(false);

    // Reload the page
    setTimeout(() => {
      window.location.reload();
    }, 5000); // Reload after 3 seconds

    // Handle form submission
    console.log('Form submitted!');
  };

  // login
  const handleLoginSubmit = async(e) => {
    console.log("in handlesubmit for login");
    e.preventDefault();

    //check if all fields are filled   
    if(email === ""){
        errorMessage = "Name is required.";
        toast.error(errorMessage, toastOptions);
        return;
    }

    if(password === ""){
      errorMessage = "Password is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    setIsLoading(true);
    try {
      const data = {
        email : email,
        password: password,
      };

      console.log("calling api")
      const response = await Register(data);
      console.log(response)
      // setUserRes(response.data);

      if(response.status !== 200) {
        errorMessage = response.data.message || 'Server Error';
        toast.error(errorMessage, toastOptions);
        return;
      } else {
        notifySuccess("Contact Us message sent to your email id");
      }

      setEmail("");
      setName("");

  } catch(error) {
    // errorMessage = "Failed to create an account.";
    toast.error(error, toastOptions);
    }
    setIsLoading(false);

    // Reload the page
    setTimeout(() => {
      window.location.reload();
    }, 5000); // Reload after 3 seconds

    // Handle form submission
    console.log('Form submitted!');
  };

  return (
    <div className=''>
  <motion.div
  className=" flex flex-row bg-gradient-to-b from-red-500 via-red-900 to-black"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
  >
    
    <div className="w-[500px] h-screen bg-gradient-to-b from-red-500 via-red-900 to-black">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="text-[40px] flex flex-row items-start gap-1 text-white relative font-serif font-bold mb-4"
    >
      <motion.div
        className="w-[70px] mt-[270px] ml-[80px] h-[70px] rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={'/images/logo_condense.jpg'}
          alt="Your Image Alt Text"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div className="mt-[275px] ml-2 ">CONDENSE</motion.div>
    </motion.h1>
  </div>


<div className="flex justify-center items-center flex-1 w-[1000px] border-4 border-blue-100 rounded-l-3xl bg-white" >

       <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[440px]  bg-white border   items-center rounded-2xl border-black shadow-md px-10 pb-8 pt-6 mb-4 ml-[150px] shadow-lg"
    >
        <div className='flex flex-row mb-5 justify-center items-center text-black text-semibold text-[23px] font-serif font-medium'>
              <div
                className={`px-5 py-1 border ${
                  toggle ? 'border-gray-200' : 'border-black'
                } cursor-pointer`}
                onClick={() => setToggle(false)}
              >
                Login
              </div>
              <div
                className={`px-5 py-1 border ${
                  toggle ? 'border-black' : 'border-gray-200'
                } cursor-pointer`}
                onClick={() => setToggle(true)}
              >
                Register
              </div>
            </div>

        {toggle && (
  <div>
    <div className="mb-2">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="email"
      >
        Email ID
      </label>
      <input
        className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder=""
        required
      />
    </div>
    <div className="mb-2">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        Username
      </label>
      <input
        className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder=""
        required
      />
    </div>
    <div className="mb-2">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=""
        required
      />
    </div>
    <div className="mb-2">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Confirm Password
      </label>
      <input
        className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder=""
        required
      />
    </div>
    <div className="flex items-center justify-center">
      <button
        className="text-white bg-black text-[15px] font-bold py-4 px-6 rounded-xl focus:outline-none focus:shadow-outline hover:bg-red-700"
        type="button"
        onClick={handleSignupSubmit}
      >
        Sign Up
      </button>
    </div>
  </div>
)}
{!toggle && (
  <div>
    <div className="mb-2">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        Email ID
      </label>
      <input
        className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder=""
        required
      />
    </div>
    <div className="mb-2">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=""
        required
      />
    </div>
    <div className="flex justify-center items-center  ">
      <button
        type="button"
        className={`text-white bg-black text-[15px] font-bold py-4 px-6 rounded-xl focus:outline-none focus:shadow-outline transition duration-300 type="button" hover:bg-red-700`}
        onClick={handleLoginSubmit}
      >
        Login
      </button>
      
    </div>
  </div>
)}

      </motion.div>
    </div>

  </motion.div>
  <ToastContainer />
</div>
  )
}

export default SignUp
