import { ReactNode } from 'react';
import useSWR from "swr";

import { SERVER_BASE_URL } from '@/lib/utils/constant';
import fetcher from '@/lib/utils/fetcher';
import { ArticleContextProvider } from '../../../lib/context/ArticleContext';

export default function ArticleLayout({
  children, params
}: {
  children: ReactNode;
  params: { pid: string }
}) {
  const {
    data: fetchedArticle,
  } = useSWR(
    `${SERVER_BASE_URL}/articles/${encodeURIComponent(String(params.pid))}`,
    fetcher,
    { initialData: {} }
  );

  return (
    <ArticleContextProvider article={fetchedArticle.article}>
      {children}
    </ArticleContextProvider>
  );
}