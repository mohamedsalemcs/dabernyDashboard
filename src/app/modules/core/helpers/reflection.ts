import { TemplateRef, ViewChildren } from '@angular/core';
export class Reflection {
  static GetValueByProbertyName(entity: any, propertyName: string) {
    let dataObject = null;
    if (propertyName && entity) {
      if (propertyName.indexOf('.') === -1) {
        dataObject = entity[propertyName];
      } else {
        const keys = propertyName.split('.');
        dataObject = { ...entity };
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index];
          dataObject = dataObject[key];
          if (!dataObject) {
            break;
          }
        }
      }
    }
    return dataObject;
  }


  static ObjectToArray(obj: {}) {
    const resultArr = [];
    if (obj && !Array.isArray(obj)) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const propObj = {};
          propObj[key] = obj[key];
          resultArr.push(propObj);
        }
      }
    }
    return resultArr;
  }
  static getKeysArray(obj: {}) {
    const resultArr: string[] = [];
    if (obj && !Array.isArray(obj)) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          resultArr.push(key);
        }
      }
    }
    return resultArr;
  }

  static ObjectToKeyValueArray(obj: {}) {
    const resultArr: { key: string, value: any }[] = [];
    if (obj && !Array.isArray(obj)) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          resultArr.push({ key: key, value: obj[key] });
        }
      }
    }
    return resultArr;
  }
  static copy(obj) {
    let output, v, key;
    output = Array.isArray(obj) ? [] : (obj ? {} : obj);
    // tslint:disable-next-line: forin
    for (key in obj) {
      v = obj[key];

      output[key] = (typeof v === 'object' && !(v instanceof TemplateRef) && !(v instanceof ViewChildren)) ? Reflection.copy(v) : v;
    }
    return output;
  }

  static treeify<T>(list: any[], idAttr: string, parentAttr: string, childrenAttr: string) {
    if (!idAttr) { idAttr = 'id'; }
    if (!parentAttr) { parentAttr = 'parent'; }
    if (!childrenAttr) { childrenAttr = 'children'; }

    const lookup = {};
    const result: T = {} as T;
    result[childrenAttr] = [];
    if (list && list.length > 0) {
      list.forEach(function (obj) {
        lookup[obj[idAttr]] = obj;
        obj[childrenAttr] = [];
      });

      list.forEach(function (obj) {
        if (obj[parentAttr] && lookup[obj[parentAttr]]) {
          lookup[obj[parentAttr]][childrenAttr].push(obj);
        } else {
          result[childrenAttr].push(obj);
        }
      });
    }

    return result;
  }

  static flatten(treeObj: any, idAttr: string, parentAttr: string, childrenAttr: string, levelAttr: string, filter?: (obj: any) => boolean) {
    if (!idAttr) { idAttr = 'id'; }
    if (!parentAttr) { parentAttr = 'parent'; }
    if (!childrenAttr) { childrenAttr = 'children'; }
    if (!levelAttr) { levelAttr = 'level'; }

    function flattenChild(childObj, parentId, level) {
      let array = [];
      if (!filter || (filter && filter(childObj) === true)) {
        const childCopy = Reflection.copy(childObj);
        childCopy[levelAttr] = level;
        childCopy[parentAttr] = parentId;
        delete childCopy[childrenAttr];
        array.push(childCopy);

        array = array.concat(processChildren(childObj, level));
      }
      return array;
    }

    function processChildren(obj, level?) {
      if (!level) { level = 0; }
      let array = [];
      if (!filter || (filter && filter(obj) === true)) {
        obj[childrenAttr].forEach(function (childObj) {
          array = array.concat(flattenChild(childObj, obj[idAttr], level + 1));
        });
      }


      return array;
    }

    const result = processChildren(treeObj);
    return result;
  }

  static searchInTree(tree: any[], key: string, value: any, childrenKey: string): any {
    if (key && value && childrenKey) {
      for (const item of tree) {
        if (item[key] === value) {
          return item;
        }
        if (item[childrenKey] && item[childrenKey].length > 0) {
          Reflection.searchInTree(item[childrenKey], key, value, childrenKey);
        }
      }
    }
    return null;
  }
  static arrayTreeFilter<T>(
    data: T[],
    filterFn: (item: T, level: number) => boolean,
    options?: {
      childrenKeyName?: string;
    }
  ) {
    options = options || {};
    options.childrenKeyName = options.childrenKeyName || 'children';
    let children = data || [];
    const result: T[] = [];
    let level = 0;
    do {
      const foundItem: T = children.filter(function (item) {
        return filterFn(item, level);
      })[0];
      if (!foundItem) {
        break;
      }
      result.push(foundItem);
      children = (foundItem as any)[options.childrenKeyName] || [];
      level += 1;
    } while (children.length > 0);
    return result;
  }
}
