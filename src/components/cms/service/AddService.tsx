import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_SERVICE } from "../../../graphql/mutations/service.mutations";
import { GET_ALL_SERVICES } from "../../../graphql/queries/service.queries";

const AddService = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createService] = useMutation(CREATE_SERVICE, {
    refetchQueries: [{ query: GET_ALL_SERVICES }],
  });

  const handleSubmit = async (values: {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
  }) => {
    setIsSubmitting(true);

    try {
      await createService({
        variables: {
          createServiceInput: {
            title: values.title,
            description: values.description,
            imageUrl: values.imageUrl,
            link: values.link,
          },
        },
      });

      message.success("Service created successfully!");
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error("Error creating service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-sm dark:bg-gray-900 rounded-xl">
      <h2 className="mb-6 text-xl font-semibold">Add New Service</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter the service title" },
          ]}
        >
          <Input
            placeholder="Enter service title"
            className="border-gray-300 rounded"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the service description" },
          ]}
        >
          <Input.TextArea
            placeholder="Enter service description"
            className="border-gray-300 rounded"
          />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[{ required: true, message: "Please enter the image URL" }]}
        >
          <Input
            placeholder="Enter service image URL"
            className="border-gray-300 rounded"
          />
        </Form.Item>

        <Form.Item
          label="Link"
          name="link"
          rules={[{ required: true, message: "Please enter the service link" }]}
        >
          <Input
            placeholder="Enter service link"
            className="border-gray-300 rounded"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Creating..." : "Add Service"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddService;
