import React, { useState } from "react";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT_VALUE } from "../../../graphql/mutations/mutations";
import axios from "axios";
import { RcFile } from "antd/es/upload/interface";
import { useNavigate } from "react-router";

const { Option } = Select;

const AddClientValue: React.FC = () => {
   const navigate = useNavigate();
  const [form] = Form.useForm();
  const [type, setType] = useState<string>("image");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<RcFile | null>(null);

  const [createClientValue] = useMutation(CREATE_CLIENT_VALUE);


  const handleSubmit = async (values: { type: string; title: string; description: string; src: any }) => {
    setIsSubmitting(true);

    if (type === "image" && !imageFile) {
      message.error("Please upload an image.");
      setIsSubmitting(false);
      return;
    }

    try {
      const imageUrl = type === "image" && imageFile ? await uploadToCloudinary(imageFile) : null;

      await createClientValue({
        variables: {
          input: {
            type,
            title: values.title,
            description: values.description,
            src: imageUrl,
          },
        },
      });

      message.success("Client value added successfully!");
      form.resetFields();
      setImageFile(null);
      navigate("/cms/home/clients-value")
    } catch (error) {
      message.error("Failed to upload image or create client value.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadToCloudinary = async (file: RcFile) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
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

  const handleImageChange = ({ fileList }: any) => {
    if (fileList && fileList.length > 0) {
      setImageFile(fileList[0].originFileObj as RcFile);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Add New Client Value</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4">
        <Form.Item
          label="Type"
          name="type"
          initialValue={type}
          rules={[{ required: true, message: "Please select the type" }]}>
          <Select value={type} onChange={(value) => setType(value)} style={{ width: 250 }}>
            <Option value="image">Image</Option>
            <Option value="text">Text</Option>
          </Select>
        </Form.Item>

        {type === "image" && (
          <Form.Item
            label="Upload Image"
            name="src"
            rules={[{ required: type === "image", message: "Please upload an image" }]}>
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
              onChange={handleImageChange}
              beforeUpload={() => false}
              accept="image/*"
              maxCount={1}
            >
              <div>
                <PlusOutlined />
                <div>Click to Upload</div>
              </div>
            </Upload>
          </Form.Item>
        )}

        {type === "text" && (
          <>
            <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter the title" }]}>
              <Input placeholder="Enter title" className="border-gray-300 rounded" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter the description" }]}>
              <Input.TextArea placeholder="Enter description" className="border-gray-300 rounded" />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? "Creating..." : "Add Client Value"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddClientValue;
