import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Input,Upload } from 'antd';
import { IProduct } from '../../../types/product';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import {PlusOutlined } from '@ant-design/icons';
import axios from "axios"
interface IProps {
    products: IProduct[],
    onUpdate: (product: IProduct) => void
}
const UpdateProductPage = (props: IProps) => {
    const [urlImg, setUrlImg] = useState<String>("")

    const { id } = useParams()
    const navigate = useNavigate()
    const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
    const [product, setProduct] = useState<IProduct>() // khởi tạo biến state product có kiểu dữ liệu là IProduct
    useEffect(() => { // khi props thay đổi thì sẽ chạy useEffect này
        const currentProduct = props.products.find((product: IProduct) => product.id == String(id))
        // tìm trong mảng props.products có phần tử nào có id trùng với id trên url không
        setProduct(currentProduct) // nếu có thì set lại giá trị cho biến product
    }, [props])
    useEffect(() => { // khi biến product thay đổi thì sẽ chạy useEffect này
        setFields() // gọi hàm setFields để set lại giá trị cho các input
    }, [product])


    // upload hình ảnh lên ...
    const CLOUD_NAME = "minhduc";
    const PRESET_NAME = "freeImage";
    const FOLDER_NAME = "freeImage";
    const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const uploadImgs = async (file: RcFile | any) => {
        if (file) {
            const urls: string[] = [];
            const formData = new FormData();
            formData.append("upload_preset", PRESET_NAME);
            formData.append("folder", FOLDER_NAME);
            formData.append("file", file);
            try {
                const response = await axios.post(API_URL, formData, {
                    headers: { "Content-Type": "application/form-data" },
                });
                urls.push(response.data.url);
            } catch (error) {
                console.error("Upload image failed.");
            }
            return urls;
        }
        return [];
    };

    // ___

    const [form] = Form.useForm();
    // khởi tạo một instance của Form và gán vào biến form
    // Instance của form là một đối tượng được tạo ra bởi Ant Design để thực hiện các chức năng của form trong React

    const setFields = () => {// hàm này để set lại giá trị cho các input
        form.setFieldsValue({ // gọi hàm setFieldsValue của instance form để set lại giá trị cho các input dựa vào giá trị của biến product
            id: product?.id,
            name: product?.name,
            price: product?.price,
            description: product?.description,
            categoryId: product?.categoryId
        })
    }

    

    // upload image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        console.log(newFileList[0].originFileObj);
        const imgg = await uploadImgs(newFileList[0].originFileObj);
        setUrlImg(imgg[0])
        setFileList(newFileList)
    };

    // setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const onFinish = (values: any) => {
        
        if(urlImg){
        values.image = String(urlImg);
        }else{
            values.image = String(product?.image);
        }
        props.onUpdate(values);
        navigate('/admin/products')
    };
    return (
        <div>
            <Form
                form={form}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
            >
                {/* đoạn này cần truyền cả id vào form khi submit để lấy được giá trị id truyền lên component App */}
                <Form.Item
                    label=""
                    name="id"
                    style={{ display: 'none' }} // ẩn input này đi
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Image"
                    name="image"
                >
                    <Upload
                        // action="http://localhost:3000/products"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal> */}
                </Form.Item>
                <Form.Item
                    label="Product Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product category"
                    name="categoryId"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <Input type='number' />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateProductPage