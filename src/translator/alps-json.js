// ****************************************************
// to ALPS JSON
// ****************************************************

module.exports = (doc, options) => {
  var rtn = ""; 
  try {
    rtn = JSON.stringify(doc, null, 2);
  }
  catch(err) {
    console.log(`ERROR: ${err}`);
  }
  return rtn
}