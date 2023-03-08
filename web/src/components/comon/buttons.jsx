import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';

// antd
import { Button, Tooltip, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

export function AddNewBtn({ onClick }) {
  return (
    <Button type="primary" icon={<PlusOutlined />} onClick={onClick}>
      {t`Add new`}
    </Button>
  );
}

export function EditBtn({ onClick }) {
  return (
    <Tooltip title={t`Update`}>
      <Button type="default" htmlType="button" icon={<EditOutlined />} size="small" title="hello" onClick={onClick} />
    </Tooltip>
  );
}

export function RemoveBtn({ onConfirm, confirmTitle = t`Do you Want to delete this item?` }) {
  const showConfirm = () => {
    confirm({
      title: confirmTitle,
      icon: <ExclamationCircleFilled />,
      onOk: () => onConfirm()
    });
  };

  return (
    <Tooltip title={t`Remove`}>
      <Button danger type="default" htmlType="button" icon={<DeleteOutlined />} size="small" onClick={showConfirm} />
    </Tooltip>
  );
}
