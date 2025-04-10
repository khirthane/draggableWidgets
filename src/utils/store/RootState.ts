export type RootState = {
  widgets: {
    widgets: Record<
      string,
      {
        isLoading: boolean;
        isError: boolean;
        refetch?: () => void;
        title?: string;
      }
    >;
  };
};
