
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { Category, MenuItem } from '../../data/menuData';

interface Restaurant {
  id: number;
  name: string;
  image?: string;
}

interface RestaurantState {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  categories: Category[];
  menuItems: MenuItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  selectedRestaurant: null,
  categories: [],
  menuItems: [],
  isLoading: false,
  error: null,
};

// Async thunks for restaurant data
export const fetchRestaurants = createAsyncThunk(
  'restaurant/fetchRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/restaurants');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch restaurants');
    }
  }
);

export const fetchRestaurantCategories = createAsyncThunk(
  'restaurant/fetchCategories',
  async (restaurantId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/restaurants/${restaurantId}/categories`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const fetchCategoryMenuItems = createAsyncThunk(
  'restaurant/fetchMenuItems',
  async ({ restaurantId, categoryId }: { restaurantId: number, categoryId: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/restaurants/${restaurantId}/categories/${categoryId}/menu-items`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch menu items');
    }
  }
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
    clearRestaurantError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch restaurants
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurants = action.payload;
        if (!state.selectedRestaurant && action.payload.length > 0) {
          state.selectedRestaurant = action.payload[0];
        }
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
      
    // Fetch categories
    builder
      .addCase(fetchRestaurantCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchRestaurantCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
      
    // Fetch menu items
    builder
      .addCase(fetchCategoryMenuItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menuItems = action.payload;
      })
      .addCase(fetchCategoryMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedRestaurant, clearRestaurantError } = restaurantSlice.actions;
export default restaurantSlice.reducer;
