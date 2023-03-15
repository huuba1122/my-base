import React, { useEffect, useState } from 'react';
import { t } from 'ttag';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

// ant
import { Table, Space, notification } from 'antd';

// apps
import { fetchPosts, deletePost } from '@src/services/api/post';
import { postSt } from '@recoil/post';
import { categoryOptionsSt } from '@recoil/category';
import { PRIVATE_PATHS } from '@routes/path';
import { USER_ACTIONS } from '@src/services/constants';

import HasPermit from '@components/comon/HasPermit';
import RowImage from '@components/comon/table/row-image';
import Pagination from '@components/comon/table/pagination';
import ElipsisText from '@components/comon/table/ellipsis-text';
import { AddNewBtn, EditBtn, RemoveBtn } from '@src/components/comon/table/buttons';
import Statuslabel from '../status-label';

const BASE_STATIC_URL = 'http://localhost:8000';
const pemGroup = 'post';
// ----------------------------------------------------------------
export default function PostTable() {
  const navigate = useNavigate();
  const setCategoryState = useSetRecoilState(categoryOptionsSt);
  const [postState, setPostState] = useRecoilState(postSt);
  const { items = [], count = 0, page_size: pageSize } = postState;

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getListPosts = (params) => {
    setLoading(true);
    fetchPosts(params)
      .then((res) => {
        setPostState(res);
        setCategoryState(res.extra.categories);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getListPosts({ page });
  }, [page]);

  const onDelete = (id) => {
    deletePost(id)
      .then(() => {
        const newItems = items.filter((item) => item.id !== id);
        setPostState({ ...postState, items: newItems });
        notification.success({ message: 'Deleted post successfully!' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({ message: 'Deleted post failed!' });
      });
  };

  const handleChangePage = (page) => setPage(page);

  const onClickAdd = () => navigate(PRIVATE_PATHS.post.create);

  const onClickUpdate = (id) => {
    const editUrl = PRIVATE_PATHS.post.edit.replace(':id', id);
    navigate(editUrl);
  };

  const columns = [
    {
      title: t`Banner`,
      dataIndex: 'banner',
      render: (banner) => <RowImage src={banner ? `${BASE_STATIC_URL}${banner}` : banner} />
    },
    {
      title: t`Title`,
      dataIndex: 'title',
      render: (title) => <ElipsisText rows={3}>{title}</ElipsisText>
    },
    {
      title: t`Desctiption`,
      dataIndex: 'description',
      render: (des) => <ElipsisText rows={3}>{des}</ElipsisText>
    },
    {
      title: t`Status`,
      dataIndex: 'status',
      render: (status) => <Statuslabel value={status} />
    },
    {
      title: '',
      fixed: 'right',
      width: 90,
      render: (_text, record) => (
        <Space size="middle">
          <HasPermit pemGroup={pemGroup} action={USER_ACTIONS.update}>
            <EditBtn onClick={() => onClickUpdate(record.id)} />
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
          <AddNewBtn onClick={() => onClickAdd()} />
        </div>
      </HasPermit>

      <Table rowKey="id" columns={columns} dataSource={items} loading={loading} pagination={false} />
      <Pagination page={page} total={count} pageSize={pageSize} onChange={handleChangePage} />
    </div>
  );
}

PostTable.displayName = 'PostTable';
