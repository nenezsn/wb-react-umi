
import styles from './header.css';
import { connect } from 'dva'
function DB() {
  return (
    <div className={styles.normal}>
      <h1>Page header</h1>
    </div>
  );
}
const mapStateToProps=function(state){
  console.log('state',state)
  return {}
}
export default connect(mapStateToProps)(DB)
