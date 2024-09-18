import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type FilterState = {
  filterBy: 'completed' | 'incomplete' | undefined;
};

const initialState: FilterState = {
  filterBy: undefined,
};

const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    setFilterBy: (state, action: PayloadAction<FilterState['filterBy']>) => {
      state.filterBy = action.payload;
    },
  },
});

export const { setFilterBy } = filterSlice.actions;
export default filterSlice.reducer;
