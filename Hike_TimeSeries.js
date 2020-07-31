<html>
<head>
  <meta charset="utf-8" />
  <meta
          name="viewport"
          content="initial-scale=1,maximum-scale=1,user-scalable=no"
  />
  <title>
    Filter features with TimeSlider | Sample | ArcGIS API for JavaScript 4.16
  </title>

  <style>
    html,
    body,
    #viewDiv {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }

    #timeSlider {
      position: absolute;
      left: 100px;
      right: 100px;
      bottom: 30px;
    }

    #infoDiv {
      height: 200px;
      padding: 10px;
      width: 280px;
    }

    #infoDiv span {
      color: #f9c653;
      font-size: 12pt;
      font-weight: bolder;
    }
  </style>

  <link
          rel="stylesheet"
          href="https://js.arcgis.com/4.16/esri/themes/dark/main.css"
  />
  <script src="https://js.arcgis.com/4.16/"></script>
  <script>
    require([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/GeoJSONLayer",
      "esri/widgets/TimeSlider",
      "esri/widgets/Expand",
      "esri/widgets/Legend",
      "esri/Map",
      "esri/views/SceneView",
      "esri/widgets/Search",
      "esri/views/SceneView"

    ], function (Map, MapView, GeoJSONLayer, TimeSlider, Expand, Legend, SceneView, ElevationLayer) {
      let layerView;



      const layer = new GeoJSONLayer({
        url: "https://raw.githubusercontent.com/ThomasJames/Geojson_walker/master/walk.geojson",
        // set the CSVLayer's timeInfo based on the date field
        timeInfo: {
          startField: "time", // name of the date field
          interval: {
            // set time interval to one day
            unit: "hours",
            value: 3
          }
        },
        renderer: {
          type: "simple",
          field: "el",
          symbol: {
            type: "simple-marker",
            color: "orange",
            outline: null
          },
          visualVariables: [
            {
              type: "size",
              field: "el",
              stops: [
                {
                  value: 1,
                  size: "3px"
                },
                {
                  value: 2,
                  size: "5px"
                },
                {
                  value: 3,
                  size: "7px"
                }
              ]
            },
            {
              type: "color",
              field: "el",
              stops: [
                {
                  value: 100,
                  color: "#fffdd0",
                  label: "<2km"
                },
                {
                  value: 101,
                  color: "#fffdd0",
                  label: "3km"
                },
                {
                  value: 102,
                  color: "#fffdd0",
                  label: ">4km"
                },
                {
                  value: 103,
                  color: "#fffdd0",
                  label: "<2km"
                },
                {
                  value: 104,
                  color: "#fffdd0",
                  label: "3km"
                },
                {
                  value: 105,
                  color: "#fffdd0",
                  label: ">4km"
                },
                {
                  value: 106,
                  color: "#F8864D",
                  label: "<2km"
                },
                {
                  value: 107,
                  color: "#F8864D",
                  label: "3km"
                },
                {
                  value: 108,
                  color: "#F8864D",
                  label: ">4km"
                },
                {
                  value: 108,
                  color: "#F8864D",
                  label: "<2km"
                },
                {
                  value: 109,
                  color: "#F8864D",
                  label: "3km"
                },
                {
                  value: 110,
                  color: "#F8864D",
                  label: ">4km"
                },
                {
                  value: 111,
                  color: "#F8864D",
                  label: "<2km"
                },
                {
                  value: 112,
                  color: "#F8864D",
                  label: "3km"
                },
                {
                  value: 113,
                  color: "#F8864D",
                  label: ">4km"
                },
                {
                  value: 114,
                  color: "#F8864D",
                  label: "<2km"
                },
                {
                  value: 115,
                  color: "#F8864D",
                  label: "3km"
                },
                {
                  value: 116,
                  color: "#C53C06",
                  label: ">4km"
                },
                {
                  value: 117,
                  color: "#C53C06",
                  label: "<2km"
                },
                {
                  value: 118,
                  color: "#C53C06",
                  label: "3km"
                },
                {
                  value: 119,
                  color: "#C53C06",
                  label: ">4km"
                },
                {
                  value: 120,
                  color: "#C53C06",
                  label: "<2km"
                },
                {
                  value: 121,
                  color: "#C53C06",
                  label: "3km"
                }
              ]
            }
          ]
        },
          popupTemplate: {
            title: "{title}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "place",
                    label: "Location",
                    visible: true
                  },
                  {
                    fieldName: "mag",
                    label: "Magnitude",
                    visible: true
                  },
                  {
                    fieldName: "depth",
                    label: "Depth",
                    visible: true
                  }
                ]
              }
            ]
          }

      });

      const map = new Map({
        basemap: "satellite",
        ground: "world-elevation",
        layers: [layer]
      });


      var view = new MapView({
        map: map,
        scale: 123456789,
        container: "viewDiv",
        zoom: 17,
        center: [8.250732, 46.982330]
      });


      // create a new time slider widget
      // set other properties when the layer view is loaded
      // by default timeSlider.mode is "time-window" - shows
      // data falls within time range
      const timeSlider = new TimeSlider({
        container: "timeSlider",
        container: "timeSlider",
        mode: "time-window",
        view: view
      });
      view.ui.add(timeSlider, "manual");

      // wait till the layer view is loaded
      view.whenLayerView(layer).then(function (lv) {
        layerView = lv;

        // start time of the time slider - 5/25/2019
        const start = new Date(2020, 7, 25, 12, 0, 0);
        // set time slider's full extent to
        // 5/25/5019 - until end date of layer's fullTimeExtent
        timeSlider.fullTimeExtent = {
          start: start,
          end: layer.timeInfo.fullTimeExtent.end,
          playRate: 100,
          step: 10,
          stops: {
            interval: {
              value: 5,
              unit: "minutes"
            }
          }
        };
        console.log(timeSlider.fullTimeExtent.start, timeSlider.fullTimeExtent.end)
        timeSlider.setThumbMovingRate(2);
        timeSlider.setThumbMovingRate(2000);

        // We will be showing earthquakes with one day interval
        // when the app is loaded we will show earthquakes that
        // happened between 5/25 - 5/26.
        const end = new Date(2020, 7, 26, 0, 10, 0);
        // end of current time extent for time slider
        // showing earthquakes with one day interval
        end.setDate(end.getDate() + 1);

        // Values property is set so that timeslider
        // widget show the first day. We are setting
        // the thumbs positions.
        // var START = new Date(2020, 7, 20);
        // var END = new Date(2020, 7, 26);
        //
        // console.log(START, END)

        timeSlider.values = [start, end];
      });

      function diff_minutes(dt2, dt1)
      {
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
      }

      console.log("The start time is: ", layer.time)


      // watch for time slider timeExtent change
      timeSlider.watch("timeExtent", function () {
        // only show earthquakes happened up until the end of
        // timeSlider's current time extent.
        layer.definitionExpression =
                "time <= " + timeSlider.timeExtent.end.getTime();

        // now gray out earthquakes that happened before the time slider's current
        // timeExtent... leaving footprint of earthquakes that already happened
        layerView.effect = {
          filter: {
            timeExtent: timeSlider.timeExtent,
            geometry: view.extent
          },
          excludedEffect: "grayscale(20%) opacity(12%)"
        };
        // run statistics on earthquakes fall within the current time extent
        const statQuery = layerView.effect.filter.createQuery();
        statQuery.outStatistics = [
          magMax,
          magAvg,
          magMin,
          tremorCount,
          avgDepth
        ];

        layer
                .queryFeatures(statQuery)
                .then(function (result) {
                  let htmls = [];
                  statsDiv.innerHTML = "";
                  if (result.error) {
                    return result.error;
                  } else {
                    if (result.features.length >= 1) {
                      var attributes = result.features[0].attributes;
                      for (name in statsFields) {
                        if (attributes[name] && attributes[name] != null) {
                          const html =
                                  "<br/>" +
                                  statsFields[name] +
                                  ": <b><span> " +
                                  attributes[name].toFixed(2) +
                                  "</span></b>";
                          htmls.push(html);
                        }
                      }
                      var yearHtml =
                              "<span>" +
                              result.features[0].attributes["tremor_count"] +
                              "</span>  Hike took place on the:  " +
                              timeSlider.timeExtent.end.toLocaleDateString() +
                              ".<br/>";

                      if (htmls[0] == undefined) {
                        statsDiv.innerHTML = yearHtml;
                      } else {
                        statsDiv.innerHTML =
                                yearHtml + htmls[0] + htmls[1] + htmls[2] + htmls[3];
                      }
                    }
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
      });




      const avgDepth = {
        onStatisticField: "depth",
        outStatisticFieldName: "Average_depth",
        statisticType: "avg"
      };

      const magMax = {
        onStatisticField: "el",
        outStatisticFieldName: "Max_magnitude",
        statisticType: "max"
      };

      const magAvg = {
        onStatisticField: "el",
        outStatisticFieldName: "Average_magnitude",
        statisticType: "avg"
      };

      const magMin = {
        onStatisticField: "el",
        outStatisticFieldName: "Min_magnitude",
        statisticType: "min"
      };

      const tremorCount = {
        onStatisticField: "el",
        outStatisticFieldName: "tremor_count",
        statisticType: "count"
      };

      const statsFields = {
        Max_magnitude: "Maximum Heart Rate",
        Average_magnitude: "Average Heart Rate",
        Min_magnitude: "Min Heart Rate",
        Average_depth: "Elevation (m)"
      };

      // add a legend for the earthquakes layer
      const legendExpand = new Expand({
        collapsedIconClass: "esri-icon-collapse",
        expandIconClass: "esri-icon-expand",
        expandTooltip: "Legend",
        view: view,
        content: new Legend({
          view: view
        }),
        expanded: false
      });
      view.ui.add(legendExpand, "top-left");

      const statsDiv = document.getElementById("statsDiv");
      const infoDiv = document.getElementById("infoDiv");
      const infoDivExpand = new Expand({
        collapsedIconClass: "esri-icon-collapse",
        expandIconClass: "esri-icon-expand",
        expandTooltip: "Expand earthquakes info",
        view: view,
        content: infoDiv,
        expanded: true
      });
      view.ui.add(infoDivExpand, "top-right");

      console.log(queryElevation(map.position))

    });






    // MEASUREMENT TOOL.
    // https://developers.arcgis.com/javascript/3/sandbox/sandbox.html?sample=widget_measurement
  </script>
</head>

<body>
<div id="viewDiv"></div>
<div id="timeSlider"></div>
<div id="infoDiv" class="esri-widget">
  <div><b>Mount Pilatus Hike</b></div>
  <br />
  <div id="statsDiv" class="esri-widget"></div>
</div>
</body>
</html>
