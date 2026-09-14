
function initResearchMap(config){
  const map = L.map(config.id, {scrollWheelZoom:false, zoomControl:true}).setView(config.center, config.zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const pts = [];
  config.nodes.forEach((n,i)=>{
    const m = L.circleMarker([n.lat,n.lng],{
      radius:9,weight:3,color:"#111417",fillColor:"#f2efe7",fillOpacity:1
    }).addTo(map);
    m.bindPopup(`<b>${String(i+1).padStart(2,"0")} — ${n.title}</b><br>${n.stage}<br><a href="${n.href}">Explore node →</a>`);
    pts.push([n.lat,n.lng]);
  });
  if(config.route && pts.length>1){
    L.polyline(pts,{color:"#c8704f",weight:3,dashArray:"8 10",opacity:.9}).addTo(map);
  }
  if(config.fit && pts.length>1) map.fitBounds(pts,{padding:[45,45]});
}
