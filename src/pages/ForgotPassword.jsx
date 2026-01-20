import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Container, Button, Input } from "../components";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      await authService.forgotPassword(email);
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-2xl font-bold text-white mb-6">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          {message && (
            <p className="text-sm text-cyan-400 mt-4">{message}</p>
          )}
        </form>
      </div>
    </Container>
  );
}

export default ForgotPassword;
