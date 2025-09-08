import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload/interface";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import axios from "axios";
import { GET_EXPERT_BY_ID } from "../graphql/queries/queries";
import { CREATE_EXPERT_TEAM, UPDATE_EXPERT_TEAM } from "../graphql/mutations/mutations";

interface FormValues {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const AddEditExpertTeam: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [imageUrl, setImageUrl] = useState<string>("");

  const { data } = useQuery(GET_EXPERT_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const [createExpert, { loading: creating }] = useMutation(CREATE_EXPERT_TEAM);
  const [updateExpert, { loading: updating }] = useMutation(UPDATE_EXPERT_TEAM);

  useEffect(() => {
    if (data?.getExpertTeamById) {
      const { name, role, bio, image } = data.getExpertTeamById;
      form.setFieldsValue({ name, role, bio });
      setImageUrl(image);
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
  
  
  const handleUpload = async (file: RcFile) => {
    try {
      const url = await uploadToCloudinary(file);
      setImageUrl(url);
      message.success("Image uploaded successfully!");
    } catch {
    }
    return false; // Prevent AntD’s default upload
  };
  
  
  const onFinish = async (values: FormValues) => {
    if (!imageUrl) {
      message.error("Please upload an image!");
      return;
    }
  
    try {
      if (id) {
        // update
        await updateExpert({
          variables: {
            id,
            updateExpertTeamInput: { ...values, image: imageUrl },
          },
        });
        message.success("Expert updated successfully!");
      } else {
        // create
        await createExpert({
          variables: {
            createExpertTeamInput: { ...values, image: imageUrl },
          },
        });
        message.success("Expert added successfully!");
      }
      navigate("/cms/home/expert-team");
    } catch (err) {
      message.error("Something went wrong!");
      console.error(err);
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full mx-auto">
      <h2 className="text-xl font-semibold mb-6">{id ? "Edit" : "Add"} Expert</h2>

      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ name: "", role: "", bio: "" }}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
          <Input placeholder="Enter role" />
        </Form.Item>

        <Form.Item label="Bio" name="bio">
          <Input.TextArea rows={4} placeholder="Enter bio" />
        </Form.Item>

        <Form.Item label="Image">
          <Upload beforeUpload={handleUpload} showUploadList={false} accept="image/*">
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {imageUrl && <img src={imageUrl} alt="preview" className="mt-4 w-32 h-32 object-cover rounded-full" />}
        </Form.Item>

        <Form.Item>
          <div className="flex gap-2">
            <Button type="primary" htmlType="submit" loading={creating || updating}>
              {id ? "Update" : "Add"} Expert
            </Button>
            <Button onClick={() => navigate("/cms/home/expert-team")}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEditExpertTeam;
