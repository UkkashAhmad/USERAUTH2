import React, { useContext, useState } from "react";
import { AuthContext } from "../../Authcontext/authContext";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialLoginValues = {
  email: "",
  password: "",
};

const Login = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (values, onSubmitProps) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("data", data)
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        navigate("/");
      } else {
        const errorData = await res.json();
        // console.log(errorData)
        setErrorMessage(errorData?.message)
        dispatch({ type: "LOGIN_FAILED", payload: { error: errorData?.message } });
      }
    } catch (error) {
      console.error("Error during login:", error);
      dispatch({ type: "LOGIN_FAILED", payload: { error: "An error occurred" } });
    }
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleLogin(values, onSubmitProps);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialLoginValues}
          validationSchema={LoginSchema}
        >
          {({
            errors,
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  id="email"
                  placeholder="Email"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading || !!errorMessage}
              >
                {loading && !errorMessage ? "Logging in..." : "Login"}
              </button>
              {errorMessage && (
                <div className="text-red-500 text-xs mt-1"><span> {errorMessage} </span> </div>
              )}
              <div className="mt-4">
                <Link
                  className="text-sm text-gray-600 hover:text-gray-800"
                  to="/register"
                >
                  Don't have an account?{" "}
                  <span className="text-blue-500">Register here</span>
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
