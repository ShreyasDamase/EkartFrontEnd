import {call, put, takeEvery} from 'redux-saga/effects';
import {setData, setError, setLoading} from './slice';
import {fetchCategoriesData} from './api';
import {GET_CATEGORIES} from './constants';

function* fetchCategoriesApiData(): any {
  console.log('fetchCategoriesApiData saga called'); // <-- Add this
  try {
    yield put(setLoading());

    console.log("here")
    const data = yield call(fetchCategoriesData);
    console.log("now",data)
    yield put(setData(data));
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

function* categoriesSaga() {
  yield takeEvery(GET_CATEGORIES, fetchCategoriesApiData);
}
export default categoriesSaga;
