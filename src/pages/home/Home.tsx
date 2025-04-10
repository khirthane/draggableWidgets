import NewsWidget from '@/components/widgets/NewsWidget';
import NotesWidget from '@/components/widgets/NotesWidget';
import WeatherWidget from '@/components/widgets/WeatherWidget';
import WidgetWrapper from '@/components/WidgetWrapper';
import { defaultWidgetValues } from '@/constants/defaultWidgets';
import { Widget, WIDGET_TYPE } from '@/types';
import { generateLayouts } from '@/utils/helpers/generateLayout';
import { addWidget, resetWidgets } from '@/utils/store/slices/widgetSlice';
import React from 'react';

import { Responsive, WidthProvider } from 'react-grid-layout';
import { useDispatch, useSelector } from 'react-redux';
const Home: React.FC = () => {
  const dispatch = useDispatch();

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const widgets: Widget[] = useSelector(
    (state: { widgets: { widgets: Widget[] } }) => state.widgets.widgets
  );

  const layouts = React.useMemo(() => generateLayouts(widgets), [widgets]);

  const handleAddWidget = (widgetType: WIDGET_TYPE) => {
    const newWidget: Widget = {
      id: `${widgetType}-${Date.now()}`,
      type: widgetType,
      title: `${widgetType.charAt(0).toUpperCase() + widgetType.slice(1)}`,
      value: defaultWidgetValues[widgetType],
    };

    dispatch(addWidget(newWidget));
  };

  const handleReset = () => {
    dispatch(resetWidgets());
  };

  return (
    <>
      <div className='add-widget-buttons flex gap-4 my-4 mx-2'>
        <div className='left-buttons flex gap-4'>
          <button
            onClick={() => handleAddWidget(WIDGET_TYPE.WEATHER)}
            className='btn-primary'
          >
            Add Weather Widget
          </button>
          <button
            onClick={() => handleAddWidget(WIDGET_TYPE.NEWS)}
            className='btn-primary'
          >
            Add News Widget
          </button>
          <button
            onClick={() => handleAddWidget(WIDGET_TYPE.NOTES)}
            className='btn-primary'
          >
            Add Notes Widget
          </button>
        </div>
        <button onClick={() => handleReset()} className='btn-primary ml-auto'>
          Reset Widgets
        </button>
      </div>

      <ResponsiveGridLayout
        className='layout'
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 10, sm: 6 }}
        rowHeight={100}
        isResizable
        draggableHandle='.drag-handle'
        useCSSTransforms={false}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <WidgetWrapper title={widget.title} widgetId={widget.id}>
              {widget.type === WIDGET_TYPE.WEATHER && (
                <WeatherWidget widgetId={widget.id} location={widget.value} />
              )}
              {widget.type === WIDGET_TYPE.NEWS && (
                <NewsWidget widgetId={widget.id} countryCode={widget.value} />
              )}
              {widget.type === WIDGET_TYPE.NOTES && (
                <NotesWidget widgetId={widget.id} initialNotes={widget.value} />
              )}
            </WidgetWrapper>
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
};

export default Home;
