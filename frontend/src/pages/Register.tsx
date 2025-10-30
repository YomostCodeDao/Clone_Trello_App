import * as React from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

type Form = {
    name: string;
    email: string;
    password: string;
    confirm: string;
    loading: boolean;
    error?: string;
};

export default function RegisterPage() {
    const { register } = useAuth();
    const nav = useNavigate();
    const loc = useLocation();
    const [form, setForm] = React.useState<Form>({
        name: "",
        email: "",
        password: "",
        confirm: "",
        loading: false,
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value, error: undefined }));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            return setForm((s) => ({ ...s, error: "Email & password are required." }));
        }
        if (form.password.length < 8) {
            return setForm((s) => ({ ...s, error: "Password must be ≥ 8 characters." }));
        }
        if (form.password !== form.confirm) {
            return setForm((s) => ({ ...s, error: "Passwords do not match." }));
        }

        try {
            setForm((s) => ({ ...s, loading: true }));
            await register(form.email, form.password, form.name || undefined);
            const to = (loc.state as any)?.from?.pathname ?? "/";
            nav(to, { replace: true }); // vào dashboard
        } catch (err: any) {
            const msg = err?.response?.data?.error?.message ?? "Register failed.";
            setForm((s) => ({ ...s, error: msg }));
        } finally {
            setForm((s) => ({ ...s, loading: false }));
        }
    };

    return (
        <div className="min-h-screen bg-black text-neutral-100 grid place-items-center">
            <Card>
                <div className="mb-6">
                    <h1 className="text-lg font-semibold">Create your account</h1>
                    <p className="text-sm text-neutral-400 mt-1">
                        Join and start organizing your boards.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name (optional)</Label>
                        <Input id="name" name="name" value={form.name} onChange={onChange} />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email"
                            placeholder="me@example.com"
                            value={form.email} onChange={onChange} autoComplete="email" />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={onChange}
                            autoComplete="new-password"
                        />
                    </div>

                    <div>
                        <Label htmlFor="confirm">Confirm password</Label>
                        <PasswordInput
                            id="confirm"                  
                            name="confirm"               
                            value={form.confirm}          
                            onChange={onChange}
                            autoComplete="new-password"
                        />
                    </div>

                    {form.error && <p className="text-sm text-red-400">{form.error}</p>}

                    <Button type="submit" disabled={form.loading} className="w-full">
                        {form.loading ? "Creating account…" : "Sign up"}
                    </Button>

                    <p className="text-sm text-neutral-400 text-center">
                        Already have an account?{" "}
                        <Link className="underline" to="/login">Log in</Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}
