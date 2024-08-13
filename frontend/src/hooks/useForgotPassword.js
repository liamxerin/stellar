import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  


  const forgotpassword = async (username) => {
    const success = handleInputErrors({ username });
    if (!success) return;
    setLoading(true);

    try {
      const res = await fetch("api/auth/forgot-password", {
         method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username})
      })

      // const data = await res.json()
      // if (data.error) {
      //   throw new Error(data.error)
      // }
    } catch (error) {
       toast.error(error.message)
    } finally {
      setLoading(false)
      toast.success('Email sent successfull')
    }
  }
    return {loading, forgotpassword}
}

export default useForgotPassword

function handleInputErrors({ username, password }) {
    if (!username  ) {
        toast.error("Please fill in all fields");
        return false;
    }

 

    return true; // Return true if all validations pass
}