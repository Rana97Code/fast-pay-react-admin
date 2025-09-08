import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { RcFile, UploadChangeParam } from "antd/es/upload/interface";
import axios from "axios";
import { CREATE_CASE_STUDY, UPDATE_CASE_STUDY } from "../../../graphql/mutations/mutations";
import { GET_CASE_STUDY } from "../../../graphql/queries/queries";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;

const AddCaseStudy: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [editing, setEditing] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { id } = useParams();
  const [createCaseStudy] = useMutation(CREATE_CASE_STUDY);
  const [updateCaseStudy] = useMutation(UPDATE_CASE_STUDY);

  const { data: caseStudyData } = useQuery(GET_CASE_STUDY, {
    skip: !id,
    variables: { id },
  });

  const handleSubmit = async (values: { title: string; category: string; subCategory: string; description: string }) => {
    setIsSubmitting(true);

    try {
      let iconUrl = imageUrl;

      if (fileList.length > 0 && fileList[0].originFileObj) {
        const formData = new FormData();
        formData.append("file", fileList[0].originFileObj);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
          formData
        );

        iconUrl = res.data.secure_url;
      }

      if (editing) {
        await updateCaseStudy({
          variables: {
            id: id!,
            input: {
              title: values.title,
              category: values.category,
              subCategory: values.subCategory,
              icon: iconUrl,
              description: values.description,
            },
          },
        });
        message.success("Case study updated successfully!");
        navigate("/cms/home/case-studies");
      } else {
        await createCaseStudy({
          variables: {
            input: {
              title: values.title,
              category: values.category,
              subCategory: values.subCategory,
              icon: iconUrl,
              description: values.description,
            },
          },
        });
        message.success("Case study added successfully!");
        navigate("/cms/home/case-studies");
      }

      form.resetFields();
      setFileList([]);
      setImageUrl("");
      setEditing(false);
    } catch (error) {
      message.error("Failed to create/update case study.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (caseStudyData?.getCaseStudy && id) {
      const { title, category, subCategory, icon, description } = caseStudyData.getCaseStudy;
      form.setFieldsValue({
        title,
        category,
        subCategory,
        description,
      });
      setImageUrl(icon);
      setEditing(true);
    }
  }, [caseStudyData, id, form]);

  const handleImageChange = (info: UploadChangeParam) => {
    if (info.fileList && info.fileList.length > 0) {
      setFileList(info.fileList);
      setImageUrl(URL.createObjectURL(info.fileList[0].originFileObj as RcFile));
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">{editing ? "Edit Case Study" : "Add New Case Study"}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the case study title" }]}>
          <Input placeholder="Enter case study title" className="border-gray-300 rounded" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please enter the case study category" }]}>
          <Input placeholder="Enter case study category" className="border-gray-300 rounded" />
        </Form.Item>

        <Form.Item
          label="SubCategory"
          name="subCategory"
          rules={[{ required: true, message: "Please enter the case study subcategory" }]}>
          <Input placeholder="Enter case study subcategory" className="border-gray-300 rounded" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the case study description" }]}>
          <TextArea placeholder="Enter case study description" className="border-gray-300 rounded" />
        </Form.Item>

        <Form.Item label="Upload Icon (Image)">
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleImageChange}
            showUploadList={false}
            accept="image/*"
            maxCount={1}
          >
            <Button>Select Icon</Button>
          </Upload>
          {imageUrl && <img src={imageUrl} alt="Icon Preview" style={{ width: 100, marginTop: 10 }} />}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Submitting..." : editing ? "Update Case Study" : "Add Case Study"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCaseStudy;
