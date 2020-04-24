import Link from 'umi/link';
import styles from './index.css';
import { connect } from 'dva'
import Com from '@/components'
import { Button } from 'antd'

function Index({foo,dispatch}) {
    function update(){
      dispatch({
        type:'foo/fetch',
        payload:{
          a:2
        }
      })
    }
    console.log('process.env.TEST',process.env.TEST)
  return (
    <div className={styles.normal}>
      <Com/>
      <h1 onClick={update}>Page index</h1>
     <Link to="/user">go to /users</Link>
     <Button type='primary'>你好</Button>
    </div>
  );
}
const mapStateToProps = state =>{
  return {
    foo:state.foo
  }
}
export default connect(mapStateToProps)(Index)
