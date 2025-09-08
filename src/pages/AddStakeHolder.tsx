import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload/interface";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import axios from "axios";
import { GET_STAKEHOLDER_BY_ID } from "../graphql/queries/queries";
import { CREATE_STAKEHOLDER, UPDATE_STAKEHOLDER } from "../graphql/mutations/mutations";

interface FormValues {
  name: string;
  position: string;
  bio: string;
  notableWorks: string;
  image: string;
}

const AddEditStakeholder: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [imageUrl, setImageUrl] = useState<string>("");

  const { data } = useQuery(GET_STAKEHOLDER_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const [createStakeholderInput, { loading: creating }] = useMutation(CREATE_STAKEHOLDER);
  const [updateStakeholder, { loading: updating }] = useMutation(UPDATE_STAKEHOLDER);

  useEffect(() => {
    if (data?.getStakeholderById) {
      const { name, position, bio, notableWorks, image } = data.getStakeholderById;
      form.setFieldsValue({
        name,
        position,
        bio,
        notableWorks: notableWorks.join(", "),
      });
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
    const url = await uploadToCloudinary(file);
    setImageUrl(url);
    message.success("Image uploaded successfully!");
    return false; // Prevent default upload behavior
  };

  const onFinish = async (values: FormValues) => {
    if (!imageUrl) {
      message.error("Please upload an image!");
      return;
    }
  
    const payload = {
      name: values.name,
      position: values.position,
      bio: values.bio,
      notableWorks: values.notableWorks.split(",").map((w) => w.trim()),
      image: imageUrl, // ✅ Include the uploaded image URL
    };
  
    try {
      if (id) {
        await updateStakeholder({ variables: { id, updateStakeholderInput: payload } });
        message.success("Stakeholder updated successfully!");
      } else {
        await createStakeholderInput({ variables: { createStakeholderInput: payload } });
        message.success("Stakeholder added successfully!");
      }
  
      navigate("/cms/home/stakeholders");
    } catch (err) {
      console.error(err);
      message.error("Something went wrong!");
    }
  };
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full mx-auto">
      <h2 className="text-xl font-semibold mb-6">{id ? "Edit" : "Add"} Stakeholder</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ name: "", position: "", bio: "", notableWorks: "" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the stakeholder's name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true, message: "Please enter the position" }]}
        >
          <Input placeholder="Enter position" />
        </Form.Item>

        <Form.Item
          label="Bio"
          name="bio"
          rules={[{ required: true, message: "Please enter bio" }]}
        >
          <Input.TextArea placeholder="Enter bio" rows={4} />
        </Form.Item>

        <Form.Item label="Notable Works (comma separated)" name="notableWorks">
          <Input placeholder="Enter notable works separated by comma" />
        </Form.Item>

        <Form.Item label="Image">
          <Upload
            beforeUpload={handleUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="preview"
              className="mt-4 w-32 h-32 object-cover rounded-full"
            />
          )}
        </Form.Item>

        <Form.Item>
          <div className="flex gap-2">
            <Button
              type="primary"
              htmlType="submit"
              loading={creating || updating}
            >
              {id ? "Update" : "Add"} Stakeholder
            </Button>
            <Button onClick={() => navigate("/cms/home/stakeholders")}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEditStakeholder;
