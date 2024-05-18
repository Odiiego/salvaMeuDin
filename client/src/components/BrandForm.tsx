import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IBrand } from '../types';
import { SquarePlus } from 'lucide-react';

type createBrandForm = {
  quantity: number;
  price: number;
  name: string;
};

interface BrandFormProps {
  product: {
    id: string;
    brands: IBrand[];
    setBrands: React.Dispatch<React.SetStateAction<IBrand[]>>;
  };
}

function BrandForm({ product: { id, brands, setBrands } }: BrandFormProps) {
  const [error, setError] = React.useState<null | string>(null);
  const {
    register,
    reset,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<createBrandForm>();

  const onSubmit: SubmitHandler<createBrandForm> = async (data) => {
    const { quantity, ...rest } = data;
    try {
      const response = await fetch(`http://localhost:8080/brands/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...rest, quantity: quantity ? quantity : 1 }),
      });

      const brand = await response.json();
      if (!brand) setError('Não conseguimos cadastrar o produto.');

      setError(null);
      setBrands([...brands, brand]);
      setFocus('quantity');
      reset();
    } catch (error) {
      setError('Algo deu errado.');
    }
  };
  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit(onSubmit)}>
      <input
        className={`w-16 text-center border-2 rounded py-[1px] border-black ${
          errors.quantity ? 'outline-red-500' : 'outline-teal-300'
        }`}
        placeholder="Quant"
        type="number"
        step="0.01"
        {...register('quantity', { min: 1, max: 9999 })}
      />
      <input
        className={`w-16 text-center border-2 rounded py-[1px] border-black ${
          errors.price ? 'outline-red-500' : 'outline-teal-300'
        }`}
        placeholder="Preço"
        type="number"
        step="0.01"
        {...register('price', { required: true, min: 0, max: 999999.99 })}
      />
      <input
        className={`w-[138px] text-center border-2 rounded py-[1px] border-black ${
          errors.name ? 'outline-red-500' : 'outline-teal-300'
        }`}
        placeholder="Marca"
        type="text"
        {...register('name', { required: true })}
      />
      {error && <span>{error}</span>}

      <button
        className={
          'w-[30px] h-[30px] relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group focus:bg-white group'
        }
        type="submit"
      >
        <span
          className={`${
            errors.name || errors.price || errors.quantity
              ? 'bg-red-500'
              : 'bg-teal-300'
          }
          w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-10 ml-10 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-focus:ml-0 group-focus:mb-32 group-focus:translate-x-0`}
        ></span>
        <SquarePlus
          className="absolute w-full transition-colors duration-300 ease-in-out group-hover:text-white group-focus:text-white"
          strokeWidth={1.5}
          size={30}
        />
      </button>
    </form>
  );
}

export default BrandForm;
