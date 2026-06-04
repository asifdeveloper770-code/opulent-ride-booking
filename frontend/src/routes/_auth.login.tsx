import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_auth/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Welcome back.");
    await navigate({ to: "/admin" });
  };

  return (
    <form onSubmit={submit} className="w-full max-w-md border border-border bg-card/70 p-8 shadow-elegant">
      <p className="divider-gold">Sign in</p>
      <h1 className="mt-4 text-4xl font-display">Access Your Account</h1>
      <div className="mt-8 space-y-5">
        <Field label="Email">
          <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Field>
        <Field label="Password">
          <input className={inputClass} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Field>
      </div>
      <button disabled={isSubmitting} className="mt-8 w-full bg-gold py-3 text-xs font-medium uppercase tracking-[0.28em] text-primary-foreground transition-colors hover:bg-gold-light">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
      <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
        <Link to="/forgot-password" className="hover:text-gold">Forgot password?</Link>
        <Link to="/register" className="hover:text-gold">Create account</Link>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-gold">{label}</span>
      {children}
    </label>
  );
}

const inputClass = "w-full border border-border bg-input/60 px-4 py-3 text-sm outline-none transition-colors focus:border-gold";
