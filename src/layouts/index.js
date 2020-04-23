import styles from './index.less';
import { connect } from 'dva'

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <div>1111</div>
      {props.children}
    </div>
  );
}

export default connect()(BasicLayout);
