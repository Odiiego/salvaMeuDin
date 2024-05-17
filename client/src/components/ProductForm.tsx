import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IProduct } from '../types';
import { SquarePlus } from 'lucide-react';

type createProductForm = {
  quantity: number;
  name: string;
};

interface ProductFormProps {
  list: {
    id: string | undefined;
    products: IProduct[] | null;
    setProducts: React.Dispatch<React.SetStateAction<IProduct[] | null>>;
  };
}

function ProductForm({
  list: { id, products, setProducts },
}: ProductFormProps) {
  const [error, setError] = React.useState<null | string>(null);
  const {
    register,
    reset,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<createProductForm>();

  const onSubmit: SubmitHandler<createProductForm> = async (data) => {
    const { quantity, ...rest } = data;
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...rest, quantity: quantity ? quantity : 1 }),
      });

      const product: IProduct = await response.json();
      if (!product) setError('Não conseguimos cadastrar o produto.');

      setError(null);
      if (products) setProducts([...products, product]);
      setFocus('quantity');
      reset();
    } catch (error) {
      setError('Algo deu errado.');
    }
  };
  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit(onSubmit)}>
      <input
        className={`w-20 text-center border-2 rounded py-[1px] border-black ${
          errors.quantity ? 'outline-red-500' : 'outline-teal-300'
        }`}
        placeholder="Quant"
        type="number"
        step="0.01"
        {...register('quantity', { min: 1, max: 999 })}
      />
      <input
        className={`w-60 text-center border-2 rounded py-[1px] border-black ${
          errors.name ? 'outline-red-500' : 'outline-teal-300'
        }`}
        placeholder="Produto"
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
            errors.name || errors.quantity ? 'bg-red-500' : 'bg-teal-300'
          }
          w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-focus:ml-0 group-focus:mb-32 group-focus:translate-x-0`}
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

export default ProductForm;
