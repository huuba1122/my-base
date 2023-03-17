import React from 'react';
import { t } from 'ttag';

// antd
import { Button, Modal, Upload, notification } from 'antd';
import { UploadOutlined, ExclamationCircleFilled } from '@ant-design/icons';

// app
import { deleteAttachment } from '@services/api/attachment';

const { confirm } = Modal;

const transformFiles = (files) => {
  return files.map((file) => (file.id ? { ...file, name: file.title, url: file.file } : file));
};
// ----------------------------------------------------------------
const ArticleAttachment = ({ files, onChange }) => {
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
        title: 'Do you want to delete this file?',
        icon: <ExclamationCircleFilled />,
        onOk() {
          deleteAttachment(file.id)
            .then(() => onConfirm(file))
            .catch((e) => notification.error({ message: t`Remove this item failed!` }));
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
