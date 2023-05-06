import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [section, setSection] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setEmailError(false);
      setEmail(value);
    }

    if (name === "password") {
      setPasswordError(false);
      setPassword(value);
    }

    if (name === "confirm_password") {
      setPasswordError(false);
      setConfirmPassword(value);
    }

    if (name === "username") {
      setUsername(value);
    }

    if (name === "first_name") {
      setFirstNameError(false);
      setFirstName(value);
    }

    if (name === "last_name") {
      setLastNameError(false);
      setLastName(value);
    }
  }

  function nextSectionHandler() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexName = /^[a-zA-Z]+$/;

    if (section === 1) {
      if (!regexEmail.test(email)) {
        setEmailError(true);
        return;
      }

      if (
        password !== confirmPassword ||
        password.length === 0 ||
        confirmPassword.length === 0
      ) {
        setPasswordError(true);
        return;
      }
    }

    if (section === 2) {
      if (!regexName.test(firstName)) {
        setFirstNameError(true);
        return;
      }

      if (!regexName.test(lastName)) {
        setLastNameError(true);
        return;
      }
    }

    setSection(section + 1 > 3 ? 3 : section + 1);
  }

  function submitForm(e) {
    e.preventDefault();

    if (username.length === 0 || profileImage === null || coverImage === null) {
      alert("All Fields Are Required");
      return;
    }

    const data = {
      email,
      password,
      username,
      firstName,
      lastName,
      profileImage: URL.createObjectURL(profileImage),
      coverImage: URL.createObjectURL(coverImage),
    };
    dispatch(setUserData(data));
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setFirstName("");
    setLastName("");
    setProfileImage(null);
    setCoverImage(null);
    navigate("/detail");
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-[40rem] max-w-[90%] rounded-md drop-shadow-md py-10  bg-white flex flex-col items-center gap-8">
        <div className="form-nav w-[20rem] flex justify-center items-center">
          <div className="bg-[#6b58d9] w-10 h-10 rounded-[50%] text-white flex justify-center items-center">
            1
          </div>
          <div
            className={
              section >= 2
                ? "w-[4rem] border-2 border-[#6b58d9] ease-in-out duration-300"
                : "w-[4rem] border-2 border-[#c0c0c0] ease-in-out duration-300"
            }
          ></div>
          <div
            className={
              section >= 2
                ? "bg-[#6b58d9] w-10 h-10 rounded-[50%] text-white flex justify-center items-center ease-in-out duration-300"
                : "bg-[#c0c0c0] w-10 h-10 rounded-[50%] text-white flex justify-center items-center ease-in-out duration-300"
            }
          >
            2
          </div>
          <div
            className={
              section >= 3
                ? "w-[4rem] border-2 border-[#6b58d9]"
                : "w-[4rem] border-2 border-[#c0c0c0]"
            }
          ></div>
          <div
            className={
              section === 3
                ? "bg-[#6b58d9] w-10 h-10 rounded-[50%] text-white flex justify-center items-center ease-in-out duration-300"
                : "bg-[#c0c0c0] w-10 h-10 rounded-[50%] text-white flex justify-center items-center ease-in-out duration-300"
            }
          >
            3
          </div>
        </div>
        <form className="max-w-[23rem] md:w-[23rem]">
          {/* section-1  -> signup info*/}
          {section === 1 && (
            <div className="section-1">
              <h3 className="mb-4 text-2xl font-bold text-center">
                SIGNUP INFO
              </h3>
              <div className="flex flex-col items-start justify-center email">
                <label>
                  Email Address<span className="text-red-400">*</span>
                </label>
                {emailError && (
                  <div className="text-sm text-red-500">Invalid Email</div>
                )}
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={changeHandler}
                  className={
                    emailError
                      ? "border-2 border-red-500"
                      : "border-2 border-[#c0c0c0]"
                  }
                />
              </div>
              <div className="flex flex-col items-start justify-center password">
                <label>
                  Password<span className="text-red-400">*</span>
                </label>
                {passwordError && (
                  <div className="text-sm text-red-500">
                    Password don't match
                  </div>
                )}
                <input
                  type="password"
                  value={password}
                  name="password"
                  onChange={changeHandler}
                  className={
                    passwordError
                      ? "border-2 border-red-500"
                      : "border-2 border-[#c0c0c0]"
                  }
                />
              </div>
              <div className="flex flex-col items-start justify-center confirm-password">
                <label>
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                {passwordError && (
                  <div className="text-sm text-red-500">
                    Password don't match
                  </div>
                )}
                <input
                  type="password"
                  value={confirmPassword}
                  name="confirm_password"
                  onChange={changeHandler}
                  className={
                    passwordError
                      ? "border-2 border-red-500"
                      : "border-2 border-[#c0c0c0]"
                  }
                />
              </div>
            </div>
          )}

          {/* section-2  ->  personal info*/}
          {section === 2 && (
            <div className="section-1">
              <h3 className="mb-4 text-2xl font-bold text-center">
                PERSONAL INFO
              </h3>
              <div className="flex flex-col items-start justify-center email">
                <label>
                  Username<span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  name="username"
                  onChange={changeHandler}
                />
              </div>
              <div className="flex flex-col items-start justify-center password">
                <label>
                  First Name<span className="text-red-400">*</span>
                </label>
                {firstNameError && (
                  <div className="text-sm text-red-500">Invalid Name</div>
                )}
                <input
                  type="text"
                  value={firstName}
                  name="first_name"
                  onChange={changeHandler}
                  className={
                    firstNameError
                      ? "border-2 border-red-500"
                      : "border-2 border-[#c0c0c0]"
                  }
                />
              </div>
              <div className="flex flex-col items-start justify-center confirm-password">
                <label>
                  Last Name<span className="text-red-400">*</span>
                </label>
                {lastNameError && (
                  <div className="text-sm text-red-500">Invalid Name</div>
                )}
                <input
                  type="text"
                  value={lastName}
                  name="last_name"
                  onChange={changeHandler}
                  className={
                    lastNameError
                      ? "border-2 border-red-500"
                      : "border-2 border-[#c0c0c0]"
                  }
                />
              </div>
            </div>
          )}

          {/* section-3  upload photos*/}
          {section === 3 && (
            <div className="section-1">
              <h3 className="mb-4 text-2xl font-bold text-center">
                UPLOAD PHOTOS
              </h3>
              <div className="flex flex-col items-start justify-center">
                <label>
                  Profile Picture
                  <span className="text-red-400">*</span>
                </label>

                <div className="flex items-center justify-between w-full">
                  <img
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : "./images/profile.jpg"
                    }
                    className="w-[6rem] h-[5rem] rounded-md drop-shadow-md"
                    alt="profile-image"
                  />

                  <label
                    htmlFor="upload-img-profile"
                    className="bg-[#c0c0c0] text-white rounded-sm font-extralight py-2
                  px-3 my-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                      />
                    </svg>
                  </label>
                </div>
                <input
                  type="file"
                  className="hidden"
                  id="upload-img-profile"
                  onChange={(e) => {
                    setProfileImage(e.target.files[0]);
                  }}
                />
              </div>

              <div className="flex flex-col items-start justify-center">
                <label>
                  Cover Picture<span className="text-red-400">*</span>
                </label>
                <label htmlFor="upload-img-cover"></label>
                <div className="flex items-center justify-between w-full">
                  <img
                    src={
                      coverImage
                        ? URL.createObjectURL(coverImage)
                        : "./images/profile.jpg"
                    }
                    className="w-[6rem] h-[5rem]  mt-5 rounded-md drop-shadow-md"
                    alt="cover-image"
                  />

                  <label
                    htmlFor="upload-img-cover"
                    className="bg-[#c0c0c0] text-white rounded-sm font-extralight py-2
                  px-3 my-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                      />
                    </svg>
                  </label>
                </div>
                <input
                  type="file"
                  className="hidden"
                  id="upload-img-cover"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between btns-wrapper">
            <button
              className={
                section === 1 ? "invisible" : "btn-secondary flex items-center"
              }
              type="button"
              onClick={() => {
                setSection(section - 1 < 1 ? 1 : section - 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
              Back
            </button>

            {section === 3 ? (
              <button
                type="button"
                onClick={submitForm}
                className="btn-primary"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={nextSectionHandler}
                className="flex items-center gap-2 btn-primary"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 font-bold"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
