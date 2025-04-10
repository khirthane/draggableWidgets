import { useNewsQuery } from '@/utils/queries/queries';
import { setWidgetState } from '@/utils/store/slices/widgetSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface NewsWidgetProps {
  widgetId: string;
  countryCode: string;
}
const NewsWidget = React.memo(({ widgetId, countryCode }: NewsWidgetProps) => {
  const { data, isLoading, isError, isFetching } = useNewsQuery(countryCode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        setWidgetState({
          widgetId,
          isLoading,
          isError,
          isFetching,
        })
      );
    }
  }, [dispatch, isLoading, isError, isFetching, widgetId]);

  return (
    <>
      {!!data && data.articles.length > 0 ? (
        <div className='space-y-4'>
          {data.articles.slice(0, 5).map((article, index) => (
            <div key={index}>
              <a
                href={article.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-800 text-sm leading-3'
              >
                {article.title}
              </a>
              <p className='text-xs text-gray-500 mt-1'>
                {article.source.name} •{' '}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !isLoading &&
        !isError && (
          <p className='text-gray-500 text-center'>No news available</p>
        )
      )}
    </>
  );
});
export default NewsWidget;
