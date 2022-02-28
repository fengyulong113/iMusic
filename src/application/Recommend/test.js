// import { useSelector, useDispatch } from 'react-redux'



// const Recommend = memo((props) => {
//   const bannerList = useSelector((state) => {
//     return state.getIn(['recommend', 'bannerList'])
//   })
//   const recommendList = useSelector((state) =>
//     state.getIn(['recommend', 'recommendList']))

//   const bannerListJS = bannerList ? bannerList.toJS() : []
//   const recommendListJS = recommendList ? recommendList.toJS() : []
//   const dispatch = useDispatch()
  
//   useEffect(() => {
//     dispatch(actionTypes.getBannerList())
//     dispatch(actionTypes.getRecommendList())
//   }, [])
// })

// export default Recommend