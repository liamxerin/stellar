import React from "react";
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp <span className="text-blue-500">ChatApp</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Brown"
              className="w-full input input-bordered h-10 bg-slate-900 text-white border-black"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="brown223"
              className="w-full input input-bordered h-10 bg-slate-900 text-white border-black"
            />
          </div>
          <div>
            <label className="label ">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 bg-slate-900 text-white border-black"
            />
          </div>
          <div>
            <label className="label ">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 bg-slate-900 text-white border-black"
            />
            <GenderCheckbox/>
            <a
              href="#"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Already have an account?
            </a>
          </div>
          <div>
            <button className="btn btn-block btn-sm mt-2 bg-slate-900 text-white border-black hover:bg-gray-800">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
