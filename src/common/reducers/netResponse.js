// import { handleActions } from 'redux-actions'
//
// const setRes = {
//     res: 'SHOW_RES',
// }
//
// export const setVisibility = handleActions({
//     'SET_RES'(state, action) {
//         return { ...state, ...action.payload }
//     }
// }, setRes)
//
//
// export const musicList = handleActions({
//     'request music list'(state, action) {
//         return { ...state, loading: true }
//     },
//     'receive music list'(state, action) {
//         const { res } = action.payload
//         return { data: res.song_list, loading: false }
//     }
// }, {})