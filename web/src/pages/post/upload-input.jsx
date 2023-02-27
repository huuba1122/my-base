import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';

// ant
import { Upload, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// ----------------------------------------------------------------
function UploadInput({ file, onChange }) {
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewTitle, setPreviewTitle] = React.useState('');

  console.log({ file, onChange });

  const handleChange = ({ file }) => {
    onChange(file);
  };

  const handleCancelPreview = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    console.log({ file });
    let { url, preview } = file;
    if (!url && !preview) {
      preview = await getBase64(file.originFileObj);
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
        defaultFileList={file ? [file] : []}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>{t`Upload`}</Button>
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

// import React, { useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
// import { Modal, Upload } from 'antd';
// import type { RcFile, UploadProps } from 'antd/es/upload';
// import type { UploadFile } from 'antd/es/upload/interface';

// const getBase64 = (file: RcFile): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// const App: React.FC = () => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');
//   const [previewTitle, setPreviewTitle] = useState('');
//   const [fileList, setFileList] = useState<UploadFile[]>([
//     {
//       uid: '-1',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-2',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-3',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-4',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-xxx',
//       percent: 50,
//       name: 'image.png',
//       status: 'uploading',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-5',
//       name: 'image.png',
//       status: 'error',
//     },
//   ]);

//   const handleCancel = () => setPreviewOpen(false);

//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj as RcFile);
//     }

//     setPreviewImage(file.url || (file.preview as string));
//     setPreviewOpen(true);
//     setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
//   };

//   const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
//     setFileList(newFileList);

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );
//   return (
//     <>
//       <Upload
//         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 8 ? null : uploadButton}
//       </Upload>
//       <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
//         <img alt="example" style={{ width: '100%' }} src={previewImage} />
//       </Modal>
//     </>
//   );
// };

// export default App;
