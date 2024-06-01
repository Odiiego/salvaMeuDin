import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IBrand } from '../types';
import { SquarePlus } from 'lucide-react';
import IconButton from './IconButton';

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
        className={`w-16 text-center border-2 rounded py-[1px] bg-aquamarine-50 border-aquamarine-950 ${
          errors.quantity ? 'outline-red-500' : 'outline-aquamarine-600'
        }`}
        placeholder="Quant"
        type="number"
        step="0.01"
        {...register('quantity', { min: 1, max: 9999 })}
      />
      <input
        className={`w-16 text-center border-2 rounded py-[1px] bg-aquamarine-50 border-aquamarine-950 ${
          errors.price ? 'outline-red-500' : 'outline-aquamarine-600'
        }`}
        placeholder="Preço"
        type="number"
        step="0.01"
        {...register('price', { required: true, min: 0, max: 999999.99 })}
      />
      <input
        className={`w-[138px] text-center border-2 rounded py-[1px] bg-aquamarine-50 border-aquamarine-950 ${
          errors.name ? 'outline-red-500' : 'outline-aquamarine-600'
        }`}
        placeholder="Marca"
        type="text"
        {...register('name', { required: true })}
      />
      {error && <span>{error}</span>}

      <IconButton>
        <SquarePlus strokeWidth={1.5} size={30} />
      </IconButton>
    </form>
  );
}

export default BrandForm;
