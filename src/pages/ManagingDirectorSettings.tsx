import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, message, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MANAGING_DIRECTOR } from "../graphql/queries/queries";
import { CREATE_MANAGING_DIRECTOR , UPDATE_MANAGING_DIRECTOR} from "../graphql/mutations/mutations";
import axios from "axios";
import { RcFile, UploadChangeParam } from "antd/es/upload/interface";

const { TextArea } = Input;

const ManagingDirectorSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const { data, loading } = useQuery(GET_MANAGING_DIRECTOR);
  console.log(loading);
  const [createManagingDirector, { loading: saving }] = useMutation(CREATE_MANAGING_DIRECTOR);
  const [updateManagingDirector] = useMutation(UPDATE_MANAGING_DIRECTOR);

  useEffect(() => {
    if (data?.getManagingDirector?.length > 0) {
      const md = data.getManagingDirector[0]; 
      const { name, designation, bio, achievements, image } = md;
  
      form.setFieldsValue({
        name,
        designation,
        bio,
        achievements: achievements?.join(", ") || "",
      });
  
      setImagePreview(image);
    }
  }, [data, form]);
  

  const uploadToCloudinary = async (file: RcFile) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
  
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

  const handleImageChange = (info: UploadChangeParam) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj as RcFile;
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onFinish = async (values: any) => {
    try {
      let imageUrl = imagePreview;
      if (imageFile) imageUrl = await uploadToCloudinary(imageFile);
  
      if (data?.getManagingDirector?.id) {
        // Update existing Managing Director
        await updateManagingDirector({
          variables: {
            id: data.getManagingDirector.id,
            updateManagingDirectorInput: {
              name: values.name,
              designation: values.designation,
              bio: values.bio,
              achievements: values.achievements,
              image: imageUrl,
            },
          },
        });
        message.success("Managing Director updated successfully!");
      } else {
        // Create new Managing Director
        await createManagingDirector({
          variables: {
            createManagingDirectorInput: {
              name: values.name,
              designation: values.designation,
              bio: values.bio,
              achievements: values.achievements,
              image: imageUrl,
            },
          },
        });
        message.success("Managing Director added successfully!");
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to save Managing Director.");
    }
  };
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Top preview */}
      {data?.getManagingDirector && (
        <div className="flex items-center space-x-4 mb-6">
          <Avatar size={64} src={imagePreview || data.getManagingDirector.imageUrl} icon={<UserOutlined />} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{data.getManagingDirector.name || "No Name Set"}</h3>
            <p className="text-sm text-gray-500">{data.getManagingDirector.designation || "No Designation"}</p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Managing Director Settings</h2>

      <Form form={form} layout="vertical" onFinish={onFinish} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item label="Designation" name="designation" rules={[{ required: true }]}>
          <Input placeholder="e.g. Managing Director, FastPay IT Ltd." />
        </Form.Item>

        <Form.Item label="Biography" name="biography" className="col-span-2">
          <TextArea rows={4} placeholder="Enter biography" />
        </Form.Item>

        <Form.Item label="Notable Works / Projects" name="notableWorks" className="col-span-2">
          <TextArea rows={4} placeholder="Enter works/projects separated by line" />
        </Form.Item>

        <Form.Item label="Profile Image" className="col-span-2">
          <Upload beforeUpload={() => false} fileList={[]} onChange={handleImageChange} showUploadList={false} maxCount={1}>
            <Button icon={<PlusOutlined />}>Select Image</Button>
          </Upload>
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: 120, marginTop: 10 }} />}
        </Form.Item>

        <Form.Item className="col-span-2">
          <Button type="primary" htmlType="submit" loading={saving}>
            {saving ? "Saving..." : "Save Managing Director"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ManagingDirectorSettings;
