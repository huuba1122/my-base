import React, { useEffect, useState } from 'react';
import { t } from 'ttag';
import { useSetRecoilState } from 'recoil';
import { Row, Col, Table, Tooltip, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// request
import axios from '@services/api/axios';

// ----------------------------------------------------------------
export default function StaffTable() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getListUsers = (params) => {
    console.log(' fetch user');
    setLoading(true);
    axios
      .get('/account/staff/', params)
      .then((res) => setList(res.items))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getListUsers();
  }, []);

  const onDelete = (id) => {
    getListUsers();
    console.log('delete', id);
  };

  const onUpdate = (id) => {
    console.log('update', id);
  };

  const columns = [
    {
      key: 'full_name',
      title: t`Full name`,
      dataIndex: 'full_name'
    },
    {
      key: 'email',
      title: t`Email`,
      dataIndex: 'email'
    },
    {
      key: 'phone_number',
      title: t`phone_number`,
      dataIndex: 'phone_number'
    },
    {
      key: 'action',
      title: '',
      fixed: 'right',
      width: 90,
      render: (_text, record) => (
        <Space size="middle">
          <Tooltip title={t`Edit`} trigger="hover">
            <EditOutlined onClick={() => onUpdate(record.id)} />
          </Tooltip>
          <Tooltip title={t`Delete`} trigger="hover">
            <DeleteOutlined onClick={() => onDelete(record.id)} />
          </Tooltip>
        </Space>
      )
    }
  ];

  return <Table rowKey="id" columns={columns} dataSource={list} loading={loading} scroll={{ x: 1000 }} />;
}

StaffTable.displayName = 'StaffTable';
