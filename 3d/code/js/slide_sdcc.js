define([
  "esri/config",

  "esri/Camera",
  "esri/SpatialReference",

  "widgets/LayerWidget/LayerWidget",

  "esri/layers/GroupLayer",
  "esri/layers/SceneServiceLayer",

  "esri/geometry/Point",

], function(
  esriConfig,
  Camera, SpatialReference,
  LayerWidget, 
  GroupLayer, SceneLayer,
  Point
) {
  esriConfig.defaults.io.corsEnabledServers.push("genesis.esri.com");

  return {
    setupLayers: function(map) {
      var sd = new SceneLayer({
        url: '//genesis.esri.com/arcgis/rest/services/Hosted/SanDiegoBlds_NoSDCC/SceneServer/layers/0',
        title: 'Buildings'
      });
      var conventionCenter = new GroupLayer({
        visibilityMode: 'exclusive',
        title: "Convention center",
        layers: [
          new GroupLayer({
            title: 'Interior',
            listMode: 'hide-children',
            visible: false,
            layers: [
              new SceneLayer({
                url: '//genesis.esri.com/arcgis/rest/services/Hosted/SDCC_-_Ground_Floor/SceneServer/layers/0',
                title: '1st floor'
              }),
              new SceneLayer({
                url: '//genesis.esri.com/arcgis/rest/services/Hosted/SDCC_-_Upper_Floor/SceneServer/layers/0',
                title: '2nd floor'
              }),
              new SceneLayer({
                url: '//genesis.esri.com/arcgis/rest/services/Hosted/SDCC_-_Mezzanine/SceneServer/layers/0',
                title: 'Mezzanine'
              })
            ]
          }),
          new SceneLayer({
            url: '//genesis.esri.com/arcgis/rest/services/Hosted/SD_Convention_Center/SceneServer/layers/0',
            title: 'Exterior',
            visible: true,
          }),
        ]
      });
      
      map.add(conventionCenter);
      map.add(sd);
    },
    setup: function(first, map, codemirror) {
      document.querySelectorAll(".title")[1].innerHTML = "SceneLayer";
      
      map.set('basemap', 'satellite');
      var camera = new Camera({
        position: new Point({
          spatialReference: new SpatialReference({
            wkid: 102100
          }),
          x: -13043535,
          y: 3855869,
          z: 490
        }),
        heading: 68,
        tilt: 66
      });
      if (first) {
        map.view.set('camera', camera);
      }
      else {
        map.view.animateTo(camera);
      }
      codemirror.setValue(document.getElementById('code_slide1').textContent);

      var layerWidget;
      if (!this.layerWidget){
         this.layerWidget = layerWidget = new LayerWidget({
          map: map 
         }, 'layersWidgetDiv');
      }
      else {
        layerWidget = this.layerWidget;
        this.layerWidget.domNode.style.display = 'block';
      }

      return {
        destroy: function() {
          layerWidget.domNode.style.display = 'none';
          codemirror.setValue('');
        }
      };
    }
  };

});