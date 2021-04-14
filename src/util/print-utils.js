
const rxHash = /#/g;
const rxQ = /\?\?/g;

const rString = id => {
  var rtn = "";
  if(id && id.indexOf("id")!=-1) {
    rtn = Math.random().toString(9).substring(2, 4) + Math.random().toString(9).substring(2, 4);
  }
  else {
    rtn = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  return rtn;
}


module.exports = { 
  rString: rString,
  rxHash: rxHash,
  rxQ: rxQ,
}