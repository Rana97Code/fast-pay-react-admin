import { useQuery } from "@apollo/client";
import { Table, Tag, Typography, Spin, Tooltip } from "antd";
import { ALL_CUSTOMER_INQUERY_QUERY } from "../graphql/queries/queries";

const { Title } = Typography;

const categoryOptions = [
  { value: "RESIDENTIAL", title: "RESIDENTIAL", color: "orange" },
  { value: "COMMERCIAL", title: "COMMERCIAL", color: "purple" },
] as const;

const columns = [
  {
    title: "#",
    key: "index",
    width: 50,
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <strong>{text}</strong>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category: string) => {
      const matched = categoryOptions.find((c) => c.value === category);
      return (
        <Tag color={matched?.color || "default"} className="capitalize">
          {matched?.title || category}
        </Tag>
      );
    },
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Size (sft)",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
    ellipsis: true,
    render: (message: string) => (
      <Tooltip title={message} placement="top">
        <span>{message}</span>
      </Tooltip>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const Inqueries = () => {
  const { loading, error, data } = useQuery(ALL_CUSTOMER_INQUERY_QUERY);

  if (loading) {
    return (
      <div className="h-full min-h-[80vh] w-full flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  const dataSource = data?.getAllCustomerInquiries || [];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      <Title level={4} className="!text-gray-800 dark:!text-white mb-4">
        Customer Inquiries
      </Title>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 6 }}
        bordered
        className="rounded-lg"
        rowKey="id"
      />
    </div>
  );
};

export default Inqueries;