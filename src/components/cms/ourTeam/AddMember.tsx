import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  message,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from "../../../graphql/mutations/mutations";
import { GET_EMPLOYEE } from "../../../graphql/queries/queries";
import axios from "axios";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const AddMember: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: () => {
      message.success("Employee added successfully");
      form.resetFields();
    },
    onError: (error) => {
      message.error(`Error: ${error.message}`);
    },
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      message.success("Employee updated successfully");
    },
    onError: (error) => {
      message.error(`Error: ${error.message}`);
    },
  });

  const { data } = useQuery(GET_EMPLOYEE, {
    skip: !id,
    variables: { id },
  });

  useEffect(() => {
    if (data && id) {
      const {
        name,
        role,
        bio,
        email,
        phone,
        address,
        joinDate,
        status,
        linkedin,
        github,
        twitter,
        facebook,
        imageUrl,
      } = data.getEmployee;
      form.setFieldsValue({
        name,
        role,
        bio,
        email,
        phone,
        address,
        joinDate: dayjs(joinDate), // Format the joinDate using dayjs
        status,
        linkedin,
        github,
        twitter,
        facebook,
      });
      setImageUrl(imageUrl);
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: imageUrl,
        },
      ]);
    }
  }, [data, id, form]);

  const handleSubmit = async (values: any) => {
    let finalImageUrl = imageUrl;
    setLoading(true);
    if (fileList.length && fileList[0].originFileObj) {
      const formData = new FormData();
      formData.append("file", fileList[0].originFileObj);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
          formData
        );
        finalImageUrl = res.data.secure_url;
      } catch (err) {
        message.error("Image upload failed");
        return;
      }
    }

    const employeeInput = {
      name: values.name,
      role: values.role,
      bio: values.bio,
      imageUrl: finalImageUrl,
      linkedin: values.linkedin,
      github: values.github,
      twitter: values.twitter,
      facebook: values.facebook,
      email: values.email,
      phone: values.phone,
      address: values.address,
      joinDate: values.joinDate ? values.joinDate.format("YYYY-MM-DD") : "", // Format joinDate to string
      status: values.status,
    };

    setLoading(true);

    try {
      if (id) {
        // Update employee
        await updateEmployee({
          variables: { id, input: employeeInput },
        });
      } else {
        // Create new employee
        await createEmployee({
          variables: { input: employeeInput },
        });
      }

      form.resetFields();
      setFileList([]);
      setImageUrl("");
      navigate("/cms/home/team");
    } catch (error) {
      message.error("Failed to create or update employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <Title level={4}>{id ? "Edit Employee" : "Add New Employee"}</Title>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter name" }]}>
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please enter role" }]}>
          <Input placeholder="Software Engineer" />
        </Form.Item>

        <Form.Item label="Bio" name="bio">
          <Input.TextArea rows={3} placeholder="Short bio..." />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input placeholder="email@example.com" />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input placeholder="+8801XXXXXXXXX" />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input placeholder="Dhaka, Bangladesh" />
        </Form.Item>

        <Form.Item label="Join Date" name="joinDate" rules={[{ required: true }]}>
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select placeholder="Select status">
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Facebook" name="facebook">
          <Input placeholder="https://facebook.com/username" />
        </Form.Item>

        <Form.Item label="Twitter" name="twitter">
          <Input placeholder="https://twitter.com/username" />
        </Form.Item>

        <Form.Item label="LinkedIn" name="linkedin">
          <Input placeholder="https://linkedin.com/in/username" />
        </Form.Item>

        <Form.Item label="GitHub" name="github">
          <Input placeholder="https://github.com/username" />
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList)}
            fileList={fileList}
            accept="image/*"
          >
            {fileList.length < 1 && <UploadOutlined />}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {id ? "Update Employee" : "Add Employee"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMember;
