import { Observable } from 'rxjs';

/**
 * 文字を渡された文字数で省略する
 */
export const omitText = (text: string, maxLength: number = 20): string => {
  if (text.length > maxLength) {
    text = `${text.substr(0, maxLength)}...`;
  }
  return text;
};

/**
 * 渡された回数だけ関数を実行する
 */
export const times = (n: number) => {
  return (fn: (index: number) => void) => {
    for (let i = 0; i < n; i++) {
      fn(i);
    }
  };
};

/**
 * string[]を<br />でつなげる
 */
export function joinWithBr(texts: string[]): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  for (let i = 0; i < texts.length; i++) {
    result.push(texts[i]);
    result.push(<br key={i} />);
  }

  result.splice(result.length - 1, 1);
  return result;
}

export function isJapan(lang: string): boolean {
  return lang === 'ja-JP' || lang === 'ja';
}

/**
 * ネットワーク接続状態のObservableを生成する
 */
export function createNetworkStatusObserver(): Observable<boolean> {
  return new Observable(observer => {
    observer.next(navigator.onLine);
    const onlineHandler = () => observer.next(true);
    const offlineHandler = () => observer.next(false);
    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  });
}
