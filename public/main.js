var map = L.map('map').setView([40.652308, -73.9917204], 15)



L.mapbox.accessToken = 'pk.eyJ1IjoiYms3NDEiLCJhIjoiZFNVcTNvdyJ9.h8G4i4ib7PicRCiejvZW6g';

var mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/bk741/cj6gkj29d3iuu2st6zjtpywte/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYms3NDEiLCJhIjoiZFNVcTNvdyJ9.h8G4i4ib7PicRCiejvZW6g',
                {
                minZoom:12})
                .addTo(map);

//building design

function buildingStyle(feature) {
    return {
        fillColor: '#962020',
        weight: 1,
        opacity: .5,
        color:'#7c6368',
        fillOpacity: 1
    };
}


function buildingPop(feature, layer){
  layer.bindPopup(feature.properties['GlobalID']);
  console.log("This was edited by "+feature.properties['Editor']);
}


// //tree design

function treeDesign (feature, latlng) {
    return L.circleMarker(latlng, {
    // Stroke properties
    color: '#006500',
    opacity: 1,
    fillOpacity: .5,
    radius: 5,
    weight: 2,
  })
}

//tree layer Popup
function treePop(feature, layer){
  layer.bindPopup("The description says that this is a " +feature.properties['Desciption']);

}


//monument design

function monumentDesign (feature, latlng) {
    return L.circleMarker(latlng, {
    // Stroke properties
    color: '#0648a3',
    opacity: 1,
    fillOpacity: .5,
    radius: 5,
    weight: 2,
  })
}

function monumentPopup(feature, layer){
  layer.bindPopup("The tree is " +feature.properties['PlantCondi']);

}


var buildingLayer = new L.GeoJSON.AJAX("buildings.geojson", {style: buildingStyle, onEachFeature:buildingPop});

var trees = new L.GeoJSON.AJAX("WhirlwindTrees.geojson",
    {pointToLayer: treeDesign, onEachFeature: treePop
    });

var monuments = new L.GeoJSON.AJAX("FeaturedMonuments.geojson",
    {pointToLayer: monumentDesign, onEachFeature: monumentPopup
    });


// trees.addTo(map);
// monuments.addTo(map);

//Menu interactivity

// $("#layers").click(function(){
//


$("#buildings").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(buildingLayer)) {
        $(this).removeClass('selected');
        $(this).css({'background-color':'#B1ACBD'})
        map.removeLayer(buildingLayer);
    } else {
        map.addLayer(buildingLayer);
        $(this).addClass('selected');
        $(this).css({'background-color':'#962020'});
      }
});

$("#trees").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(trees)) {
        $(this).removeClass('selected');
        $(this).css({'background-color':'#B1ACBD'})
        map.removeLayer(trees);
    } else {
        map.addLayer(trees);
        $(this).addClass('selected');
        $(this).css({'background-color':'#006500'});
      }
});

$("#monuments").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(monuments)) {
        $(this).removeClass('selected');
        $(this).css({'background-color':'#B1ACBD'})
        map.removeLayer(monuments);
    } else {
        map.addLayer(monuments);
        $(this).addClass('selected');
        $(this).css({'background-color':'#0648a3'});
      }
});








$(document).ready(function() {
  console.log('js working');
});
