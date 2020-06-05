import React, { Component } from 'react';
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import router from 'umi/router'

function Fileinfo({ match }) {
  const fileState = useSelector(state => state.file)
  function renderContent(id) {
    const result = fileState.lists.find(item => item.id == id) || {}
    return <div>{result.info}</div>
  }
  return (
    <div>
      <Button onClick={()=>{router.goBack()}}>返回</Button>
      {renderContent(match.params.id)}
    </div>
  );
}

export default Fileinfo;
