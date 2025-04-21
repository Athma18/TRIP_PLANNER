import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PackageState } from '../Reducer/package.reducer';

export const selectPackageState = createFeatureSelector<PackageState>('package');

export const selectPackages = createSelector(
  selectPackageState,
  (state: PackageState) => state.packages
);

export const selectIsLoading = createSelector(
  selectPackageState,
  (state: PackageState) => state.loading
);
export const selectError = createSelector(
    selectPackageState,
    (state: PackageState) => state.error
  );