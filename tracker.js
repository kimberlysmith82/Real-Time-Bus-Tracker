import { MapBox } from "../../components/map-box.js";
import { getBuses, run } from "../../components/helpers.js";

let busTrackerStructure = {
  title: "Bus Tracker",
  buttons: {
    "Load Access Tokens": function getMapBoxToken() {
      mapboxgl.accessToken = prompt(
        "Please provide an access token for MapBox GL."
      );
      busTrackerProperties.mbtaApiKey = prompt(
        "Please provide the access key for the MBTA Api. This key will only be stored on your machine. It will not be recorded or preserved in any way."
      );
      busTrackerProperties.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-71.091542, 42.358862],
        zoom: 12,
      });
    },
    "Start Bus Tracker": function startBusTracker() {
      run(
        busTrackerProperties.mbtaApiKey,
        busTrackerProperties.colors,
        busTrackerProperties.markers,
        busTrackerProperties.map
      );
      busTrackerProperties.interval.push(
        setInterval(
          run,
          15000,
          busTrackerProperties.mbtaApiKey,
          busTrackerProperties.colors,
          busTrackerProperties.markers,
          busTrackerProperties.map
        )
      );
    },
    "Stop Bus Tracker": function stopBusTracker() {
      clearInterval(busTrackerProperties.interval[0]);
      busTrackerProperties.interval.pop();
    },
  },
  classList: {
    map: ["bus-tracker"],
    header3: ["header3"],
    navigationBar: {
      navigationBar: ["navigation-bar"],
      buttons: {
        "Load Access Tokens": [
          "load-access-tokens-button",
          "btn",
          "btn-primary",
        ],
        "Start Bus Tracker": ["start-bus-tracker-button", "btn", "btn-success"],
        "Stop Bus Tracker": ["stop-bus-tracker-button", "btn", "btn-warning"],
      },
    },
    container: ["container"],
  },
  ids: {
    map: "bus-tracker",
    header3: "bus-tracker-header3",
    navigationBar: {
      navigationBar: "bus-tracker-navigation-bar",
      buttons: {
        "Load Access Tokens": "bus-tracker-load-access-tokens-button",
        Run: "bus-tracker-run-button",
        "Start Bus Tracker": ["bus-tracker-start-button-bus-tracker-button"],
        "Stop Bus Tracker": ["bus-tracker-stop-bus-tracker-button"],
      },
    },
    container: "map",
  },
};

let busTrackerProperties = {
  interval: [],
  mbtaApiKey: "",
  markers: [],
  colors: [
    "",
    "#000000",
    "#5B618A",
    "#9EADC8",
    "#B9E28C",
    "#D6D84F",
    "#02394A",
    "#043565",
    "#5158BB",
    "#F26DF9",
    "#EB4B98",
    "#48ACF0",
    "#594236",
    "#6F584B",
    "#93A3BC",
    "#CCDDE2",
    "#D4CBE5",
    "#CFC7D2",
    "#BEA8AA",
    "#9E9885",
    "#7C7F65",
    "#E0BAD7",
    "#61D095",
    "#48BF84",
    "#439775",
    "#2A4747",
    "#FFBE0B",
    "#FB5607",
    "#FF006E",
    "#8338EC",
    "#3A86FF",
  ],
  project: new MapBox(busTrackerStructure),
  map: {},
};
busTrackerProperties.project.render();
busTrackerProperties.project.style();
busTrackerProperties.project.activate();
document
  .getElementById("map-project")
  .appendChild(busTrackerProperties.project.element);
