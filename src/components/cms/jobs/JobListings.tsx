import React, { useEffect, useState } from "react";
import { Table, Tag, Typography, Button, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_JOB_LISTINGS } from "../../../graphql/queries/queries";
import { DELETE_JOB_LISTING } from "../../../graphql/mutations/mutations";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const { Title } = Typography;

type JobListing = {
    key: string;
    id: string;
    title: string;
    location: string;
    status: string;
    applyBefore: string;
    jobResponsibilities: string[];
    educationalRequirements: string[];
    experienceRequirements: string[];
    additionalRequirements: string[];
    jobPreferences: string[];
    benefits: string[];
};

const JobListings: React.FC = () => {
    const navigate = useNavigate();
    const { loading, data } = useQuery(GET_ALL_JOB_LISTINGS, {
        fetchPolicy: "no-cache",
    });

    const [jobData, setJobData] = useState<JobListing[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [deleteJobListing] = useMutation(DELETE_JOB_LISTING, {
        onCompleted: () => {
            message.success("Job listing deleted successfully!");
            console.log("Job listing deleted successfully");
        },
        onError: (error) => {
            message.error(`Error deleting job listing: ${error.message}`);
            console.error("Error deleting job listing:", error);
        },
    });

    useEffect(() => {
        if (data && data.getJobListings) {
            const transformedData = data.getJobListings.map((job: any) => ({
                key: job.id,
                id: job.id,
                title: job.title,
                location: job.location,
                status: job.status,
                applyBefore: job.applyBefore.split("T")[0],
                jobResponsibilities: job.jobResponsibilities,
                educationalRequirements: job.educationalRequirements,
                experienceRequirements: job.experienceRequirements,
                additionalRequirements: job.additionalRequirements,
                jobPreferences: job.jobPreferences,
                benefits: job.benefits,
            }));
            setJobData(transformedData);
        }
    }, [data]);

    const handleModalOpen = (job: JobListing) => {
        setSelectedJob(job);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedJob(null);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this job listing?",
            content: "This action cannot be undone.",
            okText: "Yes, Delete",
            cancelText: "Cancel",
            onOk: () => {
                deleteJobListing({ variables: { id } });
                setJobData((prev) => prev.filter((job) => job.id !== id));
            },
            onCancel: () => {
                console.log("Delete operation cancelled");
            },
        });
    };

    const columns: ColumnsType<JobListing> = [
        {
            title: "#",
            key: "index",
            width: 50,
            render: (_: any, __: JobListing, index: number) => {
                return (currentPage - 1) * 5 + index + 1;
            },
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const color = status === "Full-time" ? "green" : "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Apply Before",
            dataIndex: "applyBefore",
            key: "applyBefore",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: JobListing) => (
                <>
                    <Button
                        type="default"
                        className="text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600"
                        onClick={() =>
                            navigate(
                                `/cms/home/jobs/applications?job=${record.title
                                    .toLowerCase()
                                    .replace(/[\/]/g, "-")
                                    .replace(/\s+/g, "-")}`
                            )
                        }
                    >
                        View Applications
                    </Button>
                    <Link to={`/cms/home/jobs/add-job/${record.id}`}>
                        <Button
                            icon={<EditOutlined />}
                            type="default"
                            className="ml-2"
                        >
                            Edit
                        </Button>
                    </Link>
                    <Button
                        icon={<EyeOutlined />}
                        type="default"
                        className="ml-2"
                        onClick={() => handleModalOpen(record)} // Open modal for job details
                    />
                    <Button
                        danger
                        type="default"
                        className="ml-2"
                        onClick={() => handleDelete(record.id)} // Trigger the delete with confirmation
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <div className="flex justify-between pb-4">
                <Title level={4} className="!text-gray-800 dark:!text-white mb-4">
                    Job Listings
                </Title>
                <Link to="/cms/home/jobs/add-job">
                    <Button type="primary" icon={<IoMdAdd />}>Add New Job</Button>
                </Link>
            </div>
            <Table<JobListing>
                columns={columns}
                dataSource={jobData}
                pagination={{
                    pageSize: 5,
                    current: currentPage,
                    onChange: handlePageChange, // Handle page change
                }}
                bordered
                className="rounded-lg"
                scroll={{ x: "max-content" }}
                loading={loading}
                rowKey="id"
            />
            {/* Modal for Job Details */}
            <Modal
                title="Job Details"
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                className="job-modal"
                width={600}
            >
                {selectedJob && (
                    <div className="p-4 space-y-4 text-gray-800">
                        <p><strong>Title:</strong> {selectedJob.title}</p>
                        <p><strong>Location:</strong> {selectedJob.location}</p>
                        <p><strong>Status:</strong> {selectedJob.status}</p>
                        <p><strong>Apply Before:</strong> {selectedJob.applyBefore}</p>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-blue-600">Responsibilities:</h4>
                            <ul className="list-disc pl-5">
                                {selectedJob.jobResponsibilities.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-blue-600">Educational Requirements:</h4>
                            <ul className="list-disc pl-5">
                                {selectedJob.educationalRequirements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-blue-600">Experience Requirements:</h4>
                            <ul className="list-disc pl-5">
                                {selectedJob.experienceRequirements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-blue-600">Additional Requirements:</h4>
                            <ul className="list-disc pl-5">
                                {selectedJob.additionalRequirements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-blue-600">Job Preferences:</h4>
                            <ul className="list-disc pl-5">
                                {selectedJob.jobPreferences.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-blue-600">Benefits:</h4>
                            <ul className="list-disc pl-5">
                                {selectedJob.benefits.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default JobListings;
