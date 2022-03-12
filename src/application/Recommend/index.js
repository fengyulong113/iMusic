import React, { useEffect, memo } from "react";
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import { useSelector, useDispatch } from "react-redux";
import { getBannerList, getRecommendList } from './store/actionCreators'
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading/index';
import { Content } from './style';
import { forceCheck } from 'react-lazyload';
import { Route } from 'react-router-dom';
import Album from "../Album";


const Recommend = memo((props) => {

  const bannerList = useSelector(state => state.getIn(['recommend', 'bannerList']));
  const recommendList = useSelector(state => state.getIn(['recommend', 'recommendList']));
  const enterLoading = useSelector(state => state.getIn(['recommend', 'enterLoading']));
  const songsCount = useSelector(state => state.getIn(['player', 'playList']).size);

  const dispatch = useDispatch()

  useEffect(() => {
    if (!bannerList.size) {
      dispatch(getBannerList())
    }
    if (!recommendList.size) {
      dispatch(getRecommendList())
    }
    //eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content play={songsCount}>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading></Loading> : null}
      <Route path='/recommend/:id' component={Album}></Route>
    </Content>
  );
});

export default Recommend