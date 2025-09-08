import React, { useState, useEffect } from "react";
import { Table, Typography, Space, Button, Modal, Image, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_CLIENT_VALUES } from "../../../graphql/queries/queries";
import { DELETE_CLIENT_VALUE } from "../../../graphql/mutations/mutations";

const { Title } = Typography;

interface ClientValue {
    id: string;
    title: string;
    description: string;
    src: string;
    alt: string;
}

const ClientValueList: React.FC = () => {
    const [clientValues, setClientValues] = useState<ClientValue[]>([]);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [clientValueToDelete, setClientValueToDelete] = useState<ClientValue | null>(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    const { loading, error, data } = useQuery(GET_ALL_CLIENT_VALUES, {
        fetchPolicy: "no-cache",
    });

    const [deleteClientValue] = useMutation(DELETE_CLIENT_VALUE, {
        onCompleted: () => {
            setClientValues(clientValues.filter((item) => item.id !== clientValueToDelete?.id));
            setIsDeleteModalVisible(false);
            setClientValueToDelete(null);
        },
        onError: (err) => {
            console.error(err);
            message.error("Failed to delete client value.");
            setIsDeleteModalVisible(false);
        }
    });

    useEffect(() => {
        if (data) {
            setClientValues(data.getAllClientValues);
        }
    }, [data]);

    const handleDelete = (clientValue: ClientValue) => {
        setClientValueToDelete(clientValue);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        if (clientValueToDelete) {
            deleteClientValue({ variables: { id: clientValueToDelete.id } });
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setClientValueToDelete(null);
    };

    const handlePaginationChange = (page: number, pageSize: number) => {
        setPagination({
            current: page,
            pageSize,
        });
    };

    const columns = [
        {
            title: "#",
            key: "index",
            render: (_: any, __: ClientValue, index: number) => index + 1 + (pagination.current - 1) * pagination.pageSize,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (desc: string) => <span>{desc ? desc.slice(0, 50) : ""}</span>,
        },
        {
            title: "Image",
            dataIndex: "src",
            key: "src",
            render: (src: string, record: ClientValue) => (
                src ? (
                    <Image src={src} alt={record.alt} width={50} height={50} />
                ) : (
                    <span>N/A</span>
                )
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: ClientValue) => (
                <Space>
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        type="default"
                        onClick={() => handleDelete(record)} // Trigger delete confirmation
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <div className="flex justify-between pb-4">
                <Title level={4} className="!text-gray-800 dark:!text-white mb-4">
                    Client Values
                </Title>
                <Link to="/cms/home/add-client-value">
                    <Button type="primary" icon={<IoMdAdd />}>
                        Add New Client Value
                    </Button>
                </Link>
            </div>

            <Table
                columns={columns}
                dataSource={clientValues}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    onChange: handlePaginationChange,
                }}
                bordered
                className="rounded-lg"
                rowKey="id"
                loading={loading}
            />

            {/* Delete Confirmation Modal */}
            <Modal
                title="Confirm Deletion"
                visible={isDeleteModalVisible}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                okText="Yes, Delete"
                cancelText="No"
            >
                <p>Are you sure you want to delete this client value?</p>
            </Modal>
        </div>
    );
};

export default ClientValueList;
