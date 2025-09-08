import React, { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_JOB_LISTING, UPDATE_JOB_LISTING } from "../../../graphql/mutations/mutations";
import { GET_JOB_LISTING } from "../../../graphql/queries/queries";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const AddJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data, loading } = useQuery(GET_JOB_LISTING, {
    variables: { id },
    skip: !id,
  });

  const [createJobListing] = useMutation(CREATE_JOB_LISTING);
  const [updateJobListing] = useMutation(UPDATE_JOB_LISTING);

  useEffect(() => {
    if (id && data) {
      const applyBeforeDate = data.getJobListing.applyBefore
        ? dayjs(data.getJobListing.applyBefore)
        : null;

      form.setFieldsValue({
        title: data.getJobListing.title,
        location: data.getJobListing.location,
        status: data.getJobListing.status,
        jobResponsibilities: data.getJobListing.jobResponsibilities.join(", "),
        educationalRequirements: data.getJobListing.educationalRequirements.join(", "),
        experienceRequirements: data.getJobListing.experienceRequirements.join(", "),
        additionalRequirements: data.getJobListing.additionalRequirements.join(", "),
        jobPreferences: data.getJobListing.jobPreferences.join(", "),
        benefits: data.getJobListing.benefits.join(", "),
        applyBefore: applyBeforeDate,
      });
    }
  }, [id, data, form]);

  const onFinish = (values: any) => {
    const variables = {
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      jobResponsibilities: values.jobResponsibilities.split(",").map((item: string) => item.trim()),
      educationalRequirements: values.educationalRequirements.split(",").map((item: string) => item.trim()),
      experienceRequirements: values.experienceRequirements.split(",").map((item: string) => item.trim()),
      additionalRequirements: values.additionalRequirements.split(",").map((item: string) => item.trim()),
      jobPreferences: values.jobPreferences.split(",").map((item: string) => item.trim()),
      benefits: values.benefits.split(",").map((item: string) => item.trim()),
    };

    if (id) {
      const { createdAt, updatedAt, ...updateInput } = variables;

      updateJobListing({
        variables: {
          id,
          updateJobListingInput: updateInput,
        },
      })
        .then(() => {
          navigate("/cms/home/jobs");
        })
        .catch((error) => console.error("Error updating job listing:", error));
    } else {
      createJobListing({
        variables: { createJobListingInput: variables },
      })
        .then(() => {
          navigate("/cms/home/jobs");
        })
        .catch((error) => console.error("Error creating job listing:", error));
    }
  };




  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
      <Title level={4}>{id ? "Edit Job" : "Add New Job"}</Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter job title" }]}
        >
          <Input placeholder="e.g. Frontend Developer" className="border-gray-300 rounded-md" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter job location" }]}
        >
          <Input placeholder="e.g. Dhaka, Bangladesh" className="border-gray-300 rounded-md" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select job status" }]}
        >
          <Select placeholder="Select status" className="border-gray-300 rounded-md">
            <Option value="Full-time">Full-Time</Option>
            <Option value="Part-time">Part-Time</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Apply Before"
          name="applyBefore"
          rules={[{ required: true, message: "Please select deadline" }]}
        >
          <DatePicker className="w-full border-gray-300 rounded-md" />
        </Form.Item>

        <Form.Item label="Job Responsibilities" name="jobResponsibilities">
          <Input.TextArea
            rows={3}
            placeholder="Separate multiple responsibilities with commas"
            className="border-gray-300 rounded-md"
          />
        </Form.Item>

        <Form.Item label="Educational Requirements" name="educationalRequirements">
          <Input.TextArea
            rows={3}
            placeholder="Separate multiple requirements with commas"
            className="border-gray-300 rounded-md"
          />
        </Form.Item>

        <Form.Item label="Experience Requirements" name="experienceRequirements">
          <Input.TextArea
            rows={3}
            placeholder="Separate multiple requirements with commas"
            className="border-gray-300 rounded-md"
          />
        </Form.Item>

        <Form.Item label="Additional Requirements" name="additionalRequirements">
          <Input.TextArea
            rows={3}
            placeholder="Separate multiple requirements with commas"
            className="border-gray-300 rounded-md"
          />
        </Form.Item>

        <Form.Item label="Job Preferences" name="jobPreferences">
          <Input.TextArea
            rows={3}
            placeholder="Separate multiple preferences with commas"
            className="border-gray-300 rounded-md"
          />
        </Form.Item>

        <Form.Item label="Benefits" name="benefits">
          <Input.TextArea
            rows={3}
            placeholder="Separate multiple benefits with commas"
            className="border-gray-300 rounded-md"
          />
        </Form.Item>

        <Form.Item className="md:col-span-2 text-right">
          <Button type="primary" htmlType="submit">
            {id ? "Update Job" : "Add Job"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddJob;
