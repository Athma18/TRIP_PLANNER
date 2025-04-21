import { createAction, props } from '@ngrx/store';
import { Package } from '../../Model/package.model';

export interface PackageFilters {
    destination: string;
    price: string;
    type: string;
    duration: string;
  }

  
export const updateFilters = createAction(
    '[Package] Update Filters',
    props<{ filters: PackageFilters }>()
  );
  
  
export const loadPackages = createAction(
  '[Packages] Load Packages',
  props<{ page: number; limit: number ;filters:PackageFilters}>()
);

export const loadPackagesSuccess = createAction(
  '[Packages] Load Packages Success',
  props<{ packages: any[] ,page:number}>()
);

export const loadPackagesFailure = createAction(
  '[Packages] Load Packages Failure',
  props<{ error: any }>()
);

export const loadMorePackages = createAction(
    '[Package] Load More Packages',
    props<{ page: number; limit: number; filters: any }>()
  );

  export const loadMorePackagesSuccess = createAction(
    '[Package] Load More Packages Success',
    props<{ packages: Package[] ,page:number}>()
  );

  export const loadMorePackagesFailure = createAction(
    '[Package] Load More Packages Failure',
    props<{ error: any }>()
  );
