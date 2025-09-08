import React, { useEffect, useState } from "react";
import { Table, Typography, Select, Button, Modal, Descriptions, message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { GET_RESUMES } from "../../../graphql/queries/queries";
import { DELETE_RESUME } from "../../../graphql/mutations/mutations";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

interface JobApplication {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  position: string;
  coverLetter: string;
  resumeFile: string;
}

const JobApplicationsList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  const { loading, error, data, refetch } = useQuery<{ getResumes: JobApplication[] }>(GET_RESUMES);

  const [deleteResume] = useMutation(DELETE_RESUME, {
    onCompleted: () => {
      message.success("Application deleted successfully");
      refetch();
    },
    onError: (error) => {
      message.error(`Error deleting Application: ${error.message}`);
    },
  });

  useEffect(() => {
    const jobParam = searchParams.get("job") || "all";
    setSelectedJob(jobParam);
  }, [searchParams]);

  const handleFilterChange = (value: string) => {
    setSelectedJob(value);
    setSearchParams({ job: value });
  };

  const getJobValue = (title: string) => title.toLowerCase().replace(/\s+|\/+|_+/g, "-");
  const formatJobTitle = (title: string) => title.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const filteredData = selectedJob === "all"
    ? data?.getResumes || []
    : data?.getResumes.filter(app => getJobValue(app.position) === selectedJob);

  const showModal = (record: JobApplication) => {
    setSelectedApplication(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedApplication(null);
  };

  const jobOptions = data?.getResumes
    ? [
      { label: "All Jobs", value: "all" },
      ...Array.from(new Set(data.getResumes.map((resume: JobApplication) => resume.position)))
        .map((job: string) => ({
          label: formatJobTitle(job),
          value: getJobValue(job),
        })),
    ]
    : [];

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this resume?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      onOk: () => {
        deleteResume({ variables: { id } });
      },
    });
  };

  const columns = [
    {
      title: "#",
      render: (_: any, __: JobApplication, index: number) => index + 1,
    },
    {
      title: "Applicant",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <strong>{text}</strong>,
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
      title: "Job Title",
      dataIndex: "position",
      key: "position",
      render: (position: string) => formatJobTitle(position),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: JobApplication) => (
        <>
          <Button type="primary" onClick={() => showModal(record)} icon={<EyeOutlined />}>
            View Details
          </Button>
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <Title level={4} className="!text-gray-800 dark:!text-white mb-0">
          Job Applications
        </Title>

        <Select
          value={selectedJob}
          onChange={handleFilterChange}
          style={{ width: 250 }}
        >
          {jobOptions?.map((job) => (
            <Option key={job.value} value={job.value}>
              {job.label}
            </Option>
          ))}
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 6 }}
        bordered
        className="rounded-lg"
        loading={loading}
      />

      <Modal
        title="Application Details"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedApplication && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Applicant Name">
              {selectedApplication.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedApplication.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedApplication.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Job Title">
              {formatJobTitle(selectedApplication.position)}
            </Descriptions.Item>
            <Descriptions.Item label="Cover Letter">
              {selectedApplication.coverLetter}
            </Descriptions.Item>
            <Descriptions.Item label="Resume">
              <a href={selectedApplication.resumeFile} target="_blank" rel="noreferrer">
                View Resume
              </a>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default JobApplicationsList;