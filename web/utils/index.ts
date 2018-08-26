/**
 * 渡されたものを指定された数だけ
 * 複製して配列で返却
 */
export const duplicate = <T>(n: number) => {
  return (item: T): T[] => {
    const list: T[] = [];
    for (let i = 0; i < n; i++) {
      list.push(item);
    }
    return list;
  };
};

export const times = (n: number) => {
  return (fn: (index: number) => void) => {
    for (let i = 0; i < n; i++) {
      fn(i);
    }
  };
};
