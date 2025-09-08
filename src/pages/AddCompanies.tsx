import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMPANY, UPDATE_COMPANY } from "../graphql/mutations/mutations";
import { GET_COMPANY_BY_ID } from "../graphql/queries/queries";
import axios from "axios";
import type { RcFile } from "antd/es/upload/interface";

const AddCompanies: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [imageUrl, setImageUrl] = useState<string>("");

  const { data } = useQuery(GET_COMPANY_BY_ID, { variables: { id }, skip: !id });
  const [createCompany] = useMutation(CREATE_COMPANY);
  const [updateCompany] = useMutation(UPDATE_COMPANY);

  useEffect(() => {
    if (data?.getCompanyById) {
      form.setFieldsValue(data.getCompanyById);
      if (data.getCompanyById.logo) setImageUrl(data.getCompanyById.logo);
    }
  }, [data, form]);

  const uploadToCloudinary = async (file: RcFile) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET as string);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data.secure_url;
    } catch (err: any) {
      console.error("Cloudinary upload error:", err.response?.data || err.message);
      message.error("Image upload failed. Please check Cloudinary config.");
      throw err;
    }
  };

  const handleUpload = async (file: RcFile) => {
    const url = await uploadToCloudinary(file);
    setImageUrl(url);
    // Update the form field "logo" with the uploaded URL
    form.setFieldsValue({ logo: url });
    return false; // prevent default upload behavior
  };

  const handleSubmit = async (values: any) => {
    try {
      if (id) {
        await updateCompany({ variables: { id, updateCompanyInput: values } });
        message.success("Company updated successfully!");
      } else {
        await createCompany({ variables: { createCompanyInput: values } });
        message.success("Company created successfully!");
      }
      navigate("/cms/home/companies");
    } catch {
      message.error("Something went wrong.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4">{id ? "Edit Company" : "Add Company"}</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Company Name" rules={[{ required: true }]}>
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Form.Item name="href" label="Website URL" rules={[{ required: true }]}>
          <Input placeholder="Enter company website URL" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter company description" rows={3} />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input placeholder="Enter company address" />
        </Form.Item>

        <Form.Item name="phoneNumber" label="Phone Number">
          <Input placeholder="Enter company phone number" />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input placeholder="Enter company email" />
        </Form.Item>

        {/* Logo Upload */}
        <Form.Item label="Company Logo">
          <Upload
            beforeUpload={handleUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload Logo</Button>
          </Upload>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Company Logo"
              className="mt-4 w-32 h-32 object-cover rounded-full"
            />
          )}
        </Form.Item>

        <Form.Item name="logo" hidden /> {/* hidden field to store logo URL */}

        <Button type="primary" htmlType="submit">
          {id ? "Update" : "Create"}
        </Button>
      </Form>
    </div>
  );
};

export default AddCompanies;
