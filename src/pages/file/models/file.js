
export default {
  state: {
    lists:[{id:1,info:'新闻1'},{id:2,info:'新闻2'}]
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
