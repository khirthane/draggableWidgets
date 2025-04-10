import { defaultWidgets } from '@/constants/defaultWidgets';
import { Widget } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WidgetListState {
  widgets: Widget[];
  widgetState: {
    [widgetId: string]: {
      isLoading: boolean;
      isError: boolean;
      isFetching?: boolean;
      isWSConnected?: boolean;
    };
  };
}

const getInitialWidgets = (): Widget[] => {
  const items: Widget[] = [];

  Object.keys(localStorage).forEach((key) => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const widget = JSON.parse(data);
        if (widget?.id && widget.value !== undefined) {
          items.push(widget);
        }
      } catch (e) {
        console.error(`Failed to parse localStorage data for key: ${key}`, e);
      }
    }
  });

  // If no widgets found, fall back to default and persist them
  if (items.length === 0) {
    defaultWidgets.forEach((widget) => {
      localStorage.setItem(widget.id, JSON.stringify(widget));
      items.push(widget);
    });
  }

  return items;
};

const initialState: WidgetListState = {
  widgets: getInitialWidgets(),
  widgetState: {},
};

const persistWidgetData = (id: string, data: any) => {
  localStorage.setItem(id, JSON.stringify(data));
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    setWidgetState: (
      state,
      action: PayloadAction<{
        widgetId: string;
        isLoading: boolean;
        isError: boolean;
        isFetching?: boolean;
      }>
    ) => {
      const { widgetId, isLoading, isError, isFetching } = action.payload;
      state.widgetState[widgetId] = {
        isLoading,
        isError,
        isFetching,
      };
    },
    resetWidgets: (state) => {
      localStorage.clear();

      state.widgets = getInitialWidgets();
      state.widgetState = {};
    },
    addWidget: (state, action: PayloadAction<Widget>) => {
      const newWidget = action.payload;
      const exists = state.widgets.some((widget) => widget.id === newWidget.id);
      if (!exists) {
        persistWidgetData(newWidget.id, newWidget);
        state.widgets.push(newWidget);
      }
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      const widgetId = action.payload;
      state.widgets = state.widgets.filter((widget) => widget.id !== widgetId);
      delete state.widgetState[widgetId];

      localStorage.removeItem(widgetId);
    },
    saveWidget: (state, action: PayloadAction<{ id: string; data: any }>) => {
      const { id, data } = action.payload;

      state.widgets.forEach((widget) => {
        if (widget.id === id) {
          widget.value = data;
          persistWidgetData(id, widget);
        }
      });
    },
    saveWidgetLayout: (
      state,
      action: PayloadAction<{ id: string; data: any }>
    ) => {
      const { id, data } = action.payload;

      state.widgets.forEach((widget) => {
        if (widget.id === id) {
          widget.value = data;
          persistWidgetData(id, widget);
        }
      });
    },
  },
});

export const {
  setWidgetState,
  resetWidgets,
  addWidget,
  removeWidget,
  saveWidget,
} = widgetSlice.actions;

export default widgetSlice.reducer;
