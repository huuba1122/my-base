import React, { useEffect, useState } from 'react';
import { t } from 'ttag';
import { useSetRecoilState } from 'recoil';
import { Row, Col, Table, Tooltip, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// request
import axios from '@services/api/axios';

// ----------------------------------------------------------------
export default function GroupTable() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getListGroups = (params) => {
    console.log(' fetch user');
    setLoading(true);
    axios
      .get('/account/role/', params)
      .then((res) => setList(res.items))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getListGroups();
  }, []);

  const onDelete = (id) => {
    getListGroups();
    console.log('delete', id);
  };

  const onUpdate = (id) => {
    console.log('update', id);
  };

  const columns = [
    {
      key: 'id',
      title: t`ID`,
      dataIndex: 'id'
    },
    {
      key: 'name',
      title: t`Name`,
      dataIndex: 'name'
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

  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={list} loading={loading} />
    </div>
  );
}

GroupTable.displayName = 'GroupTable';
