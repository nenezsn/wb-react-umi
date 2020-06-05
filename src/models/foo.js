
import { getuserInfo } from '../services'
export default {
  state: {
    name:'',
    age:'',
    count: 0
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      })
    },
  },
  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    ADD(state, action) {
      return {
        ...state,
        count: state.count + 1
      }
    },
    SUB(state, action) {
      return {
        ...state,
        count: state.count - 1
      }
    }
  },
  effects: {
    *fetchUser({ type, payload }, { put, call, select }) {
      const data = yield call(getuserInfo)
      yield put({
        type:'update',
        payload:{
         ...data
        }
      })
    },
  },
}
