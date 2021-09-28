import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export function ScrollToTop() {
  const history = useHistory()
  useEffect(() => {
    const unlisten = history.listen((location: any, action: any) => {
      if (action !== 'POP' && action !== 'REPLACE') {
        window.scrollTo(0, 0)
      }
    })
    return () => unlisten()
  }, [history]);
  return (null)
}