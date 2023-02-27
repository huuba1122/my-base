import { describe, it, expect } from 'vitest';

import * as validations from '../helpers/validations';

describe('Test check type value', () => {
  it('verify aray', () => {
    const emptyArray = [];
    expect(validations.isArray(emptyArray)).toBeTruthy();
    const array = [1, 2, 3];
    expect(validations.isArray(array)).toBeTruthy();
    const nullValue = null;
    expect(validations.isArray(nullValue)).toBeFalsy();

    const undefineValue = undefined;
    expect(validations.isArray(undefineValue)).toBeFalsy();

    const stringValue = 'array';
    expect(validations.isArray(stringValue)).toBeFalsy();

    const numberValue = 1;
    expect(validations.isArray(numberValue)).toBeFalsy();

    const map = new Map([['id', 1]]);
    expect(validations.isArray(map)).toBeFalsy();
  });

  it('verify plain objects', () => {
    const obj = {};
    expect(validations.isPlainObject(obj)).toBeTruthy();

    const emptyObj = {};
    expect(validations.isPlainObject(emptyObj)).toBeTruthy();

    const array = [1, 2];
    expect(validations.isPlainObject(array)).toBeFalsy();

    const func = () => {
      console.log('this is function');
    };
    expect(validations.isPlainObject(func)).toBeFalsy();

    const map = new Map([['id', 1]]);
    expect(validations.isPlainObject(map)).toBeFalsy();

    class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }
    const objConstructor = new Person('Iron Man', 19);
    expect(validations.isPlainObject(objConstructor)).toBeFalsy();
  });
});
