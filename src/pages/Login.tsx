import { Link } from "react-router-dom";
import tickitzIcon from "../assets/icons/tickitz_logo.svg";
import eyeIcon from "../assets/icons/eye-icon.svg";
import eyeOffIcon from "../assets/icons/eye-off-icon.svg";
import facebookIcon from "../assets/icons/facebook-icon.svg";
import googleIcon from "../assets/icons/google-icon.svg";
import Input from "../components/Input";
import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<{ email: string; pwd: string }>({ email: "", pwd: "" });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <main className="font-mulish bg-[url('/src/assets/images/auth.webp')] bg-cover h-screen">
      <section className="bg-black bg-opacity-50 py-16 h-screen w-full">
        <div className="grid place-items-center mb-10">
          <img className="lg: w-32" src={tickitzIcon} alt="wallet" />
        </div>
        <div className="bg-white rounded-xl w-4/5 mx-auto tbt:w-96 px-5 md:px-12 py-7 lg:py-12">
          <div>
            <div className="mb-3">
              <h1 className="text-lg lg:text-2xl font-bold mb-2">Welcome back👋</h1>
              <p className="text-xs lg:text-sm text-gray-400">Sign in with your data that you entered during your registration</p>
            </div>
            <form>
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <div className="relative mt-2">
                <Input input={{ type: "text", name: "email", placeholder: "Enter your email", autocomplete: "email", value: form.email, onChange: onChangeHandler }} />
              </div>
              <label className="text-sm" htmlFor="pwd">
                Password
              </label>
              <div className="relative mt-2">
                <img className="absolute mt-[14px] mr-3 right-0 cursor-pointer" width="15" height="15" src={showPassword ? eyeOffIcon : eyeIcon} alt="toggle-password-visibility" onClick={togglePasswordVisibility} />
                <Input input={{ type: showPassword ? "text" : "password", name: "pwd", placeholder: "Enter Your Password", autocomplete: "off", value: form.pwd, onChange: onChangeHandler }} />
              </div>
              <div className="text-right text-xs mb-5 text-primary hover:text-blue-800 active:text-blue-900">
                <Link to="#">Forgot Your Password?</Link>
              </div>
              <button className="text-white text-sm bg-primary hover:bg-blue-800 active:bg-blue-900 rounded-lg w-full h-12" type="submit">
                Login
              </button>
              <p className="text-center text-xs uw:text-2xl my-5">
                Not Have An Account?
                <Link to="/register" className="text-primary hover:text-blue-800 hover:underline active:text-blue-900 active:underline">
                  Register
                </Link>
              </p>
            </form>
          </div>
          <div>
            <p className="text-center text-[10px] text-gray-300">Or</p>
            <div className="mt-2 flex gap-8 justify-center">
              <button className="w-14 h-14 md:w-2/5 md:h-12 shadow-lg hover:bg-gray-50 active:bg-gray-100">
                <div className="flex justify-center">
                  <img className="uw:w-8 uw:h-8" width="20" height="20" src={googleIcon} alt="facebook-icon" />
                  <div className="hidden md:flex items-center text-xs uw:text-2xl text-gray-400 ml-2">Google</div>
                </div>
              </button>
              <button className="w-14 h-14 md:w-2/5 md:h-12 shadow-lg hover:bg-darkwhite active:bg-darkwhite2">
                <div className="flex justify-center">
                  <img className="uw:w-8 uw:h-8" width="20" height="20" src={facebookIcon} alt="google-icon" />
                  <div className="hidden md:flex items-center  text-xs uw:text-2xl text-gray-400 ml-2">Facebook</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
