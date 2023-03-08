export const STATUS_VALUES = {
  deactivate: 1,
  pending: 2,
  activate: 3
};

export const STATUS = [
  { value: STATUS_VALUES.deactivate, label: 'deactivate', color: '#bfbfbf' },
  { value: STATUS_VALUES.pending, label: 'pending', color: '#1677ff' },
  { value: STATUS_VALUES.activate, label: 'activate', color: '#52c41a' }
];

export const URL_DELETE_BANNER = 'articles/:id/banner/';
