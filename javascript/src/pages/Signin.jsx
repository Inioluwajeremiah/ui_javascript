import React, { useState } from "react";
import { isStrongPassword } from "../utils/isStrngPassword";
import {
  useGetUserQuery,
  useSigninMutation,
  useSignupMutation,
} from "../redux/slice/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slice/authSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [data, setData] = useState([]);

  const [
    signin,
    {
      isLoading: loadingSigin,
      isError: isSignupError,
      error: signInError,
      isSuccess,
      data: signInData,
    },
  ] = useSigninMutation();

  const {
    data: getUserData,
    isLoading,
    isError,
    isFetching,
  } = useGetUserQuery();
  const token = localStorage.getItem("token");

  const handleFormInput = (value, property) => {
    setUserData((prevItems) => {
      return { ...prevItems, [property]: value };
    });
  };

  // console.log("user data ==> ", userData);

  const handleSignin = async () => {
    console.log("user data ==> ", userData);

    try {
      const signinResponse = await signin({
        email: userData.email,
        password: userData.password,
      });

      if (signinResponse.data) {
        dispatch(setCredentials(signinResponse?.data?._id));
      }

      console.log("signinResponse ===> ", signinResponse);
    } catch (error) {
      console.log("handleSignin error ==> ", error);
    }

    // setLoading(true);
    // fetch("http://localhost:7000/api/v1/", {
    //   method: "POST",
    //   data: JSON.stringify({
    //     name: name,
    //     username: username,
    //     password: password,
    //   })
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       setData(data);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setLoading(false);
    //     }),
    // });
  };

  return (
    <div
      role="form"
      className="w-[500px] flex flex-col justify-start items-start mx-auto mt-20 border p-4"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label htmlFor="name">Email</label>
      <input
        type="text"
        placeholder="Email"
        id="name"
        className="w-full border border-gray-500 rounded-md mt-2 px-2 py-1"
        onChange={(e) => handleFormInput(e.target.value, "email")}
      />{" "}
      <br />
      <label htmlFor="password">Password</label>
      <input
        className="w-full border border-gray-500 rounded-md mt-2 px-2 py-1"
        type="password"
        //   onChange={(e) => setPassword(e.target.value)}
        onChange={(e) => handleFormInput(e.target.value, "password")}
      />{" "}
      <br />
      <br />
      <p className="w-full overflow-x-scroll">{JSON.stringify(signInData)}</p>
      <button
        onClick={handleSignin}
        className="w-full bg-green-500 text-white pc-4 py-2"
      >
        {/* {loadingSigin ? "Loading..." : "Submit"} */}
        {loadingSigin ? "Loading..." : "Signin"}
      </button>
    </div>
  );
};

export default Signin;
