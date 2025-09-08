import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Typography } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_FQA, UPDATE_FQA, DELETE_FQA } from "../../../graphql/mutations/mutations";
import { GET_ALL_FQAS } from "../../../graphql/queries/queries";

const { Title } = Typography;

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const ManageFaq: React.FC = () => {
  const [faqList, setFaqList] = useState<FaqItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form] = Form.useForm();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);

  const { loading, data } = useQuery(GET_ALL_FQAS);

  const [createFqa] = useMutation(CREATE_FQA, {
    onCompleted: () => {
      console.log("FAQ created successfully");
    },
    onError: (error) => {
      console.error("Error creating FAQ:", error);
    },
    refetchQueries: [{ query: GET_ALL_FQAS }],
  });

  const [updateFqa] = useMutation(UPDATE_FQA, {
    onCompleted: () => {
      console.log("FAQ updated successfully");
    },
    onError: (error) => {
      console.error("Error updating FAQ:", error);
    },
    refetchQueries: [{ query: GET_ALL_FQAS }],
  });

  const [deleteFqa] = useMutation(DELETE_FQA, {
    onCompleted: () => {
      console.log("FAQ deleted successfully");
      setDeleteModalOpen(false);
      setFaqToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting FAQ:", error);
    },
    refetchQueries: [{ query: GET_ALL_FQAS }],
  });

  useEffect(() => {
    if (data) {
      setFaqList(data.getAllFqas);
    }
  }, [data]);

  const handleSubmit = (values: { question: string; answer: string }) => {
    const newItem: FaqItem = {
      id: editing ? editing.id : Date.now().toString(),
      question: values.question,
      answer: values.answer,
    };

    if (editing) {
      updateFqa({
        variables: {
          id: editing.id,
          question: newItem.question,
          answer: newItem.answer,
        },
      });
    } else {
      createFqa({
        variables: {
          input: {
            question: newItem.question,
            answer: newItem.answer,
          },
        },
      });
    }

    setModalOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const handleEdit = (item: FaqItem) => {
    setEditing(item);
    form.setFieldsValue({ question: item.question, answer: item.answer });
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setFaqToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (faqToDelete) {
      deleteFqa({ variables: { id: faqToDelete } });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setFaqToDelete(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="!mb-0">
          Manage FAQs
        </Title>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            form.resetFields();
            setEditing(null);
            setModalOpen(true);
          }}
        >
          Add FAQ
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={faqList}
        pagination={false}
        loading={loading}
        columns={[
          {
            title: "SL",
            render: (_: any, __: FaqItem, index: number) => index + 1,
            width: 50,
          },
          {
            title: "Question",
            dataIndex: "question",
          },
          {
            title: "Answer",
            dataIndex: "answer",
          },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                />
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
        title={editing ? "Edit FAQ" : "Add FAQ"}
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
            label="Question"
            name="question"
            rules={[{ required: true, message: "Please enter the question" }]}
          >
            <Input placeholder="Enter question" />
          </Form.Item>

          <Form.Item
            label="Answer"
            name="answer"
            rules={[{ required: true, message: "Please enter the answer" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter answer" />
          </Form.Item>

          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">
              {editing ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete FAQ"
        open={deleteModalOpen}
        onCancel={handleCancelDelete}
        onOk={handleConfirmDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this FAQ?</p>
      </Modal>
    </div>
  );
};

export default ManageFaq;
