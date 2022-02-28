import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';
import Loading from '../loading';
import { debounce } from "../../api/utils";
import LoadingV2 from '../loading-v2';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {

  //better-scroll 实例对象
  const [bScroll, setBScroll] = useState();

  //current 指向初始化 bs 实例需要的 DOM 元素 
  const scrollContaninerRef = useRef();

  const { direction, click, refresh, bounceTop, bounceBottom } = props;

  const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props;

  //上拉刷新函数
  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300)
  }, [pullUp]);


  //下拉刷新函数
  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300)
  }, [pullDown]);


  //创建 better-scroll
  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
    // eslint-disable-next-line
  }, []);


  //给实例绑定 scroll 事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);


  //进行上拉到底的判断，调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    }
  }, [pullUpDebounce, pullUp, bScroll]);


  //进行下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    }
  }, [pullDownDebounce, pullDown, bScroll]);


  //每次重新渲染都要刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
  const PullDowndisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };
  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}><Loading></Loading></PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}><LoadingV2></LoadingV2></PullDownLoading>
    </ScrollContainer>
  );
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),// 滚动的方向
  refresh: PropTypes.bool,// 是否刷新
  onScroll: PropTypes.func,// 滑动触发的回调函数
  pullUp: PropTypes.func,// 上拉加载逻辑
  pullDown: PropTypes.func,// 下拉加载逻辑
  pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向上吸顶
};

export default Scroll;
