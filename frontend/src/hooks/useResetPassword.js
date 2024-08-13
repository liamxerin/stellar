import React, { useState } from 'react'
import toast from "react-hot-toast";
const useResetPassword = () => {
    const [loading, setLoading] = useState(false);

    const resetPassword = async ({ token, newPassword, confirmPassword }) => {
        const success = handleInputErrors({ token, newPassword, confirmPassword });
        if (!success) return;
        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword, confirmPassword })
            });

            toast.success('password is  reset successfully');
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading, resetPassword}
}

export default useResetPassword

function handleInputErrors({token, newPassword, confirmPassword }) {
    if (!token || !newPassword || !confirmPassword ) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match!');
        return false;
    }

    if (newPassword.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }

    return true; // Return true if all validations pass
}