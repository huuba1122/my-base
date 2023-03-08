import React, { useEffect, useState } from 'react';
import { t } from 'ttag';
import { useSetRecoilState } from 'recoil';

// ant
import { Table, Space, notification } from 'antd';

// apps
import { fetchCategories, deleteCategory } from '@src/services/api/category';
import { categoryOptionsSt } from '@recoil/category';

import { AddNewBtn, EditBtn, RemoveBtn } from '@src/components/comon/buttons';
import Dialog from '../dialog';

// ----------------------------------------------------------------
export default function CategoryTable() {
  const dialogRef = React.useRef(null);
  const setCategoryState = useSetRecoilState(categoryOptionsSt);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getListGroups = (params) => {
    setLoading(true);
    fetchCategories(params)
      .then((res) => {
        setList(res.items);
        setCategoryState(res.extra.options);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getListGroups();
  }, []);

  const onDelete = (id) => {
    deleteCategory(id)
      .then(() => {
        getListGroups();
        notification.success({ message: 'Deleted category successfully!' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({ message: 'Deleted category failed!' });
      });
  };

  const toggleDialog = (id = 0) => {
    dialogRef.current.toggleModal(id);
  };

  const onChange = (id, data) => {
    console.log({ id, data });
    getListGroups();
  };

  const columns = [
    {
      title: t`ID`,
      dataIndex: 'id'
    },
    {
      title: t`Title`,
      dataIndex: 'title'
    },
    {
      title: t`Parent`,
      dataIndex: ['parent', 'title']
    },
    {
      title: '',
      fixed: 'right',
      width: 90,
      render: (_text, record) => (
        <Space size="middle">
          <EditBtn onClick={() => toggleDialog(record.id)} />
          <RemoveBtn onConfirm={() => onDelete(record.id)} />
        </Space>
      )
    }
  ];

  return (
    <div>
      <div className="table-action">
        <AddNewBtn onClick={() => toggleDialog(0)} />
      </div>

      <Table rowKey="id" columns={columns} dataSource={list} loading={loading} />
      <Dialog onChange={onChange} ref={dialogRef} />
    </div>
  );
}

CategoryTable.displayName = 'CategoryTable';
