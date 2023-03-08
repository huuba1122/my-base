import React from 'react';
import { t } from 'ttag';
import { v4 as uuid4 } from 'uuid';
import { useRecoilValue } from 'recoil';
// antd
import { Form, Input, Checkbox, Select, Button, notification } from 'antd';

// app
import { createPost, updatePost } from '@services/api/post';
import { categoryOptionsSt } from '@recoil/category';
import Utils from '@src/services/helpers/utils';
import { attachmentUrls } from '@services/api/urls';
import { createAttachment } from '@services/api/attachment';

import SunEditor from '@src/components/comon/input/sun-editor';
import SelectInput from '@components/comon/input/select';
import UploadInput from './upload-input';
import ArticleAttachment from './attachments';
import { STATUS, URL_DELETE_BANNER } from '../consts';

const formName = 'PostForm';
const postUuid = uuid4();

const emptyFormData = {
  id: 0,
  title: '',
  banner: null,
  body: '',
  description: '',
  on_menu: false,
  categories: [],
  status: 2
};

// ----------------------------------------------------------------
function PostForm({ data, onChange }) {
  const categoryOptions = useRecoilValue(categoryOptionsSt);
  const initialValues = Utils.isBlankObj(data) ? emptyFormData : data;
  const { id } = initialValues;

  const deleteBannerUrl = id ? URL_DELETE_BANNER.replace(':id', id) : '';

  const [form] = Form.useForm();
  const [attachments, setAttachments] = React.useState(initialValues?.attachments || []);

  const formAttrs = {
    title: {
      name: 'title',
      label: 'Title',
      rules: [{ required: true, message: 'Please input post title' }]
    },
    banner: {
      name: 'banner',
      label: 'Banner',
      valuePropName: 'file'
    },
    description: {
      name: 'description',
      label: 'Description'
    },
    body: {
      name: 'body',
      label: 'Content',
      rules: [{ required: true, message: 'Please input post content' }]
    },
    onMenu: {
      name: 'on_menu',
      label: 'Show on menu',
      valuePropName: 'checked'
    },
    status: {
      name: 'status',
      label: 'Status'
    },
    categories: {
      name: 'categories',
      label: 'Categories',
      rules: [{ required: true, message: 'Please choose categories' }]
    }
  };

  const getValidFiles = (files) => {
    if (!files || !files.length) return [];
    const validFiles = files.filter((file) => Utils.isFile(file.originFileObj));
    return validFiles.map((file) => file.originFileObj);
  };

  const bulkCreateAttachments = (attachments, postUid) => {
    if (!attachments.length) Promise.resolve(1);
    const attachmentRequest = attachments.map((attachment) => {
      const formData = new FormData();
      formData.append('file', attachment);
      formData.append('post_uid', postUid);
      return createAttachment(formData);
    });
    return Promise.all(attachmentRequest);
  };

  const handleSubmit = async (values) => {
    const params = Utils.removeKeysInObject(values, ['banner']);
    console.log({ values, params });
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      if (value && value.constructor === Array) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    if (Utils.isFile(values.banner)) {
      formData.append('banner', values.banner);
    }
    formData.append('uid', data?.uid ? data?.uid : postUuid);

    try {
      const newAttachments = getValidFiles(attachments);
      await bulkCreateAttachments(newAttachments, postUuid);
      const action = id ? updatePost(id, formData) : createPost(formData);
      const res = await action;
      notification.success({ message: t`${id ? 'Update' : 'Create'} post successfully!` });
      form.resetFields();
      onChange(id, res);
    } catch (error) {
      console.log('create post error', error);
      notification.error({ message: t`${id ? 'Update' : 'Create'} post failed!` });
    }
  };

  return (
    <Form
      name={formName}
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      labelAlign="left"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item {...formAttrs.title}>
        <Input size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.banner}>
        <UploadInput onChange={(file) => form.setFieldValue('banner', file)} size="large" deleteUrl={deleteBannerUrl} />
      </Form.Item>
      <Form.Item {...formAttrs.description}>
        <Input.TextArea rows={6} />
      </Form.Item>
      <Form.Item {...formAttrs.body}>
        <SunEditor
          onChange={(text) => form.setFieldValue('body', text)}
          uploadTo={attachmentUrls.base}
          uid={postUuid}
        />
      </Form.Item>
      <Form.Item {...formAttrs.categories}>
        <SelectInput options={categoryOptions} mode="multiple" size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.onMenu}>
        <Checkbox />
      </Form.Item>
      {id ? (
        <Form.Item {...formAttrs.status} wrapperCol={{ xs: 24, md: 6 }}>
          <Select filterOption={Utils.customFilterOption} options={STATUS} />
        </Form.Item>
      ) : null}
      <Form.Item label="Attachments">
        <ArticleAttachment files={attachments} onChange={(files) => setAttachments(files)} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 4 }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 8 }} size="large">
          {t`Submit`}
        </Button>
      </Form.Item>
    </Form>
  );
}

PostForm.displayName = formName;
export default PostForm;
