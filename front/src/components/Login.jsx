import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../css/Login.module.css";
import { login, reset } from "../redux/authSlice";
import FormInput from "./FormInput";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isLogoutSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      navigate("/");
    } else if (isLogoutSuccess) {
      console.log("sucess");
    }
    dispatch(reset());
  }, [isSuccess, isLogoutSuccess, isError, message, navigate, dispatch]);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
      pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
      errormessage: "It should be a valid email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      pattern: "^[\\w]{6,}$",
      errormessage: "Password should be atleast 6 characters",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const onChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className={`${styles.login} bg-blue-100`}>
      <form onSubmit={handleSubmit} className="bg-cyan-700">
        <h1 className="font-bold text-white text-2xl">Login</h1>
        {inputs.map((input) => (
          <FormInput
            className={styles.formInput}
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type="submit">Login</button>
        <span>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-red-800 font-bold ">
            Register
          </Link>
        </span>
        <span>
          <Link to="/forgotPassword" className="text-red-800 font-bold">
            Forgot password?
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
