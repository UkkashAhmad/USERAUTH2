import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

const RegisterSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialRegisterValues = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  
  const register = async (values, onSubmitProps) => {
    try {
      const response = await fetch('/api/users/register',{
        method:"POST",
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify(values)
      }
      
    )
    if(!response.ok){
      throw new Error('Register Failed')
    }
    const data = await response.json()
    console.log('USer register successful', data)
    onSubmitProps.resetForm()
    } catch (error) {
      console.log(error.message)
    }    
    console.log(values)
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialRegisterValues}
          validationSchema={RegisterSchema}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="username"
                  id="username"
                  placeholder="Username"
                />
                {touched.username && errors.username && (
                  <div className="text-red-500 text-xs mt-1">{errors.username}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
                  <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
                  <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                )}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
              <div className="mt-4">
                <Link
                  className="text-sm text-gray-600 hover:text-gray-800"
                  to="/login"
                >
                  Already have an account? <span className="text-blue-500">Log in here</span>
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
