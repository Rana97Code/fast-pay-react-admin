import { useQuery, useMutation } from "@apollo/client";
import {
  Spin,
  Typography,
  Table,
  Button,
  Modal,
  Input,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import { GET_CUSTOMER_ENQUERY_TITLE } from "../graphql/queries/customerInquery.queries";
import { UPDATE_CUSTOMER_ENQUERY_BANNER } from "../graphql/mutations/customer-enqury.mutations";
import axios from "axios"; // To upload images to Cloudinary

const { Title } = Typography;

const CustomerBanner = () => {
  const { loading, error, data, refetch } = useQuery(
    GET_CUSTOMER_ENQUERY_TITLE
  ); // Destructure refetch
  const [updateBanner] = useMutation(UPDATE_CUSTOMER_ENQUERY_BANNER); // Mutation hook
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalBackground, setModalBackground] = useState<string>("");
  const [file, setFile] = useState<any>(null); // To store selected file for upload

  const showModal = () => {
    setModalTitle(data?.getCustomerTitle?.heroTitle || "");
    setModalBackground(data?.getCustomerTitle?.background || "");
    setIsModalVisible(true);
  };

  // Cloudinary upload function
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // Use the environment variable for upload preset
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME); // Use the environment variable for cloud name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`, // Use cloud name from the environment variable
        formData
      );

      return response.data.secure_url; // Cloudinary URL of the uploaded image
    } catch (error) {
      message.error("Failed to upload image to Cloudinary.");
      console.error(error);
    }
  };

  const handleOk = async () => {
    try {
      // If a new file is selected, upload it to Cloudinary first
      let backgroundUrl = modalBackground;
      if (file) {
        backgroundUrl = await uploadToCloudinary(file);
        setModalBackground(backgroundUrl); // Update the state with the Cloudinary URL
      }

      // Execute the mutation to update the banner
      const { data } = await updateBanner({
        variables: {
          heroTitle: modalTitle,
          background: backgroundUrl,
        },
      });

      console.log("Updated Title:", data.updateCustomerBanner.heroTitle);
      console.log("Updated Background:", data.updateCustomerBanner.background);

      // After successful update, refetch the query to update the table data
      await refetch(); // This will refetch the data from the server

      // After refetching data, close the modal
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div className="h-full min-h-[80vh] w-full flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const heroTitle = data?.getCustomerTitle?.heroTitle || "Default Banner Title";
  const background = data?.getCustomerTitle?.background;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <Title level={4}>{text}</Title>, // Display the title
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="Banner"
          style={{ width: "100px", height: "auto" }}
        /> // Display the image
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="primary" onClick={showModal}>
          Edit
        </Button>
      ),
    },
  ];

  // The data for the table
  const tableData = [
    {
      key: "1",
      title: heroTitle,
      image: background, // The image URL
    },
  ];

  return (
    <div className="p-6 bg-white shadow-sm dark:bg-gray-900 rounded-xl">
      <h2 className="mb-3 text-2xl">Customer Inquery Banner</h2>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
        rowKey="key"
      />
      <Modal
        title="Edit Banner"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
        cancelText="Cancel"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
            placeholder="Enter banner title"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload New Background Image
          </label>
          <Upload
            beforeUpload={(file) => {
              setFile(file); // Store the selected file
              return false; // Prevent automatic upload
            }}
            showUploadList={false}
          >
            <Button>Click to Select Image</Button>
          </Upload>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerBanner;
