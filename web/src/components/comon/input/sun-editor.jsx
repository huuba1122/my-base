import React from 'react';
import PropTypes from 'prop-types';
import SunEditorPlugin from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

import httpClient from '@services/api/axios';

const uploadAttachment = (to, formData) => httpClient.post(to, formData);
// ----------------------------------------------------------------
function SunEditor({ error, value, onChange, placeholder, uploadTo, uid, ...other }) {
  const onImageUploadBefore = (files, info, uploadHandler) => {
    // Upload image to Server
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('in_content', true);
    if (uid) {
      formData.append('post_uid', uid);
    }

    uploadAttachment(to, formData).then((res) => {
      // result
      const response = {
        // The response must have a "result" array.
        result: [
          {
            url: res.data?.url,
            name: files[0].name,
            size: files[0].size
          }
        ]
      };

      uploadHandler(response);
    });

    return undefined;
  };

  return (
    <div>
      <SunEditorPlugin
        setContents={value}
        config={{ readonly: false }}
        onImageUploadBefore={onImageUploadBefore}
        onChange={(val) => onChange(val)}
        setOptions={{
          placeholder,
          mode: 'classic',
          rtl: false,
          katex: 'window.katex',
          buttonList: [
            [
              'undo',
              'redo',
              'font',
              'fontSize',
              'formatBlock',
              'paragraphStyle',
              'blockquote',
              'bold',
              'underline',
              'italic',
              'strike',
              'subscript',
              'superscript',
              'fontColor',
              'hiliteColor',
              'textStyle',
              'removeFormat',
              'outdent',
              'indent',
              'align',
              'horizontalRule',
              'list',
              'lineHeight',
              'table',
              'link',
              'image',
              'video',
              'audio',
              'math',
              'imageGallery',
              'fullScreen',
              'showBlocks',
              'codeView',
              'preview',
              'print',
              'save',
              'template'
            ]
          ]
        }}
        {...other}
      />
    </div>
  );
}

SunEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  sx: PropTypes.object,
  uploadTo: PropTypes.string.isRequired,
  uid: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string
};

SunEditor.defaultProps = {
  value: '',
  height: 200,
  placeholder: 'Nhập nội dung...'
};

export default SunEditor;
