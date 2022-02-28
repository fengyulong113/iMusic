import { fromJS } from 'immutable';

export const CHANGE_BANNER = 'recommend/CHANGE_BANNER';

export const CHANGE_RECOMMEND_LIST = 'recommend/RECOMMEND_LIST';

export const CHANGE_ENTER_LOADING = 'recommend/CHANGE_ENTER_LOADING';

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data);
    case CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    default:
      return state;
  }
}