"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
        return;
      }

      const redirect = searchParams.get("redirect") || "/admin";
      router.replace(redirect);
    } catch (err) {
      setErrorMsg("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendReset() {
    setErrorMsg("");
    setResetMsg("");
    if (!email) {
      setErrorMsg("Enter your email to reset password.");
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/auth/reset`,
      });
      if (error) {
        setErrorMsg(error.message);
        return;
      }
      setResetMsg("Password reset email sent. Check your inbox.");
    } catch (e) {
      setErrorMsg("Could not send reset email. Try again.");
    }
  }

  return (
    <div className="mx-auto max-w-sm p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Login</h1>
      {searchParams.get("unauthorized") ? (
        <p className="rounded border border-yellow-300 bg-yellow-50 p-2 text-sm text-yellow-800">
          Your account is not authorized for admin access.
        </p>
      ) : null}
      {searchParams.get("reset") === "done" ? (
        <p className="rounded border border-green-300 bg-green-50 p-2 text-sm text-green-800">
          Password updated. Please sign in with your new password.
        </p>
      ) : null}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          className="w-full rounded border p-2"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full rounded border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMsg ? (
          <p className="text-sm text-red-600">{errorMsg}</p>
        ) : null}
        {resetMsg ? (
          <p className="text-sm text-green-600">{resetMsg}</p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
      <button
        type="button"
        onClick={handleSendReset}
        className="text-sm text-blue-700 underline"
      >
        Forgot password?
      </button>
      <p className="text-xs text-neutral-500">
        Note: Access to the admin area requires your profile role to be
        set to "admin" or "editor".
      </p>
    </div>
  );
}
