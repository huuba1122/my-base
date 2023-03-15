import React, { useEffect, useState } from 'react';
import { t } from 'ttag';

// ant
import { Table, Space, notification } from 'antd';

// apps
import { fetchGroups, deleteGroup } from '@src/services/api/group';
import { USER_ACTIONS } from '@services/constants';

import HasPermit from '@src/components/comon/HasPermit';
import { AddNewBtn, EditBtn, RemoveBtn } from '@src/components/comon/table/buttons';
import Dialog from '../dialog';

const pemGroup = 'group';
// ----------------------------------------------------------------
export default function GroupTable() {
  const dialogRef = React.useRef(null);
  const [list, setList] = useState([]);
  const [pems, setPems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getListGroups = (params) => {
    setLoading(true);
    fetchGroups(params)
      .then((res) => {
        setList(res.items);
        setPems(res.extra.permissions);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getListGroups();
  }, []);

  const onDelete = (id) => {
    deleteGroup(id)
      .then(() => {
        setList([...list.filter((item) => item.id !== id)]);
        notification.success({ message: 'Deleted role successfully!' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({ message: 'Deleted role failed!' });
      });
  };

  const toggleDialog = (id = 0) => {
    dialogRef.current.toggleModal(id);
  };

  const onChange = (id, data) => {
    if (!id) {
      setList([{ ...data }, ...list]);
    } else {
      setList([...list.map((item) => (item.id === id ? data : item))]);
    }
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
          <HasPermit pemGroup={pemGroup} action={USER_ACTIONS.update}>
            <EditBtn onClick={() => toggleDialog(record.id)} />
          </HasPermit>
          <HasPermit pemGroup={pemGroup} action={USER_ACTIONS.delete}>
            <RemoveBtn onConfirm={() => onDelete(record.id)} />
          </HasPermit>
        </Space>
      )
    }
  ];

  return (
    <div>
      <HasPermit pemGroup={pemGroup} action={USER_ACTIONS.add}>
        <div className="table-action">
          <AddNewBtn onClick={() => toggleDialog(0)} />
        </div>
      </HasPermit>

      <Table rowKey="id" columns={columns} dataSource={list} loading={loading} />
      <Dialog pems={pems} onChange={onChange} ref={dialogRef} />
    </div>
  );
}

GroupTable.displayName = 'GroupTable';
