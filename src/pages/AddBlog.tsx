import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Upload, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BLOG_POST, UPDATE_BLOG_POST } from "../graphql/mutations/mutations";
import { GET_BLOG_POST_BY_ID } from "../graphql/queries/queries";
import axios from "axios";
import { RcFile, UploadChangeParam } from "antd/es/upload/interface";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const { TextArea } = Input;

const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [authorAvatarPreview, setAuthorAvatarPreview] = useState<string | undefined>(undefined);

  const [createBlogPost] = useMutation(CREATE_BLOG_POST);
  const [updateBlogPost] = useMutation(UPDATE_BLOG_POST);

  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [authorAvatarFile, setAuthorAvatarFile] = useState<RcFile | null>(null);

  const { data } = useQuery(GET_BLOG_POST_BY_ID, {
    skip: !id, // Skip if no ID exists
    variables: { id },
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (data?.getBlogPostById && id) {
      const { title, description, category, publicationDate, readMoreLink, author, imageUrl, authorAvatar } = data.getBlogPostById;

      form.setFieldsValue({
        title,
        description,
        category,
        publicationDate: publicationDate ? dayjs(publicationDate) : null,
        readMoreLink,
        author,
      });
      setImagePreview(imageUrl);
      setAuthorAvatarPreview(authorAvatar);
    }
  }, [data, form, id]);

  const uploadToCloudinary = async (file: RcFile, preset: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      message.error("Error uploading image to Cloudinary.");
      throw new Error("Upload failed");
    }
  };

  const onFinish = async (values: any) => {
    const { title, description, category, publicationDate, readMoreLink, author } = values;

    if (!imageFile || !authorAvatarFile) {
      message.error("Please select both the blog image and author avatar.");
      return;
    }

    setIsUploading(true);

    try {
      const imageUrlUpload = await uploadToCloudinary(imageFile, import.meta.env.VITE_UPLOAD_PRESET);
      const authorAvatarUpload = await uploadToCloudinary(authorAvatarFile, import.meta.env.VITE_UPLOAD_PRESET);
      const formattedPublicationDate = publicationDate?.toISOString(); 

      if (id) {
        await updateBlogPost({
          variables: {
            id,
            updateBlogPostInput: {
              title,
              description,
              imageUrl: imageUrlUpload,
              category,
              publicationDate: formattedPublicationDate,
              readMoreLink,
              author,
              authorAvatar: authorAvatarUpload,
            },
          },
        });
        message.success("Blog post updated successfully!");
        navigate("/cms/home/blogs");
      } else {
        await createBlogPost({
          variables: {
            createBlogPostInput: {
              title,
              description,
              imageUrl: imageUrlUpload,
              category,
              publicationDate: formattedPublicationDate,
              readMoreLink,
              author,
              authorAvatar: authorAvatarUpload,
            },
          },
        });
        message.success("Blog post created successfully!");
        navigate("/cms/home/blogs");
      }

      form.resetFields();
      setImagePreview(undefined);
      setAuthorAvatarPreview(undefined);
    } catch (error) {
      message.error("Failed to upload image or create/update blog post.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (info: UploadChangeParam) => {
    if (info.fileList && info.fileList.length > 0) {
      setImagePreview(URL.createObjectURL(info.fileList[0].originFileObj as RcFile));
      setImageFile(info.fileList[0].originFileObj as RcFile);
    }
  };

  const handleAuthorAvatarChange = (info: UploadChangeParam) => {
    if (info.fileList && info.fileList.length > 0) {
      setAuthorAvatarPreview(URL.createObjectURL(info.fileList[0].originFileObj as RcFile));
      setAuthorAvatarFile(info.fileList[0].originFileObj as RcFile);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{id ? "Edit Blog" : "Add New Blog"}</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the blog title" }]}>
          <Input placeholder="Enter blog title" className="border-gray-300 rounded" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the blog description" }]}>
          <TextArea placeholder="Enter blog description" className="border-gray-300 rounded" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please enter the blog category" }]}>
          <Input placeholder="Enter blog category" className="border-gray-300 rounded" />
        </Form.Item>

        <Form.Item
          label="Publication Date"
          name="publicationDate"
          rules={[{ required: true, message: "Please select a publication date" }]}>
          <DatePicker className="w-full border-gray-300 rounded-md" />
        </Form.Item>

        <Form.Item
          label="Read More Link"
          name="readMoreLink"
          rules={[{ required: true, message: "Please enter the read more URL" }]}>
          <Input placeholder="Enter the read more link" className="border-gray-300 rounded" />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please enter the author's name" }]}>
          <Input placeholder="Enter the author's name" className="border-gray-300 rounded" />
        </Form.Item>

        <Form.Item label="Blog Image">
          <Upload
            beforeUpload={() => false}
            fileList={[]}
            onChange={handleImageChange}
            showUploadList={false}
            maxCount={1}>
            <Button icon={<PlusOutlined />}>Select Image</Button>
          </Upload>
          {imagePreview && <img src={imagePreview} alt="Blog Image Preview" style={{ width: 100, marginTop: 10 }} />}
        </Form.Item>

        <Form.Item label="Author Avatar Upload">
          <Upload
            beforeUpload={() => false}
            fileList={[]}
            onChange={handleAuthorAvatarChange}
            showUploadList={false}
            maxCount={1}>
            <Button icon={<PlusOutlined />}>Select Avatar</Button>
          </Upload>
          {authorAvatarPreview && <img src={authorAvatarPreview} alt="Author Avatar Preview" style={{ width: 100, marginTop: 10 }} />}
        </Form.Item>

        <Form.Item className="col-span-2">
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={isUploading}
            disabled={isUploading}>
            {isUploading ? "Please Wait" : id ? "Update Blog Post" : "Add Blog Post"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBlog;
