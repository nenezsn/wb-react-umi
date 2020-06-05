import React from 'react';
function Container({ location,children }) {
  if(location.pathname.split('/')[1] == 'file'){
    return children
  }
  return <div>
    <h1>首页</h1>
    <div>{children}</div>
  </div>
}
export default Container
