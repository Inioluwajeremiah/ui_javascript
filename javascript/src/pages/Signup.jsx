import React, { useState } from "react";
import { isStrongPassword } from "../utils/isStrngPassword";
import {
  useGetUserQuery,
  useSigninMutation,
  useSignupMutation,
} from "../redux/slice/usersApiSlice";

const Signup = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
    cpassword: "",
  });
  const [data, setData] = useState([]);

  const [
    signup,
    {
      isLoading: loadingSignup,
      isError: isSignupError,
      error: signUpError,
      isSuccess,
      data: signupData,
    },
  ] = useSignupMutation();

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

  const handleSignup = async () => {
    console.log("user data ==> ", userData);
    if (!isStrongPassword(userData.password)) {
      alert("password not strong enough");
      return;
    }
    if (userData.password !== userData.cpassword) {
      alert("password does not match");
      return;
    }

    try {
      const signupResponse = await signup({
        email: userData.name,
        username: userData.username,
        password: userData.password,
        role: "participant",
      });

      console.log("signupResponse ===> ", signupResponse);
    } catch (error) {
      console.log("handleSignup error ==> ", error);
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
        placeholder="Fullname"
        id="name"
        className="w-full border border-gray-500 rounded-md mt-2 px-2 py-1"
        onChange={(e) => handleFormInput(e.target.value, "name")}
      />{" "}
      <br />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="Username"
        className="w-full border border-gray-500 rounded-md mt-2 px-2 py-1"
        id="username"
        // onChange={(e) => setUsername(e.target.value)}
        onChange={(e) => handleFormInput(e.target.value, "username")}
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
      <label htmlFor="cpassword">Confirm Password</label>
      <input
        className="w-full border border-gray-500 rounded-md mt-2 px-2 py-1"
        type="password"
        id="cpassword"
        // onChange={(e) => setCPassword(e.target.value)}
        onChange={(e) => handleFormInput(e.target.value, "cpassword")}
      />
      <br />
      <button
        onClick={handleSignup}
        className="w-full bg-green-500 text-white pc-4 py-2"
      >
        {/* {loadingSignup ? "Loading..." : "Submit"} */}
        {loadingSignup ? "Loading..." : "Signup"}
      </button>
    </div>
  );
};

export default Signup;
