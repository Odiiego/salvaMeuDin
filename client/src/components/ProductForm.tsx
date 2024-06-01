import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IProduct } from '../types';
import { SquarePlus } from 'lucide-react';
import IconButton from './IconButton';

type createProductForm = {
  quantity: number;
  name: string;
};

interface ProductFormProps {
  list: {
    id: string | undefined;
    updateProductList: (product: IProduct, deleteProduct: boolean) => void;
  };
}

function ProductForm({ list: { id, updateProductList } }: ProductFormProps) {
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
      updateProductList(product, false);
      setFocus('quantity');
      reset();
    } catch (error) {
      setError('Algo deu errado.');
    }
  };
  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit(onSubmit)}>
      <input
        className={`w-14 text-center border-2 rounded py-[1px] bg-aquamarine-50 border-aquamarine-950 ${
          errors.quantity ? 'outline-red-500' : 'outline-aquamarine-600'
        }`}
        placeholder="Quant"
        type="number"
        step="0.01"
        {...register('quantity', { min: 1, max: 999 })}
      />
      <input
        className={`w-[248px] text-center border-2 rounded py-[1px] bg-aquamarine-50 border-aquamarine-950 ${
          errors.name ? 'outline-red-500' : 'outline-aquamarine-600'
        }`}
        placeholder="Produto"
        type="text"
        {...register('name', { required: true })}
      />
      {error && <span>{error}</span>}

      <IconButton errors={Boolean(errors.name || errors.quantity)}>
        <SquarePlus strokeWidth={1.5} size={30} />
      </IconButton>
    </form>
  );
}

export default ProductForm;
