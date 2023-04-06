const PDFMerger = require('pdf-merger-js');

const merge=async (p1,p2) => {
    var merger = new PDFMerger();
    await merger.add(p1);  
    await merger.add(p2); 
    let t=new Date().getTime() 
    await merger.save(`public/${t}.pdf`); 
    return t;
  }

module.exports={merge};