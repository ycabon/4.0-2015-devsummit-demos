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
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAYAAAAd+o5JAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADKGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwMTQgNzkuMTU2Nzk3LCAyMDE0LzA4LzIwLTA5OjUzOjAyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NTk3M0JBQjZDNDkxMUU0QTM3RThDNzNCRDk3QTcyQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NTk3M0JBQzZDNDkxMUU0QTM3RThDNzNCRDk3QTcyQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU1MjgwM0FDNkM0OTExRTRBMzdFOEM3M0JEOTdBNzJBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU1OTczQkFBNkM0OTExRTRBMzdFOEM3M0JEOTdBNzJBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hw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",
            width: 48,
            height: 48,
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