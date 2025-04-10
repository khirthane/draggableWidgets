export enum WIDGET_TYPE {
  WEATHER = 'weather',
  NEWS = 'news',
  NOTES = 'notes',
}

export interface Widget {
  id: string;
  type: WIDGET_TYPE;
  title: string;
  value: any;
}
