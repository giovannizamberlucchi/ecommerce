import { Category } from '../../../payload/payload-types';

export type DataTree = {
  children?: DataTree[];
} & Category;

export const createDataTree = (dataset: Category[]): DataTree[] => {
  const hashTable = Object.create(null);
  dataset.forEach((aData) => (hashTable[aData.id] = { ...aData, children: [] }));
  const dataTree = [];
  dataset.forEach((aData) => {
    if (aData.parent !== null && typeof aData.parent !== 'string' && aData.parent?.id)
      hashTable[aData.parent?.id].children.push(hashTable[aData.id]);
    else dataTree.push(hashTable[aData.id]);
  });
  return dataTree;
};

let resultCategory: DataTree;
const searchCategory = (data: DataTree[], id: string): DataTree => {
  for (const item of data) {
    if (item.id === id) {
      resultCategory = item;
      break;
    } else {
      searchCategory(item.children, id);
    }
  }

  return resultCategory;
};

let Ids: string[] = [];
const childrenSearch = (categories: DataTree): string[] => {
  Ids = [...Ids, categories.id];
  if (categories.children !== undefined && categories.children !== null) {
    categories.children.map((child) => {
      childrenSearch(child);
    });
  }

  return Ids;
};
export const getChildrenIds = (categoryId: string, categories: Category[]): string[] => {
  Ids = [];
  const parentWithChildren = searchCategory(createDataTree(categories), categoryId);
  return childrenSearch(parentWithChildren);
};
