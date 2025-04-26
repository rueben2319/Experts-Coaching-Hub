import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />
            <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                "The best way to predict the future is to create it."
                            </p>
                            <footer className="text-sm">Peter Drucker</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <Card>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl">Welcome back</CardTitle>
                                <CardDescription>
                                    Enter your email and password to access your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-2 gap-6">
                                    <Button variant="outline" asChild>
                                        <Link href={route('auth.facebook')}>
                                            <FaFacebook className="mr-2 h-4 w-4" />
                                            Facebook
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href={route('auth.google')}>
                                            <FaGoogle className="mr-2 h-4 w-4" />
                                            Google
                                        </Link>
                                    </Button>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>
                                <form onSubmit={submit}>
                                    <div className="grid gap-2">
                                        <div className="grid gap-1">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                autoFocus
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-500">{errors.email}</p>
                                            )}
                                        </div>
                                        <div className="grid gap-1">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-red-500">{errors.password}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <Label htmlFor="remember">Remember me</Label>
                                        </div>
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Logging in...' : 'Log in'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-muted-foreground hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                                <div className="text-sm text-muted-foreground">
                                    Don't have an account?{' '}
                                    <Link href={route('register')} className="text-primary hover:underline">
                                        Sign up
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
