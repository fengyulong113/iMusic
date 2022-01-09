import React, { useEffect } from "react";
import Slider from '../../components/slider';
import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreators'
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll/index';
import { Content } from './style';

function Recommend(props) {

    const { bannerList, recommendList } = props;

    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;


    useEffect(() => {
        getBannerDataDispatch();
        getRecommendListDataDispatch();
        //eslint-disable-next-line
    }, []);

    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];

    return (
        <Content>
            <Scroll>
                <div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <RecommendList recommendList={recommendListJS}></RecommendList>
                </div>
            </Scroll>
        </Content>
    );
};

const mapStateToProps = (state) => ({
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),

});

const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionTypes.getBannerList());
        },
        getRecommendListDataDispatch() {
            dispatch(actionTypes.getRecommendList());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));