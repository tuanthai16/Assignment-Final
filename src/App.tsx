import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { Routes, Route, useNavigate } from "react-router-dom";

// Admin
// Client
import HomePage from "./pages/client/Home";
import Content from "./pages/client/Content";
import ProductList from "./pages/client/Product/ProductList";
import ProductDetails from "./pages/client/Product/ProductDetails";
import LoginPage from "./pages/client/auth/login";
import RegPage from "./pages/client/auth/reg";
import AdminLayout from "./pages/admin/layouts/AdminLayout";
import ProductManagementPage from "./pages/admin/products/ProductManagementPage";
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/product'
import { IProduct } from "./types/product";
import AddProductPage from "./pages/admin/products/AddProduct";
import UpdateProductPage from "./pages/admin/products/UpdateProduct";
import {message} from "antd"
function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data))
  }, [])
  const onHandleRemove = (id: string) => {
    
    deleteProduct(id).then(() => setProducts(products.filter((item: IProduct) => item.id !== id)))
    message.success("Xóa sản phẩm thành công", 1.5)
  }
  const onHandleAdd = (product: { name: string;
    price: number;
    image: string;
    description: string;
    categoryId: string;}) => {
    addProduct(product).then(() => getAllProduct().then(({ data }) => setProducts(data)))
    message.success("Thêm sản phẩm thành công", 1.5)
    navigate("/admin/products");

  }
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() => getAllProduct().then(({ data }) => setProducts(data)))
    message.success("Cập nhật sản phẩm thành công", 1.5)
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<Content />} />
        <Route path="products" element={<ProductList />} />
        <Route path="productDetails/:id" element={<ProductDetails />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="reg" element={<RegPage />} />
      </Route>

      <Route path='/admin' element={<AdminLayout />}>
          {/* <Route index element={<Dashboard />} /> */}
          <Route path='products'>
            <Route index element={<ProductManagementPage products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProductPage onAdd={onHandleAdd} />} />
            <Route path=':id/update' element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} />} />
          </Route>
        </Route>
    </Routes>
  );
}

export default App;