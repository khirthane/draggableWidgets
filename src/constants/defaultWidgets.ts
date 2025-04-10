import { Widget, WIDGET_TYPE } from '@/types';
import { DEFAULTS } from '@/utils/queries/keys';

const timestamp = Date.now();

export const defaultWidgetValues = {
  [WIDGET_TYPE.WEATHER]: DEFAULTS.CITY,
  [WIDGET_TYPE.NEWS]: DEFAULTS.COUNTRY_CODE,
  [WIDGET_TYPE.NOTES]: '',
};

export const defaultWidgets: Widget[] = Object.entries(defaultWidgetValues).map(
  ([type, value], index) => ({
    id: `${type}-${timestamp + index}`,
    type: type as WIDGET_TYPE,
    title: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
    value,
  })
);
