import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';

// ant
import { Upload, Button, Modal } from 'antd';
import { UploadOutlined, ExclamationCircleFilled } from '@ant-design/icons';

// apps
import httpClient from '@services/api/axios';
import Utils from '@services/helpers/utils';

const { confirm } = Modal;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const BASE_STATIC_URL = 'http://localhost:8000';

// ----------------------------------------------------------------
UploadInput.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  size: PropTypes.string,
  accept: PropTypes.string,
  deleteUrl: PropTypes.string
};

UploadInput.defaultProps = {
  size: 'middle',
  accept: 'image/*'
};
// ----------------------------------------------------------------
function UploadInput({ file, onChange, size, accept, deleteUrl }) {
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewTitle, setPreviewTitle] = React.useState('');
  const fileTransfer = typeof file === 'string' ? { url: `${BASE_STATIC_URL}${file}`, name: file } : file;
  const [fileList, setFileList] = React.useState(fileTransfer ? [fileTransfer] : []);

  const handleChange = ({ file, fileList }) => {
    console.log('remove˝', fileList);
    const status = file?.status;
    const newFile = status === 'removed' ? null : file;
    const files = status === 'removed' ? [] : fileList;
    onChange(newFile);
    setFileList(files);
  };

  const showConfirm = (file) => {
    const removeFile = { ...file, status: 'removed' };
    if (!Utils.isFile(file?.originFileObj) && deleteUrl) {
      confirm({
        title: 'Do you Want to delete this file?',
        icon: <ExclamationCircleFilled />,
        onOk() {
          return httpClient
            .delete(deleteUrl)
            .then(() => handleChange({ file: removeFile }))
            .catch(() => console.log('Remove banner failed'));
        }
      });
    } else {
      handleChange({ file: removeFile });
    }
    return false;
  };

  const handleCancelPreview = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    console.log({ file });
    let { url, preview } = file;
    if (!url && !preview) {
      preview = await getBase64(file?.originFileObj);
    }
    setPreviewImage(url || preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url?.substring(file.url?.lastIndexOf('/')));
  };

  return (
    <>
      <Upload
        beforeUpload={() => false}
        listType="picture"
        maxCount={1}
        // showUploadList={false}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={showConfirm}
        accept={accept}
      >
        <Button icon={<UploadOutlined />} size={size}>{t`Upload`}</Button>
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}

UploadInput.propTypes = {
  file: PropTypes.object,
  onChange: PropTypes.func
};
UploadInput.displayName = 'UploadInput';
export default UploadInput;
