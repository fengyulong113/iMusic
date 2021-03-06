import React from "react";
import { Route, Redirect, Switch, NavLink } from 'react-router-dom';
import Rank from "../Rank";
import Singers from "../Singers";
import Recommend from "../Recommend";
import { Top, Tab, TabItem } from './style';

import Player from "../Player";
import Search from '../Search/index';

function Home(props) {
  return (
    <>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">iMusic</span>
        <span className="iconfont search" onClick={() => props.history.push('/search')}>&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to='/recommend' activeClassName="selected"><TabItem><span>推荐</span></TabItem></NavLink>
        <NavLink to='/singers' activeClassName="selected"><TabItem><span>歌手</span></TabItem></NavLink>
        <NavLink to='/rank' activeClassName="selected"><TabItem><span>排行榜</span></TabItem></NavLink>
      </Tab>
      <Switch>
        <Route path='/rank' component={Rank}></Route>
        <Route path='/recommend' component={Recommend}></Route>
        <Route path='/singers' component={Singers}></Route>
        <Route path='/search' component={Search}></Route>
        <Redirect to={'/recommend'}></Redirect>
      </Switch>
      <Player></Player>
    </>
  )
}
export default Home