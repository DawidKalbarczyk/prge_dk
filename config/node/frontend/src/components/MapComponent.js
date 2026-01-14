import {React, useRef, useEffect} from 'react';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import {useGeographic} from "ol/proj";
import "ol/ol.css";
import {TileWMS} from 'ol/source';

function MapComponent(props) {
    const mapRef = useRef(null);
    useGeographic();
    useEffect(() => {
        const map = new Map({
            target: mapRef.current,
            layers: [
              new TileLayer({
                  source: new OSM(),
              }),
                //http://localhost:9000/geoserver/ne/wms?service=WMS&version=1.1.0&request=GetMap&layers=ne%3Aworld&bbox=-180.0%2C-90.0%2C180.0%2C90.0&width=768&height=384&srs=EPSG%3A4326&styles=&format=image%2Fjpeg
                new TileLayer({
                    source: new TileWMS({
                        url: "http://localhost:9000/geoserver/ne/wms?",
                        params: {
                            'LAYERS': 'ne:countries',
                            'TILED': true
                        },
                        serverType: 'geoserver',
                        transition: 300
                    })
                }),
                new TileLayer({
                    source: new TileWMS({
                        url: "http://localhost:9000/geoserver/prge/wms?",
                        params: {
                            'LAYERS': 'prge:Budynki_Warszawa',
                            'TILED': true
                        },
                        serverType: 'geoserver',
                        transition: 300
                    })
                })
            ],
            view: new View({
                center: [21, 52],
                zoom: 6
            })
        });
        return () => map.setTarget(null);
    }, [] ) ;  // Referencja która odświeża po zmianie wartości w [user]


    return (


        <div className="mapComponent" ref={mapRef}></div>
    );
}

export default MapComponent;