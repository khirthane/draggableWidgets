import { RootState } from '@/utils/store';
import { removeWidget } from '@/utils/store/slices/widgetSlice';
import React, { useCallback } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectWidgetState = createSelector(
  [(state: RootState, widgetId: string) => state.widgets.widgetState[widgetId]],
  (widgetState) =>
    widgetState || { isLoading: false, isError: false, isFetching: false }
);

interface WidgetWrapperProps {
  widgetId: string;
  title: string;
  children: React.ReactNode;
}

const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  widgetId,
  title,
  children,
}) => {
  const dispatch = useDispatch();

  const widgetState = useSelector((state: RootState) =>
    selectWidgetState(state, widgetId)
  );

  const { isLoading, isError, isFetching } = widgetState;

  // Memoize handleDelete function to prevent unnecessary re-creations
  const handleDelete = useCallback(() => {
    dispatch(removeWidget(widgetId));
  }, [dispatch, widgetId]);

  return (
    <div className='card'>
      <div className='flex flex-col h-full'>
        <div className='flex items-center'>
          <div className='drag-handle card-header'>{title}</div>
          <div className='pr-2'>
            <RxCross1
              onClick={handleDelete}
              className='text-gray-400 hover:text-gray-800 cursor-pointer'
              title='Delete widget'
            />
          </div>
        </div>

        {isLoading || isFetching ? (
          <div className='flex-1 flex items-center justify-center text-gray-500'>
            Loading...
          </div>
        ) : isError ? (
          <div className='flex-1 flex items-center justify-center text-red-500'>
            Error fetching data
          </div>
        ) : (
          <div className='flex-1 overflow-y-auto p-4 custom-scrollbar'>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetWrapper;
