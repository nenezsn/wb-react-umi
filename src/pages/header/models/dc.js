
export default {
  state: {
    a:1,
    b:2
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location=>{
      })
    },
  },
  reducers: {
    update(state,action) {
      return {
        ...state,
        ...action.payload
      }
    },
  },
  effects: {
    *fetch({ type, payload }, { put, call, select }) {
    },
  },
}
