import { useState } from "react";

const Customizer = ({ setLogoUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Care_Connect");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/di9ljccil/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (data.secure_url) {
        setLogoUrl(data.secure_url);
        setMessage("Logo uploaded successfully!");
        // Reset file input
        event.target.value = "";
      } else {
        setMessage("Upload failed. Please try again.");
        console.error("Upload failed:", data);
      }
    } catch (error) {
      setMessage("Error uploading image. Please try again.");
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Customize Your Shirt</h2>
        <div className="mb-4">
          <label
            htmlFor="logo-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Logo Image
          </label>
          <input
            type="file"
            id="logo-upload"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploading && (
            <p className="mt-2 text-sm text-blue-600">Uploading...</p>
          )}
          {message && (
            <p
              className={`mt-2 text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customizer;
