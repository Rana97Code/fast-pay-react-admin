import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  Modal,
  Table,
  Space,
  message,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BENEFITS } from "../../../graphql/queries/benefit.queries";
import {
  CREATE_BENEFITS,
  DELETE_BENEFITS,
  UPDATE_BENEFIT,
} from "../../../graphql/mutations/benefit.mutations";
import * as FaIcons from "react-icons/fa"; // Import all Fa icons
const { Title } = Typography;

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  createdAt: string;
}

const ManageBenefits = () => {
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BenefitItem | null>(null);

  // Fetch benefits data using GET_BENEFITS query
  const { data, loading, error } = useQuery(GET_BENEFITS);

  // Local state for data to ensure we're controlling the table data
  useEffect(() => {
    if (data) {
      setBenefitsData(data.getBenefits);
    }
  }, [data]);

  const [benefitsData, setBenefitsData] = useState<BenefitItem[]>([]);

  // Initialize the create mutation
  const [createBenefit] = useMutation(CREATE_BENEFITS);

  // Initialize the delete mutation
  const [deleteBenefit] = useMutation(DELETE_BENEFITS);

  // Initialize the update mutation
  const [updateBenefit] = useMutation(UPDATE_BENEFIT);

  // Handle form submission to either add or update a benefit
  const handleSubmit = async (values: Omit<BenefitItem, "id">) => {
    if (editing) {
      // Update existing benefit using updateBenefit mutation
      try {
        const { data } = await updateBenefit({
          variables: {
            id: editing.id, // Pass the id of the benefit being updated
            title: values.title,
            description: values.description,
            icon: values.icon,
          },
        });

        if (data.updateBenefit) {
          setBenefitsData((prev) =>
            prev.map((item) =>
              item.id === editing.id ? data.updateBenefit : item
            )
          );
          message.success("Benefit updated successfully");
        } else {
          message.error("Failed to update benefit");
        }
      } catch (err) {
        console.log(err);
        message.error("Error updating benefit");
      }
      setEditing(null);
    } else {
      // Create a new benefit using createBenefit mutation
      try {
        const { data } = await createBenefit({
          variables: {
            title: values.title,
            description: values.description,
            icon: values.icon,
          },
        });

        if (data.createBenefit) {
          setBenefitsData((prev) => [...prev, data.createBenefit]);
          message.success("Benefit added successfully");
        } else {
          message.error("Failed to add benefit");
        }
      } catch (err) {
        console.log(err);
        message.error("Error adding benefit");
      }
    }

    form.resetFields();
    setModalOpen(false);
  };

  const handleEdit = (item: BenefitItem) => {
    setEditing(item);
    form.setFieldsValue(item);
    setModalOpen(true);
  };

  // Handle delete functionality with mutation
  const handleDelete = async (id: string) => {
    try {
      const { data } = await deleteBenefit({
        variables: { id },
      });

      if (data.deleteBenefit) {
        setBenefitsData((prev) => prev.filter((item) => item.id !== id));
        message.success("Benefit deleted successfully");
      } else {
        message.error("Failed to delete benefit");
      }
    } catch (err) {
      console.log(err);
      message.error("Error deleting benefit");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading benefits data</div>;

  // Generate a list of available icons for the select dropdown
  const iconOptions = Object.keys(FaIcons).map((key) => ({
    label: key,
    value: key,
  }));

  return (
    <div className="max-w-6xl p-6 mx-auto bg-white shadow rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <Title level={4} className="!mb-0">
          Manage Benefits & Perks
        </Title>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            setModalOpen(true);
            form.resetFields();
            setEditing(null);
          }}
        >
          Add Benefit
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={benefitsData}
        pagination={false}
        columns={[
          {
            title: "Icon",
            dataIndex: "icon",
            render: (icon: string) => {
              const IconComponent = FaIcons[icon as keyof typeof FaIcons]; // Dynamically load the correct icon
              return IconComponent ? <IconComponent size={24} /> : null;
            },
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Description",
            dataIndex: "description",
          },
          {
            title: "Created At",
            dataIndex: "createdAt",
            render: (createdAt: string) => new Date(createdAt).toLocaleString(), // Format the createdAt
          },
          {
            title: "Actions",
            render: (_, record: BenefitItem) => (
              <Space>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                />
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(record.id)} // Pass dynamic id to handleDelete
                />
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={editing ? "Edit Benefit" : "Add Benefit"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input
              placeholder="e.g. Work-Life Balance"
              className="border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="e.g. Flexible hours, holidays, etc."
              className="border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            label="Icon"
            name="icon"
            rules={[{ required: true, message: "Please select an icon" }]}
          >
            <Select
              placeholder="Select an icon"
              options={iconOptions}
              className="w-full"
            />
          </Form.Item>

          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">
              {editing ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBenefits;
