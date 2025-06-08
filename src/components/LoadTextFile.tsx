import { Upload, message } from "antd";

import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export interface LoadTextFileProps {
  onFileLoaded: (data: string, file: File) => void;
}

export const LoadTextFile = ({ onFileLoaded }: LoadTextFileProps) => {
  return (
    <Dragger
      name="file"
      multiple={false}
      showUploadList={false}
      beforeUpload={file => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target?.result as string;
          onFileLoaded(data, file);
          message.success(`${file.name} file read successfully`);
        };
        reader.readAsText(file);
        return false;
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Upload JSON data from file.</p>
    </Dragger>
  );
};
