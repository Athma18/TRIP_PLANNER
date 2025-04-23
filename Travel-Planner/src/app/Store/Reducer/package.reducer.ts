import { createReducer, on } from '@ngrx/store';
import * as PackagesActions from '../Action/package.actions';

export interface PackageState {
    packages:any[];
    filters: PackagesActions.PackageFilters;
    loading: boolean;
    error: any;
    hasMore: boolean;  
  }
  
  const initialState: PackageState = {
    packages: [],
    filters: { destination: '', price: '', type: '', duration: '' },
    loading: false,
    error: null,
    hasMore: true  
  };
  
export const packagesReducer = createReducer(
  initialState,
  on(PackagesActions.loadPackages, state => ({
    ...state,
    loading: true, 
    error: null
  })),

  on(PackagesActions.loadPackagesSuccess, (state, { packages,page }) => ({
    ...state,
    packages: page === 1 
    ? packages                      
    : [...state.packages, ...packages],  
      loading: false,
  hasMore: packages.length > 0 
  })),
  on(PackagesActions.loadMorePackagesSuccess, (state, { packages }) => ({
    ...state,
    packages: [...state.packages, ...packages], 
    hasMore: packages.length > 0 

  })),

  on(PackagesActions.loadPackagesFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error:error.message|| 'something went wrong',
    
  })),
  on(PackagesActions.updateFilters, (state, { filters }) => ({
    ...state,
    filters, 
  }))
);
