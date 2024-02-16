'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FormEventHandler } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function SignInCard() {
  const router = useRouter();

  const handleSignIn: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formElm = event.target as HTMLFormElement;
    const username = formElm.username.value;
    const password = formElm.password.value;

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      if (result && result.ok) {
        router.replace('/');
        return;
      } else {
        toast.error('用户名或密码错误');
      }
    } catch (e) {
      toast.error('登录失败');
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>登录</CardTitle>
        <CardDescription>登录以维护数据</CardDescription>
      </CardHeader>
      <form onSubmit={handleSignIn}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">用户名</Label>
              <Input id="username" placeholder="请输入用户名" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">密码</Label>
              <Input id="password" type="password" placeholder="请输入密码" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">登录</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default SignInCard;
