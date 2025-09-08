import React, { useState } from "react";
import { Table, Avatar, Tag, Typography, Button, Modal, Descriptions, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE } from "../../../graphql/mutations/mutations";
import { GET_EMPLOYEES } from "../../../graphql/queries/queries";

const { Title } = Typography;

interface EmployeeType {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    linkedin: string;
    github: string;
    twitter: string;
    facebook: string;
    email: string;
    phone: string;
    address: string;
    joinDate: string;
    status: string;
    createdAt: string;
}

const OurTeamList: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const { data, loading, refetch } = useQuery<{ getEmployees: EmployeeType[] }>(GET_EMPLOYEES, {
        fetchPolicy: "no-cache",
    });

    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        onCompleted: () => {
            message.success("Employee deleted successfully");
            refetch();
        },
        onError: (err) => {
            message.error(`Error deleting employee: ${err.message}`);
        },
        refetchQueries: [{ query: GET_EMPLOYEES }],
    });

    const showModal = (record: EmployeeType) => {
        setSelectedEmployee(record);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedEmployee(null);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this employee?",
            content: "This action cannot be undone.",
            okText: "Yes, Delete",
            cancelText: "Cancel",
            onOk: () => {
                deleteEmployee({ variables: { id } });
            },
        });
    };

    const columns: ColumnsType<EmployeeType> = [
        {
            title: "#",
            key: "index",
            width: 50,
            render: (_: any, __: EmployeeType, index: number) => {
                return index + 1 + (currentPage - 1) * 5; // 5 is the pageSize in this case
            },
        },
        {
            title: "Photo",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (url) => <Avatar src={url} size={64} />,
        },
        {
            title: "Name & Role",
            key: "name",
            render: (_, record) => (
                <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{record.name}</p>
                    <p className="text-sm text-gray-500">{record.role}</p>
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (email) => <a href={`mailto:${email}`}>{email}</a>,
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Join Date",
            dataIndex: "joinDate",
            key: "joinDate",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: EmployeeType) => (
                <>
                    <Button
                        icon={<EyeOutlined />}
                        type="default"
                        className="text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600"
                        onClick={() => showModal(record)}
                    />
                    <Link to={`/cms/team/add-member/${record.id}`}>
                        <Button
                            icon={<EditOutlined />}
                            type="default"
                            className="ml-2"
                        />
                    </Link>
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        type="default"
                        className="ml-2"
                        onClick={() => handleDelete(record.id)}
                    />
                </>
            ),
        },
    ];

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <Title level={4} className="!mb-0">
                    Our Team
                </Title>
                <Link to="/cms/team/add-member">
                    <Button type="primary" icon={<IoMdAdd />}>
                        Add New Member
                    </Button>
                </Link>
            </div>
            <Table<EmployeeType>
                columns={columns}
                dataSource={data?.getEmployees}
                pagination={{
                    pageSize: 5,
                    current: currentPage,
                    onChange: (page: number) => setCurrentPage(page),
                }}
                bordered
                loading={loading}
                className="rounded-lg"
            />

            <Modal
                title="Employee Details"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                {selectedEmployee && (
                    <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label="Name">{selectedEmployee.name}</Descriptions.Item>
                        <Descriptions.Item label="Role">{selectedEmployee.role}</Descriptions.Item>
                        <Descriptions.Item label="Bio">{selectedEmployee.bio}</Descriptions.Item>
                        <Descriptions.Item label="Email">{selectedEmployee.email}</Descriptions.Item>
                        <Descriptions.Item label="Phone">{selectedEmployee.phone}</Descriptions.Item>
                        <Descriptions.Item label="Address">{selectedEmployee.address}</Descriptions.Item>
                        <Descriptions.Item label="Join Date">{selectedEmployee.joinDate}</Descriptions.Item>
                        <Descriptions.Item label="Status">{selectedEmployee.status}</Descriptions.Item>
                        <Descriptions.Item label="LinkedIn">
                            <a href={selectedEmployee.linkedin} target="_blank" rel="noopener noreferrer">
                                Visit LinkedIn
                            </a>
                        </Descriptions.Item>
                        <Descriptions.Item label="GitHub">
                            <a href={selectedEmployee.github} target="_blank" rel="noopener noreferrer">
                                Visit GitHub
                            </a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Twitter">
                            <a href={selectedEmployee.twitter} target="_blank" rel="noopener noreferrer">
                                Visit Twitter
                            </a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Facebook">
                            <a href={selectedEmployee.facebook} target="_blank" rel="noopener noreferrer">
                                Visit Facebook
                            </a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Image">
                            <img
                                src={selectedEmployee.imageUrl}
                                alt="Employee"
                                style={{ width: 100 }}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default OurTeamList;
