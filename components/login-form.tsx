"use client"

import { useActionState } from "react";
import { LoginState } from "@/types/LoginState";
import { login } from "@/app/(auth)/login/actions";

import { ArrowBigRight, Loader, MessageCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const LoginForm = () => {

  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {
      success: null,
      message: ""
    }
  );

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl"> Login</CardTitle>
        <CardDescription>
          Digite seu email para receber um link de Login.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction}>
          <div className="grid gap-4 ">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="seuemail@gmail.com" required />
            </div>

            {state.success && (
              <Alert className="text-muted-foreground">
                <ArrowBigRight className="h-6 w-6 !text-green-600" />
                <AlertTitle className="text-gray-50">Email enviado</AlertTitle>
                <AlertDescription>
                  Confira sua caixa de entrada para acessar o link de Login.
                </AlertDescription>
              </Alert>
            )}


            {state.success == false && (
              <Alert className="text-muted-foreground">
                <MessageCircle className="h-6 w-6 !text-red-600" />
                <AlertTitle className="text-gray-50">Erro</AlertTitle>
                <AlertDescription>
                  Ocorreu um erro ao enviar o link de Login
                </AlertDescription>
              </Alert>
            )}

            <Button className="w-full" type="submit">
              Enviar Link de Login
              {pending && <Loader className="animate-spin" />}
            </Button>

          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
