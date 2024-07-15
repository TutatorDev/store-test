import { computed, inject } from '@angular/core';
import { withState, signalStore, withComputed, withMethods, patchState } from '@ngrx/signals';
import { StoreService } from './store.service';

type CatalogsState = {
  catalogs: object | any;
  lang: string;
  isLoading: boolean;
};

const initialState: CatalogsState = {
  catalogs: {},
  lang: 'en',
  isLoading: false,
};

export const CatalogsStore = signalStore(
  withState(initialState),
  withComputed(({ catalogs }) => ({
    catalogsByName: computed(( ) => {
      console.log('CATALOGS BY NAME')
      return catalogs()['TEST'];
    })
  })),
  withMethods(
    (store, storeService = inject(StoreService)) => ({
      async loadAll() {
        patchState(store, { isLoading: true })
        const data = await storeService.getData();

        patchState(store, {
          catalogs: data,
          isLoading: false,
        })
      },

      async loadByCatalogCodes(codes: string[], lang = 'en') {
        patchState(store, { isLoading: true });
        const data = await storeService.getDataByCodes(codes, lang);
        patchState(store, {
          catalogs: { ...store.catalogs(), ...data },
          isLoading: false,
        });
      },

      async changeLanguage(lang: string) {
        patchState(store, { lang, isLoading: true });

        const data = await storeService.getDataByCodes(Object.keys(store.catalogs()), lang);
        patchState(store, {
          catalogs: data,
          isLoading: false,
        });
      }
    })
  ),
);