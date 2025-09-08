// src/common/BannerInfo.tsx

import React, { useState } from "react";
import { Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

// Define the props for the BannerInfo component
interface BannerInfoProps {
  initialTitle?: string;
  initialSubtitle?: string; // Add this line
  initialImage?: string;
  onSubmit: (title: string, subtitle: string, image: string) => void;
}

const BannerInfo: React.FC<BannerInfoProps> = ({
  initialTitle = "A LEGACY OF EXCELLENCE",
  initialSubtitle = "", // Default value for subtitle
  initialImage = "",
  onSubmit,
}) => {
  const [pageTitle, setPageTitle] = useState<string>(initialTitle);
  const [pageSubtitle, setPageSubtitle] = useState<string>(initialSubtitle); // Add pageSubtitle state
  const [bannerImage, setBannerImage] = useState<string>(initialImage);
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file.originFileObj);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_UPLOAD_PRESET as string
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME as string);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      const uploadedUrl = response.data.secure_url;
      return uploadedUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Image upload failed.");
      throw error;
    }
  };

  const handleBannerSubmit = async (): Promise<void> => {
    if (!fileList.length && !bannerImage) {
      message.error("Please upload banner image.");
      return;
    }

    setLoading(true);

    let newBannerImage = bannerImage;

    if (fileList[0]?.originFileObj) {
      newBannerImage = await handleImageUpload(fileList[0]);
    }

    setBannerImage(newBannerImage);
    // Pass subtitle as the second argument
    onSubmit(pageTitle, pageSubtitle, newBannerImage);
    message.success("Banner updated successfully!");

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Manage Banner Info</h2>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Page Title</label>
        <Input
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          className="border-gray-300 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Page Subtitle</label> {/* Add subtitle input */}
        <Input
          value={pageSubtitle}
          onChange={(e) => setPageSubtitle(e.target.value)}  // Handle subtitle change
          className="border-gray-300 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Banner Image</label>
        <Upload
          beforeUpload={() => false}  // Disable default upload behavior
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          listType="picture"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload Banner Image</Button>
        </Upload>
      </div>

      <div className="mb-6">
        {bannerImage && (
          <img
            src={bannerImage}
            alt="Banner"
            className="object-cover w-full rounded h-60"
          />
        )}
      </div>

      <Button type="primary" onClick={handleBannerSubmit} loading={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default BannerInfo;
