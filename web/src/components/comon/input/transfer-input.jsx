import * as React from 'react';
import { Transfer } from 'antd';

import Utils from '@src/services/helpers/utils';

export class Service {
  /**
   * parseInput.
   *
   * @param {number[]} value
   * @param {string} level
   * @returns {string[]}
   */
  static parseInput(value) {
    if (!value) return [];
    return value.map((i) => `${i}`);
  }

  /**
   * parseOutput.
   *
   * @param {string[]} value
   * @param {string} level
   * @returns {number[]}
   */
  static parseOutput(value) {
    return value.map((i) => parseInt(i, 10));
  }
}

export default function TransferInput({ value, onChange, options, disabled = false }) {
  return (
    <Transfer
      showSearch
      dataSource={options}
      targetKeys={Service.parseInput(value)}
      disabled={disabled}
      onChange={(i) => onChange(Service.parseOutput(i))}
      filterOption={Utils.customFilterOption}
      render={(item) => (item.description ? `${item.title} - ${item.description}` : item.title)}
      listStyle={{
        width: 458,
        height: 512
      }}
    />
  );
}
