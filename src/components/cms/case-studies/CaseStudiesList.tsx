import React, { useState } from "react";
import { Table, Button, Space, Typography, Modal, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_CASE_STUDIES } from "../../../graphql/queries/queries";
import { DELETE_CASE_STUDY } from "../../../graphql/mutations/mutations";

const { Title } = Typography;

interface CaseStudy {
    id: string;
    title: string;
    category: string;
    subCategory: string;
    icon: string;
    description: string;
    createdAt: string;
}

const CaseStudiesList: React.FC = () => {
    const navigate = useNavigate();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [caseStudyToDelete, setCaseStudyToDelete] = useState<CaseStudy | null>(null);

    const { data, loading, error, refetch } = useQuery(GET_ALL_CASE_STUDIES, {
        fetchPolicy: 'no-cache',
    });
    const [deleteCaseStudy] = useMutation(DELETE_CASE_STUDY, {
        onCompleted: () => {
            refetch();
            setIsDeleteModalVisible(false);
            setCaseStudyToDelete(null);
        },
    });

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    const handleDelete = (caseStudy: CaseStudy) => {
        setCaseStudyToDelete(caseStudy);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        if (caseStudyToDelete) {
            deleteCaseStudy({ variables: { id: caseStudyToDelete.id } });
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setCaseStudyToDelete(null);
    };

    const handleTableChange = (pagination: any) => {
        setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
        });
    };

    const columns = [
        {
            title: "#",
            key: "index",
            render: (_: any, __: CaseStudy, index: number) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: "Case Study",
            dataIndex: "title",
            key: "title",
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category: string) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: "SubCategory",
            dataIndex: "subCategory",
            key: "subCategory",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (desc: string) => <span>{desc.slice(0, 50)}...</span>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: CaseStudy) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        type="default"
                        onClick={() => navigate(`/cms/home/case-studies/add/${record.id}`)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        type="default"
                        onClick={() => handleDelete(record)}
                    />
                </Space>
            ),
        },
    ];
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <div className="flex justify-between pb-4">
                <Title level={4} className="!text-gray-800 dark:!text-white mb-4">
                    Case Studies
                </Title>
                <Link to="/cms/home/case-studies/add">
                    <Button type="primary" icon={<IoMdAdd />}>Add Case Study</Button>
                </Link>
            </div>

            <Table
                columns={columns}
                dataSource={data?.getAllCaseStudies}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                }}
                bordered
                className="rounded-lg"
                onChange={handleTableChange}
                loading={loading}
            />

            <Modal
                title="Confirm Deletion"
                open={isDeleteModalVisible}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                okText="Yes, Delete"
                cancelText="No"
            >
                <p>Are you sure you want to delete this case study?</p>
            </Modal>
        </div>
    );
};

export default CaseStudiesList;
