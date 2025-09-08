import React, { useState } from "react";
import { Button, Table, Space, Typography, Tag, Modal, message } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_MESSAGES } from "../graphql/queries/message.query";
import { GET_SINGLE_MESSAGE } from "../graphql/queries/message.query";  // Import the new query
import { DELETE_MESSAGE } from "../graphql/mutations/message.mutation"; // Import the delete mutation

const { Title } = Typography;

interface Message {
  _id: string;
  userName: string;
  email: string;
  phone: string;
  location: string;
  plan: string;
  content: string;
  createdAt: string;
}

const MessageList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_MESSAGES);
  const [deleteMessage] = useMutation(DELETE_MESSAGE); // Mutation hook for deleting messages
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Fetch a single message by ID
  const { data: singleMessageData, loading: singleMessageLoading, error: singleMessageError } = useQuery(GET_SINGLE_MESSAGE, {
    variables: { id: selectedMessage?._id },
    skip: !selectedMessage,  // Skip query if no message is selected
  });

  const handleView = (record: Message) => {
    setSelectedMessage(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this message?",
      content: "Once deleted, it cannot be recovered.",
      onOk: async () => {
        try {
          await deleteMessage({ variables: { id } });
          message.success("Message deleted successfully");
          refetch(); // Refetch the messages after deletion
        } catch (err) {
          console.error("Error deleting message:", err);
          message.error("Failed to delete the message");
        }
      },
      onCancel() {
        message.info("Deletion canceled");
      },
    });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedMessage(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const columns = [
    {
      title: "#",
      render: (_: any, __: Message, index: number) => index + 1,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (plan: string) => {
        const color = plan === "Premium" ? "green" : "orange";
        return <Tag color={color}>{plan}</Tag>;
      },
    },
    {
      title: "Message Content",
      dataIndex: "content",
      key: "content",
      render: (content: string) => <span>{content.slice(0, 50)}...</span>,
    },
    {
      title: "Submitted On",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Message) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            type="default"
            onClick={() => handleView(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            type="default"
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="mx-auto bg-white p-6 rounded-xl shadow">
      <Title level={4} className="mb-4">
        Messages
      </Title>
      <Table
        rowKey="_id"
        dataSource={data.getAllMessages}
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
      />

      {/* Modal for Viewing Full Message Details */}
      <Modal
        title="Message Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        {singleMessageLoading ? (
          <p>Loading message details...</p>
        ) : singleMessageError ? (
          <p>Error loading message details: {singleMessageError.message}</p>
        ) : (
          selectedMessage && singleMessageData && (
            <div>
              <p><strong>User Name:</strong> {singleMessageData.getSingleMessage.userName}</p>
              <p><strong>Email:</strong> {singleMessageData.getSingleMessage.email}</p>
              <p><strong>Phone:</strong> {singleMessageData.getSingleMessage.phone}</p>
              <p><strong>Location:</strong> {singleMessageData.getSingleMessage.location}</p>
              <p><strong>Plan:</strong> {singleMessageData.getSingleMessage.plan}</p>
              <p><strong>Message Content:</strong> {singleMessageData.getSingleMessage.content}</p>
              <p><strong>Submitted On:</strong> {singleMessageData.getSingleMessage.createdAt}</p>
            </div>
          )
        )}
      </Modal>
    </div>
  );
};

export default MessageList;
