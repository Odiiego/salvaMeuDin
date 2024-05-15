import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type LoginFormData = {
  email: string;
  password: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const user = await response.json();
      if (!user)
        setError(
          'Não conseguimos localizar o usuário, verifique as credenciais e tente novamente!',
        );
      setError(null);
      navigate('/user');
      return user;
    } catch (error) {
      setError('Algo deu errado. Não conseguimos te conectar agora.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}
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

      <input type="submit" />
    </form>
  );
}

export default LoginForm;
