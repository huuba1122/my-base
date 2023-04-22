import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const getRandomColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const UserAvatar = (props) => {
  const { url, label, style = {}, ...rest } = props;

  if (url && typeof url === 'string') return <Avatar {...rest} src={url} />;
  if (!label && typeof label !== 'string') return <Avatar icon={<UserOutlined />} {...rest} />;
  const firstChar = label.trim().charAt(0);
  const background = getRandomColor();
  return (
    <Avatar {...rest} style={{ ...style, color: '#fff', background }}>
      {firstChar}
    </Avatar>
  );
};

export default UserAvatar;
