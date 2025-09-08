import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Modal,
  Space,
  Typography,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import * as FaIcons from "react-icons/fa"; // Import all icons from react-icons/fa
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TECH_ITEM, UPDATE_TECH_ITEM, DELETE_TECH_ITEM } from "../graphql/mutations/mutations";
import { GET_ALL_TECH_ITEMS } from "../graphql/queries/queries";

const { Title } = Typography;

const iconKeys = Object.keys(FaIcons); // List of icon keys from FaIcons

interface TechItem {
  id: string;
  name: string;
  icon: string;
}

const TechnologyStack: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<TechItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TechItem | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string>("FaBeer");

  // Fetch data using GraphQL query
  const { loading, data: techData } = useQuery(GET_ALL_TECH_ITEMS);

  // Mutation Hooks
  const [createTechItem] = useMutation(CREATE_TECH_ITEM, {
    refetchQueries: [{ query: GET_ALL_TECH_ITEMS }],
  });

  const [updateTechItem] = useMutation(UPDATE_TECH_ITEM, {
    refetchQueries: [{ query: GET_ALL_TECH_ITEMS }],
  });

  const [deleteTechItem] = useMutation(DELETE_TECH_ITEM, {
    refetchQueries: [{ query: GET_ALL_TECH_ITEMS }],
  });

  // Handle form submission
  const handleSubmit = async (values: { name: string }) => {
    try {
      let iconName = selectedIcon || "";

      if (editing) {
        // If editing, update the tech item
        await updateTechItem({
          variables: {
            id: editing.id,
            input: { name: values.name, icon: iconName },
          },
        });
      } else {
        // If creating, create a new tech item
        await createTechItem({
          variables: {
            input: { name: values.name, icon: iconName },
          },
        });
      }

      form.resetFields();
      setEditing(null);
      setSelectedIcon("FaBeer");
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      message.error("An error occurred");
    }
  };

  const handleEdit = (item: TechItem) => {
    setEditing(item);
    form.setFieldsValue({ name: item.name });
    setSelectedIcon(item.icon);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      onOk: () => {
        deleteTechItem({ variables: { id } });
      },
    });
  };

  // On successful data fetch, set the fetched items into state
  React.useEffect(() => {
    if (techData?.getAllTechItems) {
      setData(techData.getAllTechItems);
    }
  }, [techData]);

  // Render a grid of icons inside the custom scrollable div
  const renderIconGrid = () => {
    const iconRows = [];
    for (let i = 0; i < iconKeys.length; i += 8) {
      const iconRow = iconKeys.slice(i, i + 8); // Show 8 icons per row
      iconRows.push(
        <div key={`group-${i}`} className="flex gap-2 mb-2">
          {iconRow.map((iconKey) => {
            const IconComponent = FaIcons[iconKey as keyof typeof FaIcons];
            return (
              <div
                key={iconKey}
                className={`cursor-pointer ${selectedIcon === iconKey ? "border-2 border-blue-500" : ""}`}
                onClick={() => setSelectedIcon(iconKey)}
                style={{
                  padding: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "4px",
                }}
              >
                <IconComponent size={30} />
              </div>
            );
          })}
        </div>
      );
    }
    return iconRows;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="!mb-0">
          Manage Technology Stack
        </Title>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            form.resetFields();
            setEditing(null);
            setSelectedIcon("FaBeer");
            setModalOpen(true);
          }}
        >
          Add Technology
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={data}
        pagination={false}
        loading={loading}
        columns={[
          {
            title: "Icon",
            key: "icon",
            render: (_, record) => {
              const IconComponent = FaIcons[record.icon as keyof typeof FaIcons];
              return IconComponent ? <IconComponent size={30} /> : null;
            },
          },
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(record.id)}
                />
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={editing ? "Edit Technology" : "Add Technology"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Technology Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input
              placeholder="e.g. React, NestJS"
              className="rounded-lg border border-gray-300 focus:border-gray-600"
            />
          </Form.Item>


          <Form.Item label="Select Icon">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "300px", // Adjust the height as needed
                overflowY: "auto",
                padding: "8px",
              }}
            >
              {/* Preview the selected icon */}
              <div className="mb-4 flex justify-center items-center">
                <div style={{ padding: "8px", display: "flex", alignItems: "center" }}>
                  {selectedIcon && React.createElement(FaIcons[selectedIcon as keyof typeof FaIcons], { size: 40 })}
                  <span style={{ marginLeft: 8 }}>{selectedIcon}</span>
                </div>
              </div>

              {renderIconGrid()}
            </div>
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

export default TechnologyStack;
