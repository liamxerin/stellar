import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";


const ResetPassword = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, resetPassword } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword({ token, newPassword, confirmPassword });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          <span className="text-blue-500">StellerChat</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"></span>
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full input input-bordered h-10 bg-slate-900 text-white border-black "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"></span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10 bg-slate-900 text-white border-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {" "}
            Login here
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 bg-slate-900 text-white border-black hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
