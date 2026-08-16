import { Form, Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import InputError from '@/components/input-error';

import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';

type Props = {
   status?: string;
   canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
   const { auth } = usePage<{ auth: any }>().props;

   useEffect(() => {
      if (auth.user) {
         router.visit('/dashboard', {
            replace: true,
         });
      }
   }, []);

   return (
      <>
         <Head title="Log in" />
         <Card className="text-md left-2 border border-blue-600 bg-white py-1 md:fixed md:py-5 lg:bottom-12 lg:left-5">
            <CardContent className="text-[0.8rem] font-semibold md:text-[0.9rem]">
               <div className="w-full text-center underline">Akun Demo</div>
               <div className="flex flex-col">
                  <span className="w-full">Role Admin</span>
                  <span>Email&emsp;&emsp;&emsp; : admin@test.com</span>
                  <span>Password&emsp; : Tes123456</span>
               </div>
               <br />
               <div className="flex flex-col">
                  <span>Role Admin</span>
                  <span>Email&emsp;&emsp;&emsp; : admin@test.com</span>
                  <span>Password&emsp; : Tes123456</span>
               </div>
            </CardContent>
         </Card>
         <Card className="bg-white">
            <CardHeader></CardHeader>
            <CardContent>
               <Form {...store.form()} resetOnSuccess={['password']} className="flex flex-col gap-6">
                  {({ processing, errors }) => (
                     <>
                        <div className="grid gap-6">
                           <div className="grid gap-2">
                              <Label htmlFor="email">Email address</Label>
                              <Input
                                 id="email"
                                 type="email"
                                 name="email"
                                 required
                                 autoFocus
                                 tabIndex={1}
                                 autoComplete="email"
                                 placeholder="email@example.com"
                              />
                              <InputError message={errors.email} />
                           </div>

                           <div className="grid gap-2">
                              <div className="flex items-center">
                                 <Label htmlFor="password">Password</Label>
                              </div>
                              <PasswordInput
                                 id="password"
                                 name="password"
                                 required
                                 tabIndex={2}
                                 autoComplete="current-password"
                                 placeholder="Password"
                              />
                              <InputError message={errors.password} />
                           </div>

                           <div className="flex items-center space-x-3">
                              <Checkbox id="remember" name="remember" tabIndex={3} />
                              <Label htmlFor="remember">Remember me</Label>
                           </div>

                           <Button
                              type="submit"
                              className="mt-4 w-full"
                              tabIndex={4}
                              disabled={processing}
                              data-test="login-button"
                           >
                              {processing && <Spinner />}
                              Log in
                           </Button>
                        </div>

                        {/* <div className="text-center text-sm text-muted-foreground">
                     Don't have an account?{' '}
                     <TextLink href={register()} tabIndex={5}>
                        Sign up
                     </TextLink>
                  </div> */}
                     </>
                  )}
               </Form>

               {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
            </CardContent>
         </Card>
      </>
   );
}

// Login.layout = {
//    title: 'Log in to your account',
//    description: 'Enter your email and password below to log in',
// };
