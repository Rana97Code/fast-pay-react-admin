import { useQuery, useMutation } from "@apollo/client";
import { Table, Typography, Tag, Spin, Input, Modal, Button, message } from "antd";
import { ALL_CONTACT_SUBMISSIONS_QUERY } from "../graphql/queries/queries";
import { DELETE_CUSTOMER_INFO } from "../graphql/mutations/customer-enqury.mutations";
import { useState } from "react";

const { Title } = Typography;
const { Search } = Input;

// 📌 Fixed reason list with color & label
const reasonOptions = [
  { value: "SPACE", title: "Land Development", color: "volcano" },
  { value: "SALE_SERVICE", title: "Apartment Buyer", color: "blue" },
  { value: "SPACE", title: "Commercial Space Buyer", color: "purple" },
  { value: "LAND_BUYER", title: "Land Buyer", color: "cyan" },
  { value: "SALE_SERVICE", title: "After Sales Service", color: "green" },
  { value: "GENERAL_ENQUIRY", title: "General Enquiry", color: "geekblue" },
  { value: "OTHERS", title: "Others", color: "default" },
  { value: "RESIDENTIAL", title: "Residential", color: "green" }, // Residential category color
  { value: "COMMERCIAL", title: "Commercial", color: "blue" }, // Commercial category color
] as const;

// Define types for customer inquiries
interface CustomerInquiry {
  id: string; // ID is a string (UUID format)
  name: string;
  phone: string;
  email: string;
  message: string;
  category: string; // Assuming it's a string, you can map this to an enum
  location: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

interface CustomerInquiryData {
  getAllCustomerInquiries: CustomerInquiry[];
}

const CustomerInformation = () => {
  const { loading, error, data, refetch } = useQuery<CustomerInquiryData>(
    ALL_CONTACT_SUBMISSIONS_QUERY
  );

  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [selectedMessage, setSelectedMessage] = useState<string>(""); // Message content to display
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Delete modal visibility
  const [deletingId, setDeletingId] = useState<string | null>(null); // Store the id of the inquiry to be deleted

  // Use the DELETE mutation
  const [deleteCustomerInquiry] = useMutation(DELETE_CUSTOMER_INFO, {
    onCompleted: () => {
      setIsDeleteModalVisible(false);
      setDeletingId(null);
      message.success("Customer inquiry deleted successfully."); // Show success message
      refetch(); // Refetch the data to update the table
    },
    onError: (error) => {
      console.error("Error deleting customer inquiry:", error);
      message.error("Failed to delete customer inquiry."); // Show error message
    },
  });

  // Handle opening of the modal and setting the selected message
  const handleMessageClick = (message: string) => {
    setSelectedMessage(message); // Set the selected message
    setIsModalVisible(true); // Show the modal
  };

  // Close the message modal
  const handleCloseModal = () => {
    setIsModalVisible(false); // Hide the modal
    setSelectedMessage(""); // Clear the message content
  };

  // Handle opening the delete modal
  const handleDelete = (id: string) => {
    setDeletingId(id); // Set the ID of the inquiry to delete
    setIsDeleteModalVisible(true); // Show the delete confirmation modal
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (deletingId) {
      deleteCustomerInquiry({ variables: { id: deletingId } });
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setIsDeleteModalVisible(false); // Close the delete modal
    setDeletingId(null); // Clear the deleting ID
  };

  // Filter the data based on searchText (applies to all fields)
  const filteredData = data?.getAllCustomerInquiries.filter((contact) => {
    const lowercasedSearchText = searchText.toLowerCase();
    return (
      contact.name.toLowerCase().includes(lowercasedSearchText) ||
      contact.email.toLowerCase().includes(lowercasedSearchText) ||
      contact.phone.toLowerCase().includes(lowercasedSearchText) ||
      contact.message.toLowerCase().includes(lowercasedSearchText) ||
      contact.id.toString().includes(lowercasedSearchText) ||
      contact.category.toLowerCase().includes(lowercasedSearchText)
    );
  });

  const columns = [
    {
      title: "SL",
      key: "index",
      width: 50,
      render: (_: any, __: any, index: number) => index + 1, // Display serial number
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => <span>{id}</span>, // Display the ID (string format)
    },
    {
      title: "Reason for Contacting",
      dataIndex: "category", // Now mapping to the 'category' field
      key: "category",
      render: (category: string) => {
        const match = reasonOptions.find((opt) => opt.value === category);
        return (
          <Tag color={match?.color || "default"}>
            {match?.title || category}
          </Tag>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true,
      render: (message: string) => (
        <a
          onClick={() => handleMessageClick(message)} // Clicking on the message opens the modal
          style={{ color: "blue", cursor: "pointer" }}
        >
          {message.length > 30 ? message.slice(0, 30) + "..." : message}{" "}
          {/* Show truncated message */}
        </a>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        // Format the createdAt date to a readable format (e.g., YYYY-MM-DD)
        const date = new Date(createdAt);
        return <span>{date.toLocaleDateString()}</span>; // Format it as needed
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: CustomerInquiry) => (
        <Button
          danger
          onClick={() => handleDelete(record.id)} // Trigger the delete modal on button click
        >
          Delete
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="h-full min-h-[80vh] w-full flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 bg-white shadow-sm dark:bg-gray-900 rounded-xl">
      <Title level={4} className="!text-gray-800 dark:!text-white mb-4">
        All Customer Inquiries
      </Title>

      {/* Search Input without the Search button */}
      <Search
        placeholder="Search Inquiries"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} // Real-time search as user types
        className="mb-4"
      />

      <Table
        columns={columns}
        dataSource={filteredData || []} // Use the filtered data
        pagination={{ pageSize: 5 }}
        bordered
        className="rounded-lg"
        rowKey="id" // Ensure the row key is the id (UUID format)
      />

      {/* Modal to display the full message */}
      <Modal
        title="Message Details"
        visible={isModalVisible} // Modal visibility controlled by state
        onCancel={handleCloseModal} // Close modal on cancel
        footer={null} // No footer for the modal
        width={600} // You can adjust the width if needed
      >
        <p>{selectedMessage}</p> {/* Display the selected message */}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isDeleteModalVisible} // Delete modal visibility controlled by state
        onOk={confirmDelete} // Confirm deletion
        onCancel={cancelDelete} // Cancel deletion
        okText="Yes, Delete"
        cancelText="Cancel"
        width={400}
      >
        <p>Are you sure you want to delete this customer inquiry?</p>
      </Modal>
    </div>
  );
};

export default CustomerInformation;
