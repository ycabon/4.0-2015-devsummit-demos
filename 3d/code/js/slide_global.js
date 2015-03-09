define([
  "dojo/on",

  "esri/Camera",
  "esri/Collection",
  "esri/SpatialReference",

  "esri/layers/ArcGISTiledMapServiceLayer",
  "esri/layers/GraphicsLayer",

  "esri/geometry/Point",

  "esri/tasks/FeatureSet",

  "esri/renderers/SimpleRenderer",
  "esri/symbols/PictureMarkerSymbol",

  "local/barsFeatureCollection"
], function(
  on,
  Camera, Collection, SpatialReference,
  TiledLayer, GraphicsLayer,
  Point,
  FeatureSet,
  SimpleRenderer, PictureMarkerSymbol,
  barsFeatureCollection
) {

  return {
    setupLayers: function(map) {
      document.getElementById("animate").style.display = 'none';
      var featureSet = new FeatureSet(barsFeatureCollection.featureSet);
      this.layer = new GraphicsLayer({
        graphicsCollection: new Collection(featureSet.features),
        renderer: new SimpleRenderer({
          symbol: new PictureMarkerSymbol({
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB5CAYAAADyOOV3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADKGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwMTQgNzkuMTU2Nzk3LCAyMDE0LzA4LzIwLTA5OjUzOjAyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NkY2NzhFMzZDMzQxMUU0QTM3RThDNzNCRDk3QTcyQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NkY2NzhFNDZDMzQxMUU0QTM3RThDNzNCRDk3QTcyQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc2RjY3OEUxNkMzNDExRTRBMzdFOEM3M0JEOTdBNzJBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc2RjY3OEUyNkMzNDExRTRBMzdFOEM3M0JEOTdBNzJBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hw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",
            width: 32,
            height: 32,
            yoffset: 16
          })
        }),
        listMode: 'hide',
        visible: false
      });
      map.add(this.layer);

    },
    setup: function(first, map, codemirror) {
      document.querySelectorAll(".title")[1].innerHTML = "Animation";
      
      // map.set('basemap', 'dark-gray');
      var layer = this.layer;
      document.getElementById("animate").style.display = 'block';
      var handle = on(document.getElementById("animate"), "click", function() {
        var options = {
          delay: 3000
        };
        map.view.animateTo({
          heading: 332
        }).then(function() {
          return map.view.animateTo(new Camera({
              "position": {
                "x": -13040333.75262136,
                "y": 3854432.7355529917,
                "spatialReference": {
                  "wkid": 102100,
                  "latestWkid": 3857
                },
                "z": 1540.5648343944922
              },
              "heading": 332.79965998825276,
              "tilt": 64.63795289629758,
              "fov": 55
            }), options);
        }).then(function() {
          // map.set('basemap', 'dark-gray');
          layer.set({
            'visible': true
          });
        });
      });

      codemirror.setValue(document.getElementById('code_slide2').textContent);

      return {
        destroy: function() {
          document.getElementById("animate").style.display = 'none';
          handle.remove();
          handle = null;
          map.view.navigation._interpolation = new map.view.navigation.constructor.DEFAULT_INTERPOLATION()
          layer.set('visible', false);
        }
      }
    }
  };

});