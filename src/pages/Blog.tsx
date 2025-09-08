import React, { useState, useEffect } from "react";
import { Table, Tag, Typography, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_BLOG_POSTS } from "../graphql/queries/queries";
import { DELETE_BLOG_POST } from "../graphql/mutations/mutations";

const { Title, Paragraph } = Typography;

interface BlogPost {
    key: string;
    id: string;
    title: string;
    category: string;
    publicationDate: string;
    author: string;
    readMoreLink: string;
    description: string;
}

const BlogList: React.FC = () => {
    const navigate = useNavigate();
    const { loading, data } = useQuery(GET_ALL_BLOG_POSTS, {
        fetchPolicy: "no-cache",
    });

    const [deleteBlogPost] = useMutation(DELETE_BLOG_POST, {
        onCompleted: () => {
            // Handle post-deletion actions, like showing a success message
        },
        onError: (err) => {
            console.error("Error deleting blog post:", err);
        },
    });

    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (data?.getAllBlogPosts) {
            setPosts(
                data.getAllBlogPosts.map((p: any) => ({
                    key: p.id,
                    id: p.id,
                    title: p.title,
                    category: p.category,
                    publicationDate: new Date(p.publicationDate).toLocaleDateString(),
                    author: p.author || "Unknown", // Fallback if author is missing
                    readMoreLink: p.readMoreLink,
                    description: p.description || "No description available", // Fallback if description is missing
                }))
            );
        }
    }, [data]);

    const openModal = (post: BlogPost) => {
        setSelectedPost(post);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedPost(null);
    };

    const confirmDelete = (id: string) => {
        Modal.confirm({
            title: "Delete this blog post?",
            content: "This cannot be undone.",
            okText: "Yes, delete",
            cancelText: "Cancel",
            onOk: () => {
                deleteBlogPost({ variables: { id } }).then(() => {
                    setPosts((prev) => prev.filter((p) => p.id !== id));
                });
            },
        });
    };

    const columns: ColumnsType<BlogPost> = [
        {
            title: "#",
            key: "index",
            width: 50,
            render: (_: any, __: BlogPost, idx: number) => {
                const startIndex = (currentPage - 1) * 5; // Adjusting index for pagination
                return startIndex + idx + 1;
            },
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (t) => <strong>{t}</strong>,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (c) => <Tag color="blue">{c}</Tag>,
        },
        {
            title: "Publication Date",
            dataIndex: "publicationDate",
            key: "publicationDate",
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: BlogPost) => (
                <div className="flex space-x-2">
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => openModal(record)}
                    />
                    <Button
                        type="primary"
                        onClick={() => navigate(`/cms/home/blogs/add-blog/${record.id}`)}
                    >
                        Edit
                    </Button>

                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => confirmDelete(record.id)}
                    />
                </div>
            ),
        },
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between pb-4">
                <Title level={4} className="!text-gray-800 mb-4">
                    Blog Posts
                </Title>
                <Link to="/cms/home/blogs/add-blog">
                    <Button type="primary" icon={<IoMdAdd />}>Add New Blog</Button>
                </Link>
            </div>

            <Table<BlogPost>
                columns={columns}
                dataSource={posts}
                loading={loading}
                pagination={{
                    pageSize: 5,
                    current: currentPage,
                    onChange: handlePageChange, // Update current page on page change
                }}
                rowKey="id"
                bordered
                className="rounded-lg"
            />

            <Modal
                title="Blog Details"
                open={modalVisible}
                onCancel={closeModal}
                footer={null}
                width={600}
            >
                {selectedPost && (
                    <div className="space-y-4 text-gray-800">
                        <Paragraph>
                            <strong>Title:</strong> {selectedPost.title}
                        </Paragraph>
                        <Paragraph>
                            <strong>Category:</strong> {selectedPost.category}
                        </Paragraph>
                        <Paragraph>
                            <strong>Published:</strong> {selectedPost.publicationDate}
                        </Paragraph>
                        <Paragraph>
                            <strong>Author:</strong> {selectedPost.author}
                        </Paragraph>
                        <Paragraph>
                            <strong>Description:</strong><br /> {selectedPost.description}
                        </Paragraph>
                        <Paragraph>
                            <a
                                href={selectedPost.readMoreLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Read More
                            </a>
                        </Paragraph>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BlogList;
