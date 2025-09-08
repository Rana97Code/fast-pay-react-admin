import React from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_COMPANIES } from "../graphql/queries/queries";
import { DELETE_COMPANY } from "../graphql/mutations/mutations";

interface Company {
  id: string;
  title: string;
  href: string;
  logo: string;
  description: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const Companies: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery(GET_ALL_COMPANIES);
  const [deleteCompany] = useMutation(DELETE_COMPANY);

  const companies: Company[] = data?.getAllCompanies || [];

  const handleEdit = (id: string) => {
    navigate(`/cms/home/companies/add/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCompany({ variables: { id } });
      message.success("Company deleted successfully!");
      refetch();
    } catch {
      message.error("Failed to delete company.");
    }
  };

  const columns = [
    { title: "#", render: (_: any, __: Company, idx: number) => idx + 1 },
    { title: "Title", dataIndex: "title" },
    {
      title: "Website",
      dataIndex: "href",
      render: (href: string) => (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {href}
        </a>
      ),
    },
    {
      title: "Action",
      render: (_: any, record: Company) => (
        <div className="flex gap-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Companies</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/cms/home/companies/add")}
        >
          Add Company
        </Button>
      </div>

      <Table loading={loading} dataSource={companies} columns={columns} rowKey="id" />
    </div>
  );
};

export default Companies;
