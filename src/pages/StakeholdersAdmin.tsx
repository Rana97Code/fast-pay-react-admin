import React from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_STAKEHOLDERS } from "../graphql/queries/queries";
import { DELETE_STAKEHOLDER } from "../graphql/mutations/mutations";

interface Stakeholder {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  notableWorks: string[];
}

const StakeholdersAdmin: React.FC = () => {
  const navigate = useNavigate();

  const { data, loading, refetch } = useQuery(GET_ALL_STAKEHOLDERS);
  const [deleteStakeholder] = useMutation(DELETE_STAKEHOLDER);

  const stakeholders: Stakeholder[] = data?.getAllStakeholders || [];

  const handleEdit = (id: string) => {
    navigate(`/cms/home/stakeholders/add-stakeholder/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStakeholder({ variables: { id } });
      message.success("Stakeholder deleted!");
      refetch();
    } catch {
      message.error("Failed to delete stakeholder.");
    }
  };

  const columns = [
    { title: "#", render: (_: any, __: Stakeholder, idx: number) => idx + 1 },
    { title: "Name", dataIndex: "name" },
    { title: "Position", dataIndex: "position" },
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) => (
        <img src={img} alt="Stakeholder" className="w-12 h-12 object-cover rounded-full" />
      ),
    },
    {
      title: "Action",
      render: (_: any, record: Stakeholder) => (
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
        <h2 className="text-xl font-semibold">Stakeholders</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/cms/home/stakeholders/add-stakeholder")}
        >
          Add Stakeholder
        </Button>
      </div>

      <Table loading={loading} dataSource={stakeholders} columns={columns} rowKey="id" />
    </div>
  );
};

export default StakeholdersAdmin;
