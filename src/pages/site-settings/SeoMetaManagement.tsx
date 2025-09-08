import { useState } from "react";
import { Button, Form, Input, message, Space } from "antd";

interface SeoMetaData {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
}

const SeoMetaManagement: React.FC = () => {
    const [seoMetaData, setSeoMetaData] = useState<SeoMetaData>({
        metaTitle: "Default Meta Title",
        metaDescription: "Default meta description of the site.",
        metaKeywords: "default, keywords, seo, site",
        ogTitle: "Default OG Title",
        ogDescription: "Description for Open Graph image.",
        ogImage: "https://example.com/default-og-image.jpg",
    });

    // Update the type of the event to handle both <input> and <textarea>
    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof SeoMetaData
    ) => {
        setSeoMetaData({ ...seoMetaData, [field]: e.target.value });
    };

    const handleSave = () => {
        // Save the updated contact information (e.g., make an API call to store the data)
        message.success("SEO Meta Data updated successfully!");
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className=" text-xl font-semibold mb-4">
                Manage SEO and Meta Data
            </h2>
            <div className="space-y-4">
                <Form layout="vertical">
                    <Form.Item label="Meta Title">
                        <Input
                            value={seoMetaData.metaTitle}
                            onChange={(e) => handleFormChange(e, "metaTitle")}
                            className="border-gray-300 rounded"
                        />
                    </Form.Item>
                    <Form.Item label="Meta Description">
                        <Input.TextArea
                            value={seoMetaData.metaDescription}
                            onChange={(e) => handleFormChange(e, "metaDescription")}
                            rows={4}
                            className="border-gray-300 rounded"
                        />
                    </Form.Item>
                    <Form.Item label="Meta Keywords (comma separated)">
                        <Input
                            value={seoMetaData.metaKeywords}
                            onChange={(e) => handleFormChange(e, "metaKeywords")}
                            className="border-gray-300 rounded"
                        />
                    </Form.Item>
                    <Form.Item label="Open Graph Title (OG Title)">
                        <Input
                            value={seoMetaData.ogTitle}
                            onChange={(e) => handleFormChange(e, "ogTitle")}
                            className="border-gray-300 rounded"
                        />
                    </Form.Item>
                    <Form.Item label="Open Graph Description (OG Description)">
                        <Input.TextArea
                            value={seoMetaData.ogDescription}
                            onChange={(e) => handleFormChange(e, "ogDescription")}
                            rows={4}
                            className="border-gray-300 rounded"
                        />
                    </Form.Item>
                    <Form.Item label="Open Graph Image URL">
                        <Input
                            value={seoMetaData.ogImage}
                            onChange={(e) => handleFormChange(e, "ogImage")}
                            className="border-gray-300 rounded"
                        />
                    </Form.Item>
                </Form>
                <Space className="mt-6">
                    <Button
                        type="primary"
                        onClick={handleSave}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Save Changes
                    </Button>
                </Space>
            </div>
        </div>
    );
};

export default SeoMetaManagement;
