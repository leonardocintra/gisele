import CardWrapper from "@/components/auth/login-cardwrapper";

export default function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Bem vindo de volta!"
      backButtonLabel="Não tem uma conta ?"
      showSocial
      backButtonHref="/auth/register"
    >
      <h2>Login</h2>
    </CardWrapper>
  );
}
