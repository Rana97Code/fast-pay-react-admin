import { useState, useEffect } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload/interface";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROJECT, UPDATE_PROJECT } from "../../../graphql/mutations/mutations";
import { GET_PROJECT } from "../../../graphql/queries/queries";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const AddProject: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<any>(null);
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
    const [projectId, setProjectId] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();
    const { data } = useQuery(GET_PROJECT, {
        skip: !id,
        variables: { id },
    });

    const [createProject] = useMutation(CREATE_PROJECT, {
        onCompleted: () => {
            form.resetFields();
        },
        onError: (error) => {
            message.error(`Error: ${error.message}`);
        },
    });

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        onError: (error) => {
            message.error(`Error: ${error.message}`);
        },
    });

    useEffect(() => {
        if (data && id) {
            const { title, description, image, techStack, timeline, status, link } = data.getProject;
            form.setFieldsValue({ title, description, techStack, timeline, status, link });
            setImagePreview(image);
            setProjectId(id);
        }
    }, [data, id]);

    const handleImageChange = (info: any) => {
        if (info.fileList && info.fileList.length > 0) {
            setImagePreview(URL.createObjectURL(info.fileList[0].originFileObj));
            setImageFile(info.fileList[0].originFileObj);
        }
    };

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

    const handleSubmit = async (values: any) => {
        if (!imageFile) {
            message.error("Please upload a project image.");
            return;
        }

        setLoading(true);

        try {
            const imageUrl = await uploadToCloudinary(imageFile);

            const projectInput = {
                title: values.title,
                description: values.description,
                image: imageUrl,
                techStack: values.techStack,
                timeline: values.timeline,
                status: values.status,
                link: values.link,
            };

            if (projectId) {
                // Update project
                await updateProject({
                    variables: { id: projectId, input: projectInput },
                });
            } else {
                // Create new project
                await createProject({
                    variables: { input: projectInput },
                });
            }

            setLoading(false);
            message.success(projectId ? "Project updated successfully!" : "Project added successfully!");
            form.resetFields();
            setImagePreview(undefined);
            navigate('/cms/home/projects')
        } catch (error) {
            setLoading(false);
            message.error("Failed to upload image or create/update project.");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">{id ? "Edit Project" : "Add New Project"}</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Project Title" name="title" rules={[{ required: true, message: "Please input the project title!" }]}>
                    <Input placeholder="Enter project title" className="rounded-md border-gray-300"/>
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the project description!" }]}>
                    <TextArea rows={4} placeholder="Enter project description" />
                </Form.Item>

                <Form.Item label="Project Image">
                    <Upload beforeUpload={() => false} onChange={handleImageChange} showUploadList={false} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: 100, marginTop: 10 }} />}
                </Form.Item>

                <Form.Item label="Technology Stack" name="techStack" rules={[{ required: true, message: "Please select at least one technology!" }]}>
                    <Select mode="multiple" placeholder="Select technologies">
                        <Option value="react">React</Option>
                        <Option value="node">Node.js</Option>
                        <Option value="graphql">GraphQL</Option>
                        <Option value="aws">AWS</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Timeline" name="timeline" rules={[{ required: true, message: "Please input the project timeline!" }]}>
                    <Input placeholder="Enter project timeline" className="rounded-md border-gray-300"/>
                </Form.Item>

                <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please input the project status!" }]}>
                    <Select placeholder="Select project status">
                        <Option value="Completed">Completed</Option>
                        <Option value="Ongoing">Ongoing</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Project Link" name="link" rules={[{ required: true, message: "Please input the project link!" }]}>
                    <Input placeholder="Enter project link" className="rounded-md border-gray-300"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                        {id ? "Update Project" : "Add Project"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProject;
