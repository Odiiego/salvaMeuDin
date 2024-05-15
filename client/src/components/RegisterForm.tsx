import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterForm() {
  const [error, setError] = React.useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const { password, confirmPassword, username, email } = data;
      if (password !== confirmPassword) {
        setError('As senhas devem ser iguais');
        throw new Error('As senhas devem ser iguais');
      }
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      });

      const user = await response.json();
      if (!user)
        setError(
          'Não conseguimos cadastrar o usuário, verifique seus dados e tente novamente!',
        );
      setError(null);
      return user;
    } catch (error) {
      console.log(error);
      setError('Algo deu errado. Não conseguimos te cadastrar agora.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}
      <input
        defaultValue={'username'}
        type="text"
        {...register('username', { required: true })}
      />
      {errors.email && <span>This field is required</span>}
      <input
        defaultValue={'email@teste.com'}
        type="email"
        {...register('email', { required: true })}
      />
      {errors.email && <span>This field is required</span>}

      <input
        defaultValue={'senha'}
        type="password"
        {...register('password', { required: true })}
      />
      {errors.password && <span>This field is required</span>}

      <input
        defaultValue={'senha'}
        type="password"
        {...register('confirmPassword', { required: true })}
      />
      {errors.confirmPassword && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}

export default RegisterForm;
