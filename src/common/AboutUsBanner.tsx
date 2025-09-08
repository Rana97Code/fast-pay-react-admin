// src/common/BannerInfo.tsx

import React, { useState } from "react";
import { Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

// Define the props for the BannerInfo component
interface BannerInfoProps {
  initialTitle?: string;
  initialImage?: string;
  onSubmit: (title: string, image: string) => void;
}

const AboutUsBanner: React.FC<BannerInfoProps> = ({
  initialTitle = "A LEGACY OF EXCELLENCE",
  initialImage = "",
  onSubmit,
}) => {
  const [pageTitle, setPageTitle] = useState<string>(initialTitle);
  const [bannerImage, setBannerImage] = useState<string>(initialImage);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  // Access Cloudinary environment variables from .env file
  const cloudinaryUploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloudinaryCloudName = import.meta.env.VITE_CLOUD_NAME;

  // Handle Banner Image Submit
  const handleBannerSubmit = async (): Promise<void> => {
    if (!fileList.length && !bannerImage) {
      message.error("Please upload banner image.");
      return;
    }

    let newBannerImage: string | undefined;

    // If a new image file is selected, upload it to Cloudinary
    if (fileList[0]?.originFileObj) {
      newBannerImage = await uploadToCloudinary(fileList[0]?.originFileObj);
    } else if (bannerImage) {
      // If no new image, use the existing banner image
      newBannerImage = bannerImage;
    }

    // Check if a valid image URL is available
    if (!newBannerImage) {
      message.error("No valid image URL found.");
      return;
    }

    setBannerImage(newBannerImage);  // Update the banner image state
    onSubmit(pageTitle, newBannerImage);  // Call the parent onSubmit function
    message.success("Banner updated successfully!");  // Show success message
  };

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string> => {
    if (!file) {
      message.error("No file selected for upload.");
      return "";
    }

    const data = new FormData();

    // Ensure the file is valid and append it to FormData
    if (file instanceof Blob) {
      data.append("file", file);
    } else {
      message.error("Invalid file type.");
      return "";
    }

    data.append("upload_preset", cloudinaryUploadPreset);

    setUploading(true);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploading(false);
      return res.data.secure_url;  // Return the Cloudinary URL
    } catch (err) {
      setUploading(false);
      console.error("Error uploading image:", err);
      message.error("Error uploading image to Cloudinary.");
      return "";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Banner Info</h2>

      {/* Page Title Input */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Page Title</label>
        <Input
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          className="border-gray-300 rounded"
        />
      </div>

      {/* Banner Image Upload */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Banner Image</label>
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

      {/* Banner Image Preview */}
      <div className="mb-6">
        {bannerImage && (
          <img src={bannerImage} alt="Banner" className="w-full h-60 object-cover rounded" />
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="primary"
        onClick={handleBannerSubmit}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default AboutUsBanner;
