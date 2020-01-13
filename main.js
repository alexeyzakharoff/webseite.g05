import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Stamen from 'ol/source/Stamen';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import * as olProj from 'ol/proj';
import {toLonLat} from 'ol/proj';
import {Icon, Style} from 'ol/style';
import Overlay from 'ol/Overlay';
import sync from 'ol-hashed';
import XYZ from 'ol/source/XYZ';

const map = new Map({
  target: 'map',
  view: new View({
    center: olProj.fromLonLat([15.52, 48.18]),
    zoom: 13
  })
});
map.addLayer(new TileLayer({
  source: new Stamen({
    layer: 'terrain'
  })
}));

sync(map);

var overlay = new Overlay({
  element: document.getElementById('popup-container'),
  positioning: 'bottom-center',
  offset: [0, -10],
  autoPan: true
});
map.addOverlay(overlay);
overlay.getElement().addEventListener('singleclick', function() {
  overlay.setPosition();
});

const gemaprima = new VectorLayer({
  source: new Vector({
    url: 'data/gemaprima.geojson',
    format: new GeoJSON()
  })
});
map.addLayer(gemaprima);
gemaprima.setZIndex(1);

const gruenraeume = new VectorLayer({
  source: new Vector({
    url: 'data/gruenraeume.geojson',
    format: new GeoJSON()
  })
});
map.addLayer(gruenraeume);
gruenraeume.setZIndex(2);

gruenraeume.setStyle(function(feature) {
  return new Style({
    fill: new Fill({
      color: 'rgba(58, 183, 38, 0.4'})
  })
});

const markers = new VectorLayer({
  source: new Vector({
    url: 'data/markers.geojson',
    format: new GeoJSON()
  })
});
map.addLayer(markers);
markers.setZIndex(3);

markers.setStyle(new Style({
  image: new Icon({
    anchor: [0.5, 0.5],
    scale: 0.07,
    //anchorXUnits: 'fraction',
    //anchorYUnits: 'pixels',
    src: 'data/baum.png'
  })
}));

const feedback = new VectorLayer({
  source: new Vector({
    url: 'https://student.ifip.tuwien.ac.at/geoweb/2019/g05/postgis_geojson.php',
    format: new GeoJSON()
  })
});
map.addLayer(feedback);
feedback.setZIndex(4);

map.on('singleclick', function(e) {
  let markup = '';
  map.forEachFeatureAtPixel(e.pixel, function(feature) {
    const properties = feature.getProperties();
    markup += markup + '<hr><table>';
    for (const property in properties) {
      if (property != 'geometry') {
        markup += '<tr><th>' + property + '</th><td>' + properties[property] + '</td></tr>';
      }
    }
    markup += '</table>';
  }, {
    layerFilter: (l) => l === feedback
  });
  if (markup) {
    //document.getElementById('popup-content').innerHTML = markup;
    document.getElementById('popup-content').innerHTML = 'aaaa';
    overlay.setPosition(e.coordinate);
    console.log (e.coordinate);
  } else {
    overlay.setPosition();
    const pos = toLonLat(e.coordinate);
    window.location.href =
'https://student.ifip.tuwien.ac.at/geoweb/2019/g05/feedback_gemaprima.php?pos=' +
pos.join(' ');
  }
});

/* feedback.setStyle(function(feature) {
  return new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: 'rgba(232, 12, 12, 1)'
      }),
      stroke: new Stroke({
        color: 'rgba(127, 127, 127, 1)',
        width: 1
      })
    })
  });
}); */

feedback.setStyle(new Style({
  image: new Icon({
    anchor: [0.5, 0.5],
    scale: 0.04,
    //anchorXUnits: 'fraction',
    //anchorYUnits: 'pixels',
    src: 'data/feedback.png'
  })
}));

function calculateStatistics() {
  const feedbacks = feedback.getSource().getFeatures();
  const gemeinden = gemaprima.getSource().getFeatures();
  if (feedbacks.length > 0 && gemeinden.length > 0) {
    for (let i = 0, ii = feedbacks.length; i < ii; ++i) {
      const feedback1 = feedbacks[i];
      for (let j = 0, jj = gemeinden.length; j < jj; ++j) {
        const gemeinde = gemeinden[j];
        let count = gemeinde.get('FEEDBACKS') || 0;
        const feedbackGeom = feedback1.getGeometry();
        if (feedbackGeom &&
    gemeinde.getGeometry().intersectsCoordinate(feedbackGeom.getCoordinates())) {
          ++count;
        }
        gemeinde.set('FEEDBACKS', count);
      }
    }
  }
}
gemaprima.getSource().once('change', calculateStatistics);
feedback.getSource().once('change', calculateStatistics);

gemaprima.setStyle(function(feature) {
  let fillColor;
  const feedbackCount = feature.get('FEEDBACKS');
  if (feedbackCount <= 1) {
    fillColor = 'rgba(240, 226, 211, 0.4';
  } else if (feedbackCount < 5) {
    fillColor = 'rgba(238, 176, 110, 0.7)';
  } else {
    fillColor = 'rgba(240, 145, 43, 0.7)';
  }
  return new Style({
    fill: new Fill({
      color: fillColor
    }),
    stroke: new Stroke({
      color: 'rgba(4, 4, 4, 1)',
      width: 1
    })
  });
});
