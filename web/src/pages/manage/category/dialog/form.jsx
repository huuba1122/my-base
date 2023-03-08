import * as React from 'react';
import { t } from 'ttag';
import { useRecoilValue } from 'recoil';

import { Form, Input, notification, Row, Col, Checkbox } from 'antd';

// apps
import Utils from '@src/services/helpers/utils';
import { createCategory, updateCategory } from '@src/services/api/category';
import { categoryOptionsSt } from '@recoil/category';

import SelectInput from '@components/comon/input/select';

// variables
const formName = 'CategoryForm';
const emptyFormData = { title: '', parent: null, is_menu: true, is_single: false };

/**
 * remove option it's self
 * @param {Array} originList
 * @param {number | null} excludeId
 * @return {Array}
 */
const getOptions = (originList, excludeId) => originList.filter((item) => item.value !== excludeId);

// ----------------------------------------------------------------
function CategoryForm({ onChange, data }) {
  const categoryOptions = useRecoilValue(categoryOptionsSt);

  const [form] = Form.useForm();
  const initialValues = Utils.isBlankObj(data) ? emptyFormData : data;
  const { id } = initialValues;

  const parentOptions = React.useMemo(() => getOptions(categoryOptions, id) || [], [id, categoryOptions]);

  const formAttrs = {
    title: {
      name: 'title',
      label: t`Title`,
      rules: [{ required: true, message: t`This field is required!` }]
    },
    parent: {
      name: 'parent',
      label: t`Parent`
    },
    isMenu: {
      name: 'is_menu'
    },
    isSingle: {
      name: 'is_single'
    }
  };

  const handleSubmit = (values) => {
    const action = id ? updateCategory(id, values) : createCategory(values);
    action
      .then((res) => {
        notification.success({ message: t`${id ? 'Update' : 'Create'} category successfully!` });
        form.resetFields();
        onChange(id, res);
      })
      .catch((err) => {
        console.error(err);
        notification.error({ message: t`${id ? 'Update' : 'Create'} category failed!` });
      });
  };

  React.useEffect(() => {
    form.resetFields();
  }, [data]);

  return (
    <Form name={formName} form={form} initialValues={{ ...initialValues }} onFinish={handleSubmit} layout="vertical">
      <Form.Item {...formAttrs.title}>
        <Input autoFocus size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.parent}>
        <SelectInput options={parentOptions} size="large" />
      </Form.Item>
      <Form.Item>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item {...formAttrs.isMenu} valuePropName="checked">
              <Checkbox>On menu</Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formAttrs.isSingle} valuePropName="checked">
              <Checkbox>Single</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}

CategoryForm.displayName = formName;
CategoryForm.formName = formName;
export default CategoryForm;
