import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, message, DatePicker, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CHAIRMAN } from "../graphql/queries/queries";
import { CREATE_CHAIRMAN, UPDATE_CHAIRMAN } from "../graphql/mutations/mutations";
import axios from "axios";
import { RcFile, UploadChangeParam } from "antd/es/upload/interface";

const { TextArea } = Input;

const ChairmanSettings: React.FC = () => {
  const [form] = Form.useForm();

  // State for 2 images
  const [imageFile1, setImageFile1] = useState<RcFile | null>(null);
  const [imagePreview1, setImagePreview1] = useState<string | undefined>(undefined);

  const [imageFile2, setImageFile2] = useState<RcFile | null>(null);
  const [imagePreview2, setImagePreview2] = useState<string | undefined>(undefined);

  const { data, loading } = useQuery(GET_CHAIRMAN);
  console.log(loading);
  const [createChairman, { loading: saving }] = useMutation(CREATE_CHAIRMAN);
  const chairmanId = data?.getChairmen?.[0]?.id;
  const [updateChairman, { loading: updating }] = useMutation(UPDATE_CHAIRMAN);
console.log(updating);

  useEffect(() => {
    if (data?.getChairmen?.length) {
      const chairman = data.getChairmen[0];
      form.setFieldsValue({
        name: chairman.name,
        designation: chairman.designation,
        qualifications: chairman.qualifications.join(", "),
        bio: chairman.bio || "",
      });
  
      setImagePreview1(chairman.profileImage);
      setImagePreview2(chairman.qualificationImage);
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

  const onFinish = async (values: any) => {
    try {
      let profileImage = imagePreview1;
      let qualificationImage = imagePreview2;
  
      if (imageFile1) profileImage = await uploadToCloudinary(imageFile1);
      if (imageFile2) qualificationImage = await uploadToCloudinary(imageFile2);
  
      const input = {
        name: values.name,
        designation: values.designation,
        qualifications: values.qualifications.split(",").map((q: string) => q.trim()),
        bio: values.bio,
        profileImage,
        qualificationImage,
      };
  
      if (chairmanId) {
        // Update existing chairman
        await updateChairman({
          variables: {
            id: chairmanId,
            updateChairmanInput: input,
          },
        });
        message.success("Chairman updated successfully!");
      } else {
        // Create new chairman
        await createChairman({
          variables: { createChairmanInput: input },
        });
        message.success("Chairman created successfully!");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to save chairman details.");
    }
  };
  
  

  const handleImageChange1 = (info: UploadChangeParam) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj as RcFile;
      setImageFile1(file);
      setImagePreview1(URL.createObjectURL(file));
    }
  };

  const handleImageChange2 = (info: UploadChangeParam) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj as RcFile;
      setImageFile2(file);
      setImagePreview2(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Top profile preview */}
      {data?.getChairman && (
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex gap-4">
            <Avatar
              size={64}
              src={imagePreview1 || data.getChairman.image1Url}
              icon={<UserOutlined />}
            />
            <Avatar
              size={64}
              src={imagePreview2 || data.getChairman.image2Url}
              icon={<UserOutlined />}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {data.getChairman.name || "No Name Set"}
            </h3>
            <p className="text-sm text-gray-500">
              {data.getChairman.designation || "No Designation"}
            </p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Chairman Settings</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name + Designation */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the chairman's name" }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          label="Designation"
          name="designation"
          rules={[{ required: true, message: "Please enter designation" }]}
        >
          <Input placeholder="e.g. Chairman, FastPay IT Ltd." />
        </Form.Item>

        <Form.Item label="Qualifications" name="qualifications">
          <Input placeholder="Enter qualifications" />
        </Form.Item>

        <Form.Item label="Join Date" name="joinDate">
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          label="Biography"
          name="biography"
          className="col-span-2"
          rules={[{ required: true, message: "Please enter a biography" }]}
        >
          <TextArea rows={4} placeholder="Enter biography" />
        </Form.Item>

        {/* Two image upload fields */}
        <Form.Item label="Profile Image 1" className="col-span-1">
          <Upload
            beforeUpload={() => false}
            fileList={[]}
            onChange={handleImageChange1}
            showUploadList={false}
            maxCount={1}
          >
            <Button icon={<PlusOutlined />}>Select Image 1</Button>
          </Upload>
          {imagePreview1 && (
            <img src={imagePreview1} alt="Preview 1" style={{ width: 120, marginTop: 10 }} />
          )}
        </Form.Item>

        <Form.Item label="Profile Image 2" className="col-span-1">
          <Upload
            beforeUpload={() => false}
            fileList={[]}
            onChange={handleImageChange2}
            showUploadList={false}
            maxCount={1}
          >
            <Button icon={<PlusOutlined />}>Select Image 2</Button>
          </Upload>
          {imagePreview2 && (
            <img src={imagePreview2} alt="Preview 2" style={{ width: 120, marginTop: 10 }} />
          )}
        </Form.Item>

        {/* Submit */}
        <Form.Item className="col-span-2">
          <Button type="primary" htmlType="submit" loading={saving}>
            {saving ? "Saving..." : "Save Chairman"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChairmanSettings;
