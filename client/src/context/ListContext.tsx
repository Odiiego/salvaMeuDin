import React from 'react';
import { IList, IProduct } from '../types';

type IListContext = {
  list: IList | null;
  setList: React.Dispatch<React.SetStateAction<IList | null>>;
  listMode: 'economia' | 'oferta';
  total: number;
  updateTotal(v: number): void;
  toggleListMode(): void;
  displayAddBrandForm: (productIndex: number) => boolean;
  displayUpdateProductForm(productIndex: number): boolean;
  toggleAddBrandForm(productIndex: number): void;
  toggleUpdateProductForm(productIndex: number): void;
  manipulateProductList({
    productIndex,
    product,
  }: {
    productIndex?: number | undefined;
    product?: IProduct | undefined;
  }): void;
};

export const ListContext = React.createContext<IListContext | null>(null);

export const ListContextProvider = ({ children }: React.PropsWithChildren) => {
  const [list, setList] = React.useState<IList | null>(null);
  const [total, setTotal] = React.useState(0);
  const [listMode, setListMode] = React.useState<'economia' | 'oferta'>(
    'economia',
  );
  const [addBrandForm, setAddBrandForm] = React.useState<number | null>(null);
  const [updateProductForm, setUpdateProductForm] = React.useState<
    number | null
  >(null);
  function toggleListMode() {
    setListMode((lm) => (lm === 'economia' ? 'oferta' : 'economia'));
  }
  function updateTotal(v: number) {
    setTotal((t) => t + v);
  }
  function toggleAddBrandForm(productIndex: number) {
    setAddBrandForm((i) => (i === productIndex ? null : productIndex));
  }
  function toggleUpdateProductForm(productIndex: number) {
    setUpdateProductForm((i) => (i === productIndex ? null : productIndex));
  }
  function displayAddBrandForm(productIndex: number) {
    return addBrandForm === productIndex;
  }
  function displayUpdateProductForm(productIndex: number) {
    return updateProductForm === productIndex;
  }
  function manipulateProductList({
    productIndex = undefined,
    product = undefined,
  }: {
    productIndex?: number | undefined;
    product?: IProduct | undefined;
  }) {
    const listContent = list?.content;
    if (!listContent) return;
    if (productIndex === undefined && product) listContent.push(product);
    if (product === undefined && productIndex !== undefined)
      listContent.splice(productIndex, 1);
    if (product && productIndex !== undefined)
      listContent[productIndex] = product;
    setList((l) => {
      if (!l) return l;
      return { ...l, content: listContent };
    });
  }
  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        listMode,
        total,
        manipulateProductList,
        updateTotal,
        toggleListMode,
        displayAddBrandForm,
        displayUpdateProductForm,
        toggleAddBrandForm,
        toggleUpdateProductForm,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
