import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormStatus, IProduct } from '../types';
import { SquarePen } from 'lucide-react';
import IconButton from './IconButton';

type updateProductForm = {
  quantity: number;
  price: number;
  name: string;
};

interface UpdateProductFormProps {
  product: {
    product: IProduct;
    updateProductList: (product: IProduct, deleteProduct: boolean) => void;
  };
  form: {
    formStatus: IFormStatus;
    setFormStatus: React.Dispatch<React.SetStateAction<IFormStatus>>;
  };
}

function UpdateProductForm({
  product: { product, updateProductList },
  form: { formStatus, setFormStatus },
}: UpdateProductFormProps) {
  const [error, setError] = React.useState<null | string>(null);
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<updateProductForm>();

  React.useEffect(() => {
    setFocus('quantity');
  }, [setFocus]);

  const onSubmit: SubmitHandler<updateProductForm> = async (data) => {
    const { quantity, ...rest } = data;
    try {
      const response = await fetch(
        `http://localhost:8080/products/${product._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            ...rest,
            quantity: quantity ? quantity : product.quantity,
          }),
        },
      );

      const updatedProduct: IProduct = await response.json();
      if (!updatedProduct) setError('Não conseguimos atualizar o produto.');
      setFormStatus({ ...formStatus, updateProductForm: null });
      updateProductList(updatedProduct, false);
      setError(null);
    } catch (error) {
      console.log(error);
      setError('Algo deu errado.');
    }
  };

  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={product.quantity}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setFocus('name');
          }
        }}
        className={`w-14 pl-3 border-2 rounded py-[1px] bg-aquamarine-50 border-aquamarine-950 ${
          errors.quantity ? 'outline-red-500' : 'outline-aquamarine-600'
        }`}
        placeholder="Quant"
        type="number"
        step="0.01"
        {...register('quantity', { min: 1, max: 999 })}
      />
      <input
        defaultValue={product.name}
        className={`w-[214px] pl-4 border-2 rounded py-[1px] bg-aquamarine-50 border-aquamarine-950 ${
          errors.name ? 'outline-red-500' : 'outline-aquamarine-600'
        }`}
        placeholder="Produto"
        type="text"
        {...register('name', { required: true })}
      />
      {error && <span>{error}</span>}
      <IconButton errors={Boolean(errors.name || errors.quantity)}>
        <SquarePen strokeWidth={1.5} size={30} />
      </IconButton>
    </form>
  );
}

export default UpdateProductForm;
