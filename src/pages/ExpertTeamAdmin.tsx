import React from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_EXPERT_TEAM } from "../graphql/queries/queries";
import { DELETE_EXPERT_TEAM } from "../graphql/mutations/mutations";

interface ExpertMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const ExpertTeamAdmin: React.FC = () => {
  const navigate = useNavigate();

  const { data, loading, refetch } = useQuery(GET_ALL_EXPERT_TEAM);
  const [deleteExpert] = useMutation(DELETE_EXPERT_TEAM);

  const members: ExpertMember[] = data?.getAllExpertTeams || [];

  const handleEdit = (id: string) => {
    navigate(`/cms/home/expert-team/add-edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpert({ variables: { id } });
      message.success("Expert deleted!");
      refetch();
    } catch {
      message.error("Failed to delete expert.");
    }
  };

  const columns = [
    { title: "#", render: (_: any, __: ExpertMember, idx: number) => idx + 1 },
    { title: "Name", dataIndex: "name" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) => (
        <img src={img} alt="Expert" className="w-12 h-12 object-cover rounded-full" />
      ),
    },
    {
      title: "Action",
      render: (_: any, record: ExpertMember) => (
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
        <h2 className="text-xl font-semibold">Expert Team</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/cms/home/expert-team/add-edit")}
        >
          Add Expert
        </Button>
      </div>

      <Table loading={loading} dataSource={members} columns={columns} rowKey="id" />
    </div>
  );
};

export default ExpertTeamAdmin;
