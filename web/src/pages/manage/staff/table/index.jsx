import React, { useEffect, useState } from 'react';
import { t } from 'ttag';
import { useRecoilState } from 'recoil';

// ant
import { Table, Space, notification } from 'antd';

// apps
import { fetchStaffs, deleteStaff } from '@src/services/api/staff';
import { staffSt } from '@src/recoil/user';
import { USER_ACTIONS } from '@services/constants';

import HasPermit from '@components/comon/HasPermit';
import Pagination from '@components/comon/table/pagination';
import { AddNewBtn, EditBtn, RemoveBtn } from '@src/components/comon/table/buttons';
import Dialog from '../dialog';

const pemGroup = 'staff';
// ----------------------------------------------------------------
export default function StaffTable() {
  const dialogRef = React.useRef(null);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [staffState, setStaffState] = useRecoilState(staffSt);
  const { items = [], count = 0, page_size: pageSize } = staffState;

  const getListUsers = (params) => {
    setLoading(true);
    fetchStaffs(params)
      .then(setStaffState)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getListUsers({ page });
  }, [page]);

  const onDelete = (id) => {
    deleteStaff(id)
      .then(() => {
        const newItems = items.filter((item) => item.id !== id);
        setStaffState({ ...staffState, items: newItems });
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
    const newItems = id ? items.map((item) => (item.id === id ? data : item)) : [{ ...data }, ...items];
    setStaffState({ ...staffState, items: newItems });
  };

  const handleChangePage = (page) => setPage(page);

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
      title: t`Phone number`,
      dataIndex: 'phone_number'
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

      <Table rowKey="id" columns={columns} dataSource={items} loading={loading} pagination={false} />
      <Pagination page={page} total={count} pageSize={pageSize} onChange={handleChangePage} />
      <Dialog onChange={onChange} ref={dialogRef} />
    </div>
  );
}

StaffTable.displayName = 'StaffTable';
