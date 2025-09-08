import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import type { UploadFile } from "antd/es/upload/interface";
import { CREATE_FOOTER_MUTATION, UPDATE_FOOTER_MUTATION } from "../../graphql/mutations/mutations";
import { GET_SITE_SETTINGS_QUERY } from "../../graphql/queries/queries";

const HeaderFooter: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { data, loading: queryLoading } = useQuery(GET_SITE_SETTINGS_QUERY);
  const [updateFooter] = useMutation(UPDATE_FOOTER_MUTATION);
  const [createFooter] = useMutation(CREATE_FOOTER_MUTATION);

  const footer = Array.isArray(data?.getSiteSettings) && data.getSiteSettings.length > 0
  ? data.getSiteSettings[0]
  : null;

  

useEffect(() => {
  if (footer) {
    form.setFieldsValue({
      phoneNumber: footer.phoneNumber,
      facebook: footer.facebook,
      instagram: footer.instagram,
      youtube: footer.youtube,
      linkedin: footer.linkedin,
      address: footer.address,
      footerText: footer.footerText,
      footerSubText: footer.footerSubText,
      footerImage: footer.footerImage,
    });
    if (footer.logo) {
      setLogoUrl(footer.logo);
      setFileList([
        {
          uid: "-1",
          name: "logo.png",
          status: "done",
          url: footer.logo,
        },
      ]);
    }
  }
}, [footer, form]);

  

  const handleImageUpload = async (file: UploadFile) => {
    const formData = new FormData();
    formData.append("file", file.originFileObj as Blob);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET as string);
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME as string);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      message.error("Image upload failed.");
      throw err;
    }
  };


  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
  
      let uploadedLogoUrl = logoUrl;
      if (fileList.length && fileList[0].originFileObj) {
        uploadedLogoUrl = await handleImageUpload(fileList[0]);
      }
  
      // Check if footer exists
      const footer = Array.isArray(data?.getSiteSettings) && data.getSiteSettings.length > 0
        ? data.getSiteSettings[0]
        : null;
  
      if (footer?.id) {
        // UPDATE existing footer
        await updateFooter({
          variables: {
            id: footer.id,  // must provide id
            input: {
              phoneNumber: values.phoneNumber,
              facebook: values.facebook,
              instagram: values.instagram,
              youtube: values.youtube,
              linkedin: values.linkedin,
              address: values.address,
              footerText: values.footerText,
              footerSubText: values.footerSubText,
              footerImage: values.footerImage,
              logo: uploadedLogoUrl,
            },
          },
        });
        message.success("Footer updated successfully!");
      } else {
        // CREATE new footer
        await createFooter({
          variables: {
            input: {
              phoneNumber: values.phoneNumber,
              facebook: values.facebook,
              instagram: values.instagram,
              youtube: values.youtube,
              linkedin: values.linkedin,
              address: values.address,
              footerText: values.footerText,
              footerSubText: values.footerSubText,
              footerImage: values.footerImage,
              logo: uploadedLogoUrl,
            },
          },
        });
        message.success("Footer created successfully!");
      }
  
    } catch (err: any) {
      message.error("Error saving footer: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  

  
  
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Header & Footer Settings</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="facebook" label="Facebook">
          <Input />
        </Form.Item>

        <Form.Item name="instagram" label="Instagram">
          <Input />
        </Form.Item>

        <Form.Item name="youtube" label="YouTube">
          <Input />
        </Form.Item>

        <Form.Item name="linkedin" label="LinkedIn">
          <Input />
        </Form.Item>

        <Form.Item name="footerText" label="Footer Text">
          <Input />
        </Form.Item>

        <Form.Item name="footerSubText" label="Footer Sub Text">
          <Input />
        </Form.Item>

        <Form.Item name="footerImage" label="Footer Image URL">
          <Input />
        </Form.Item>

        <Form.Item label="Logo Upload" className="col-span-2">
          <Upload
            beforeUpload={(file) => {
              setFileList([file]);
              return false;
            }}
            fileList={fileList}
            listType="picture"
            onChange={({ fileList }) => setFileList(fileList)}
            showUploadList={{ showRemoveIcon: true }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select Logo</Button>
          </Upload>
        </Form.Item>

        <Form.Item className="col-span-2">
          <Button type="primary" htmlType="submit" loading={loading || queryLoading}>
            {loading ? "Updating..." : "Update Footer"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HeaderFooter;
