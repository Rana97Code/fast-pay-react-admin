import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Typography,
  Modal,
  message,
  Form,
  Input,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_SERVICES } from "../../../graphql/queries/service.queries"; // import the query
import {
  DELETE_SERVICE,
  UPDATE_SERVICE,
} from "../../../graphql/mutations/service.mutations"; // import the mutation

const { Title } = Typography;

// Interface for Service
interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  createdAt: string;
}

const ServiceList = () => {
  const { loading, error, data } = useQuery(GET_ALL_SERVICES);
  const [deleteServiceMutation] = useMutation(DELETE_SERVICE);
  const [updateServiceMutation] = useMutation(UPDATE_SERVICE);

  const [services, setServices] = useState<Service[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  const [form] = Form.useForm();

  // Update services state when data is fetched from GraphQL
  useEffect(() => {
    if (data && data?.getAllServices) {
      setServices(data?.getAllServices); // Set the services only when data is available
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (service: Service) => {
    setCurrentService(service);
    form.setFieldsValue({
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl,
      link: service.link,
    });
    setIsUpdateModalVisible(true);
  };

  const handleDelete = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (serviceToDelete) {
      try {
        // Trigger the mutation with the service ID
        await deleteServiceMutation({
          variables: { id: serviceToDelete?.id },
        });

        // Update the services list by filtering out the deleted service
        setServices(
          services.filter((service) => service?.id !== serviceToDelete?.id)
        );

        // Close the modal and reset the state
        setIsDeleteModalVisible(false);
        setServiceToDelete(null);

        // Show success message
        message.success("Service deleted successfully.");
      } catch (error) {
        console.log(error);
        message.error("Error deleting service.");
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setServiceToDelete(null);
  };

  const handleUpdateService = async () => {
    if (currentService) {
      const values = form.getFieldsValue();

      try {
        await updateServiceMutation({
          variables: {
            id: currentService.id,
            updateServiceInput: values,
          },
        });

        // Update the services list with the updated service
        setServices(
          services.map((service) =>
            service.id === currentService.id
              ? { ...service, ...values }
              : service
          )
        );

        // Close the modal
        setIsUpdateModalVisible(false);
        setCurrentService(null);

        // Show success message
        message.success("Service updated successfully.");
      } catch (error) {
        console.log(error);
        message.error("Error updating service.");
      }
    }
  };

  const handleCancelUpdate = () => {
    setIsUpdateModalVisible(false);
    setCurrentService(null);
  };

  const columns = [
    {
      title: "#",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Service Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => <strong>{title}</strong>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => <span>{text.slice(0, 50)}...</span>,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (link: string) => (
        <a href={link} target="_blank" rel="noopener noreferrer">
          View
        </a>
      ),
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Service) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="default"
            onClick={() => handleEdit(record)}
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

  return (
    <div className="p-6 bg-white shadow-sm dark:bg-gray-900 rounded-xl">
      <div className="flex justify-between pb-4">
        <Title level={4} className="!text-gray-800 dark:!text-white mb-4">
          Services
        </Title>
        <Link to="/cms/home/service-add-service">
          <Button type="primary" icon={<IoMdAdd />}>
            Add New Service
          </Button>
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={services}
        pagination={{ pageSize: 5 }}
        bordered
        className="rounded-lg"
      />

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this service?</p>
      </Modal>

      {/* Update Service Modal */}
      <Modal
        title="Update Service"
        visible={isUpdateModalVisible}
        onOk={handleUpdateService}
        onCancel={handleCancelUpdate}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="updateServiceForm">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input the service title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the service description!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[
              {
                required: true,
                message: "Please input the service image URL!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="link"
            label="Link"
            rules={[
              { required: true, message: "Please input the service link!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceList;
