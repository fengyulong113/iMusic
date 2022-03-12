import React, { useState, useEffect, memo } from 'react';
import { categoryTypes, alphaTypes } from '../../api/config';
import {
  NavContainer,
  ListContainer,
  List,
  ListItem,
} from "./style";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators';
import LazyLoad, { forceCheck } from 'react-lazyload';
import Horizen from '../../baseUI/horizen-item';
import Scroll from './../../baseUI/scroll/index';
import Loading from '../../baseUI/loading';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import Singer from '../Singer/index'


const Singers = memo((props) => {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  const singerList = useSelector(state => state.getIn(['singers', 'singerList']));
  const enterLoading = useSelector(state => state.getIn(['singers', 'enterLoading']));
  const pullUpLoading = useSelector(state => state.getIn(['singers', 'pullUpLoading']));
  const pullDownLoading = useSelector(state => state.getIn(['singers', 'pullDownLoading']));
  const pageCount = useSelector(state => state.getIn(['singers', 'pageCount']));
  const songsCount = useSelector(state => state.getIn(['singers', 'songsCount']));

  const dispatch = useDispatch();

  const getHotSingerDispatch = () => {
    dispatch(getHotSingerList())
  };

  const updateDispatch = (category, alpha) => {
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getSingerList(category, alpha));
  }

  // 滑到最底部刷新部分的处理
  const pullUpRefreshDispatch = (category, alpha, hot, count) => {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(count + 1));
    if (hot) {
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerList(category, alpha));
    }
  }

  //顶部下拉刷新
  const pullDownRefreshDispatch = (category, alpha) => {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));
    if (category === '' && alpha === '') {
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList(category, alpha));
    }
  }

  useEffect(() => {
    getHotSingerDispatch();
    // eslint-disable-next-line
  }, []);

  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`);
  }

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(category, val);
  };

  let handleUpdateCatetory = (val) => {
    setCategory(val);
    updateDispatch(val, alpha);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    return (
      <List>
        {
          list.map((item, index) => {
            return (
              <ListItem key={item.accountId + "" + index} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  return (
    <div>
      <NavContainer>
        <Horizen list={categoryTypes} title={"分类(默认热门):"} handleClick={(val) => handleUpdateCatetory(val)} oldVal={category}></Horizen>
        <Horizen list={alphaTypes} title={"首字母:"} handleClick={val => handleUpdateAlpha(val)} oldVal={alpha}></Horizen>
      </NavContainer>
      <ListContainer play={songsCount}>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </ListContainer>
      <Route path="/singers/:id" component={Singer}></Route>
    </div>
  )
});

// const mapStateToProps = (state) => ({
//   singerList: state.getIn(['singers', 'singerList']),
//   enterLoading: state.getIn(['singers', 'enterLoading']),
//   pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
//   pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
//   pageCount: state.getIn(['singers', 'pageCount']),
//   songsCount: state.getIn(['player', 'playList']).size
// });
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getHotSingerDispatch() {
//       dispatch(getHotSingerList());
//     },
//     updateDispatch(category, alpha) {
//       dispatch(changePageCount(0));
//       dispatch(changeEnterLoading(true));
//       dispatch(getSingerList(category, alpha));
//     },
//     // 滑到最底部刷新部分的处理
//     pullUpRefreshDispatch(category, alpha, hot, count) {
//       dispatch(changePullUpLoading(true));
//       dispatch(changePageCount(count + 1));
//       if (hot) {
//         dispatch(refreshMoreHotSingerList());
//       } else {
//         dispatch(refreshMoreSingerList(category, alpha));
//       }
//     },
//     //顶部下拉刷新
//     pullDownRefreshDispatch(category, alpha) {
//       dispatch(changePullDownLoading(true));
//       dispatch(changePageCount(0));
//       if (category === '' && alpha === '') {
//         dispatch(getHotSingerList());
//       } else {
//         dispatch(getSingerList(category, alpha));
//       }
//     }
//   }
// };

export default Singers