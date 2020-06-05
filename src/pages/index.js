
import Link from 'umi/link';
import styles from './index.less';
import { Button } from 'antd'
import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const foo = useSelector(state=>state.foo)
  const dispatch = useDispatch()

  const ADD= function(){
    dispatch({type:"foo/ADD"})
  }
  const SUB= function(){
    dispatch({type:"foo/SUB"})
  }

  useEffect(()=>{
    dispatch({type:"foo/fetchUser"})
  },[dispatch])

  return <div className={styles.box}>
    <h3>{foo.name}-{foo.age}-{foo.count}</h3>
    <Button onClick={ADD}>加1</Button>
    <Button onClick={SUB}>减1</Button>
    <Button><Link to='/file/1'>文章1</Link></Button>
    <Button><Link to='/file/2'>文章2</Link></Button>
  </div>
}

export default App

