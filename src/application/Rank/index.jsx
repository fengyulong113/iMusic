import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRankList } from './store/index';
import { filterIndex } from '../../api/utils';
import Loading from '../../baseUI/loading';
import Scroll from '../../baseUI/scroll/index';
import {
  List,
  ListItem,
  SongList,
  Container
} from './style';
import { EnterLoading } from '../Singers/style';
import { Route } from 'react-router-dom';
import Album from '../Album/index'

const Rank = memo((props) => {

  const list = useSelector(state => state.getIn(['rank', 'rankList']));
  const loading = useSelector(state => state.getIn(['rank', 'loading']));
  const songsCount = useSelector(state => state.getIn(['player', 'playList']).size);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!rankList.length) {
      dispatch(getRankList())
    }
    // eslint-disable-next-line
  }, []);

  let rankList = list ? list.toJS() : [];
  let globalStarIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStarIndex);
  let globalList = rankList.slice(globalStarIndex)

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`)
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item, index) => {
            return (
              <ListItem key={item.coverImgId + "" + index} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  let displayStyle = loading ? { "display": "none" } : { "display": "" };

  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className='offical' style={displayStyle}>官方榜</h1>
          {renderRankList(officialList)}
          <h1 className='global' style={displayStyle}>全球榜</h1>
          {renderRankList(globalList, true)}
          {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
        </div>
      </Scroll>
      <Route path='/rank/:id' component={Album}></Route>
    </Container>
  )
});

export default Rank;