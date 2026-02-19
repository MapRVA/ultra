import AutoProvider from "@trailstash/ultra/lib/queryProviders/auto.js";
import overpass from "@trailstash/ultra/lib/queryProviders/overpass.js";
import { all } from "@trailstash/ultra/lib/queryProviders/index.js";

const mapStyle = "https://styles.maprva.org/openmaptiles-osm.json";
const query = `/*
This is an example Overpass query.
Try it out by pressing the Run button above!
*/
[bbox:{{bbox}}];
(
way[highway=path];
way[highway=footway];
way[highway=cycleway];
way[highway=steps];
);
out geom;`;


const customAll = {
  ...all,
  overpass: {
    ...overpass,
    source: async function (query, controller, { server }) {
      if (!server) {
        server = "https://overpass.maprva.org/api";
      }
      return overpass.source(query, controller, { server });
    },
  },
};

const settings = {
  type: "auto",
  mapStyle,
  queryProviders: {
    auto: new AutoProvider(customAll),
    ...customAll,
  },
};

const omtAttribution = '<a target="_blank" href="https://openmaptiles.org">OpenMapTiles</a> (Tiles by <a target="_blank" href="https://tiles.openstreetmap.us/">OSM US</a>)';
const styles = [
  [
    `OSM OpenMapTiles`,
    "https://styles.maprva.org/openmaptiles-osm.json",
    omtAttribution,
  ],
  [
    `OSM Liberty`,
    "https://styles.maprva.org/osm-liberty.json",
    omtAttribution,
  ],
  [
    `OSM Bright`,
    "https://styles.maprva.org/osm-bright.json",
    omtAttribution,
  ],
  [
    `Positron`,
    "https://styles.maprva.org/positron.json",
    omtAttribution,
  ],
  [
    `Dark Matter`,
    "https://styles.maprva.org/dark-matter.json",
    omtAttribution,
  ],
  [
    `MapTiler Basic`,
    "https://styles.maprva.org/maptiler-basic.json",
    omtAttribution,
  ],
  [
    `MapTiler 3D`,
    "https://styles.maprva.org/maptiler-3d.json",
    omtAttribution,
  ],
  [
    `Toner`,
    "https://styles.maprva.org/maptiler-toner.json",
    omtAttribution,
  ],
  [
    `Fiord Color`,
    "https://styles.maprva.org/fiord-color.json",
    omtAttribution,
  ],
  [
    `Virginia Base Mapping Program`,
    "https://styles.maprva.org/vgin-vbmp-imagery-latest.json",
    `Imagery`,
  ],
  [
    `Henrico Aerial Imagery`,
    "https://styles.maprva.org/henrico-aerial-imagery-latest.json",
    `Imagery`,
  ],
  [
    `Esri World Imagery`,
    "https://styles.maprva.org/henrico-aerial-imagery-latest.json",
    `Imagery`,
  ],
];


export const defaultMode = "ide";
export const modes = {
  ide: {
    query,
    styles,
    settings: {
      ...settings,
      title: "MapRVA Ultra",
      url: "https://ultra.maprva.org",
      options: {
        attributionControl: {
          customAttribution: "",
        },
      },
    },
  },
  map: {
    settings: {
      ...settings,
      loadSettingsFromQueryParams: true,
      options: {
        attributionControl: {
          compact: true,
          customAttribution: `<a href=".">Ultra</a>
            (<a href="javascript:new URLSearchParams(window.location.hash.slice(1));params.delete("map");window.location=new URL("#"+params.toString(),window.location).toString();">View Query</a>)`,
        },
      },
    },
  },
};
