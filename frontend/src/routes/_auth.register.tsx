import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_auth/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created. Check your email if confirmation is enabled.");
    await navigate({ to: "/dashboard" });
  };

  return (
    <form onSubmit={submit} className="w-full max-w-md border border-border bg-card/70 p-8 shadow-elegant">
      <p className="divider-gold">Register</p>
      <h1 className="mt-4 text-4xl font-display">Create Your Account</h1>
      <div className="mt-8 space-y-5">
        <Field label="Full name">
          <input className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </Field>
        <Field label="Email">
          <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Field>
        <Field label="Password">
          <input className={inputClass} type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Field>
      </div>
      <button disabled={isSubmitting} className="mt-8 w-full bg-gold py-3 text-xs font-medium uppercase tracking-[0.28em] text-primary-foreground transition-colors hover:bg-gold-light">
        {isSubmitting ? "Creating..." : "Create account"}
      </button>
      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have access? <Link to="/login" className="text-gold">Sign in</Link>
      </p>
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
