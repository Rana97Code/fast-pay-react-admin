import React, { useState } from "react";
import { Table, Button, Modal, Descriptions, message, Typography, Tag } from "antd";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdCreate } from "react-icons/io";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PROJECTS } from "../../../graphql/queries/queries";
import { DELETE_PROJECT } from "../../../graphql/mutations/mutations";

const { Title } = Typography;

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  timeline: string;
  status: string;
  link: string;
  image: string;
}

const ProjectList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, refetch } = useQuery(GET_ALL_PROJECTS, {
    fetchPolicy: "no-cache",
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted: () => {
      message.success("Project deleted successfully");
      refetch();
    },
    onError: (err) => {
      message.error(`Error deleting project: ${err.message}`);
    },
    refetchQueries: [{ query: GET_ALL_PROJECTS }],
  });

  const showModal = (record: Project) => {
    setSelectedProject(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProject(null);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this project?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      onOk: () => {
        deleteProject({ variables: { id } });
      },
    });
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: 50,
      render: (_: any, __: any, index: number) => {
        return index + 1 + (currentPage - 1) * 6;
      },
    },
    {
      title: "Project Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Timeline",
      dataIndex: "timeline",
      key: "timeline",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "default";
        if (status === "Ongoing") {
          color = "blue";
        } else if (status === "Completed") {
          color = "green";
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Project) => (
        <>
          <Button type="primary" onClick={() => showModal(record)}>
            View Details
          </Button>
          <Link to={`/cms/home/projects/add-project/${record.id}`}>
            <Button
              icon={<IoMdCreate />}
              style={{ marginLeft: 8 }}
              type="default"
            >
              Edit
            </Button>
          </Link>
          <Button
            danger
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      <div className="flex justify-between pb-4">
        <Title level={4} className="!text-gray-800 dark:!text-white mb-0">
          Projects
        </Title>
        <Link to="/cms/home/projects/add-project">
          <Button type="primary" icon={<IoMdAdd />}>
            Add New Project
          </Button>
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={data?.getAllProjects}
        pagination={{
          pageSize: 6,
          current: currentPage,
          onChange: (page: number) => setCurrentPage(page),
        }}
        bordered
        loading={loading}
        className="rounded-lg"
      />

      <Modal
        title="Project Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedProject && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Project Title">
              {selectedProject.title}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedProject.description}
            </Descriptions.Item>
            <Descriptions.Item label="Tech Stack">
              {selectedProject.techStack.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Timeline">
              {selectedProject.timeline}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {selectedProject.status}
            </Descriptions.Item>
            <Descriptions.Item label="Link">
              <a href={selectedProject.link} target="_blank" rel="noreferrer">
                Visit Project
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              <img
                src={selectedProject.image}
                alt="Project"
                style={{ width: 100 }}
              />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default ProjectList;
