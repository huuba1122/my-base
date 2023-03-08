import React, { useState } from 'react';
import { UploadOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';

const { confirm } = Modal;

const crudUrl = 'articles/attachment/';
const transformFiles = (files) => {
  return files.map((file) => (file.id ? { ...file, name: file.title, url: file.file } : file));
};
// ----------------------------------------------------------------
const ArticleAttachment = ({ files, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const fileList = transformFiles(files);
  console.log({ files });

  const handleUpload = (input) => {
    console.log({ input });
    onChange(input.fileList);
  };

  const onConfirm = (file) => {
    console.log('remove ', file);
    const index = fileList.indexOf(file);
    console.log('index', index);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    onChange(newFileList);
    return false;
  };

  const showConfirm = (file) => {
    if (file.id) {
      confirm({
        title: 'Do you Want to delete this file?',
        icon: <ExclamationCircleFilled />,
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          })
            .then(() => onConfirm(file))
            .catch(() => console.log('Oops errors!'));
        }
      });
    } else {
      onConfirm(file);
    }
    return false;
  };

  return (
    <Upload
      multiple
      fileList={fileList}
      onChange={handleUpload}
      onRemove={showConfirm}
      onPreview={() => false}
      beforeUpload={() => false}
    >
      <Button icon={<UploadOutlined />} size="large">
        Select File
      </Button>
    </Upload>
  );
};
export default ArticleAttachment;
