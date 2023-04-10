import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form' //import useForm hook
import { Button, Form, Input, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { IProduct } from '../../../types/product';
import axios from "axios"
interface IProps {
    onAdd: (product: {
        name: string;
        price: number;
        image: string;
        description: string;
        categoryId: string;
    }) => any
}
interface IFormInput {
    id: number,
    name: string,
    price: number
}
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const AddProductPage = (props: IProps) => {
    const [urlImg, setUrlImg] = useState<String>("")
    // const { register, handleSubmit } = useForm<IFormInput>()
    // //register là hàm dể đăng ký các trường dữ liệu trong form
    // //handleSubmit là hàm dể xử lý khi submit form
    // const onHandleSubmit: SubmitHandler<IFormInput> = (data: IProduct) => {
    //     props.onAdd(data);
    // }


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



    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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
        console.log(urlImg);
        console.log("value", values);
        values.image = String(urlImg);
        props.onAdd(values);
    };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
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
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your images!' }]}
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
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>


            {/* <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
                <input type="text" {...register("name")} />
                <input type="number" {...register("price")} />
                <button type="submit">Add New Product</button>
            </form> */}
        </div>
    )
}

export default AddProductPage