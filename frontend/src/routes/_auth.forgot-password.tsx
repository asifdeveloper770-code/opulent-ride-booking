import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_auth/forgot-password")({
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password reset email sent.");
  };

  return (
    <form onSubmit={submit} className="w-full max-w-md border border-border bg-card/70 p-8 shadow-elegant">
      <p className="divider-gold">Reset</p>
      <h1 className="mt-4 text-4xl font-display">Recover Access</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Enter your email and Supabase Auth will send a secure reset link.
      </p>
      <label className="mt-8 block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-gold">Email</span>
        <input className="w-full border border-border bg-input/60 px-4 py-3 text-sm outline-none transition-colors focus:border-gold" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      <button disabled={isSubmitting} className="mt-8 w-full bg-gold py-3 text-xs font-medium uppercase tracking-[0.28em] text-primary-foreground transition-colors hover:bg-gold-light">
        {isSubmitting ? "Sending..." : "Send reset link"}
      </button>
      <Link to="/login" className="mt-5 block text-center text-sm text-muted-foreground hover:text-gold">Back to sign in</Link>
    </form>
  );
}
