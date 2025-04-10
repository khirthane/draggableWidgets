import { Widget } from '@/types';
import { Layout, Layouts } from 'react-grid-layout';

export const generateLayouts = (widgets: Widget[]): Layouts => {
  const baseLayout: Layout[] = widgets.map((widget, index) => ({
    i: widget.id,
    x: (index % 3) * 4, // 0, 4, 8
    y: Math.floor(index / 3) * 3, // new row every 3 widgets
    w: 4,
    h: 3,
  }));

  return {
    lg: baseLayout,
    md: baseLayout,
    sm: baseLayout.map((l) => ({ ...l, w: 6 })),
  };
};
