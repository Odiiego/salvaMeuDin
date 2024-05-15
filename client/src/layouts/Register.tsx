import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <>
      <h1>Register</h1>
      <RegisterForm />
      <Link to="/login">Já tem cadastro?</Link>
    </>
  );
}

export default Register;
