
//*******************************************
// collection filters
//*******************************************

module.exports = {

  semantic: doc => doc.type === "semantic",
  
  groups: doc => doc.type === "group",
  
  taxonomy : doc => doc.type === "semantic" && doc.tag && doc.tag.indexOf("taxonomy")!=-1,
  
  safe: doc => doc.type === "safe",
  
  unsafe: doc => doc.type === "unsafe",
  
  idempotent: doc => doc.type === "idempotent",
  
  remove: doc => doc.type === "idempotent" && doc.tag && doc.tag.indexOf("delete")!=-1,
  
  update: doc => doc.type === "idempotent" && doc.tag && doc.tag.indexOf("update")!=-1,
  
  metadata_id: doc => doc.type ==="metadata" && doc.name && doc.name === ("id"),

  metadata_title: doc => doc.type ==="metadata" && doc.name && doc.name === ("title"),

  metadata_root: doc => doc.type ==="metadata" && doc.name && doc.name === ("root"),

  metadata_name: doc => doc.type ==="metadata" && doc.name && doc.name === ("name"),
}


