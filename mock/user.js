export default {
  // 'POST /api/users': ['a', 'b'],
  'POST /api/users': (req,res)=>{
    console.log('====',req.body)
    res.json(['a', 'b'])
  }
};
