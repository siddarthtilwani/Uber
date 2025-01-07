import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([20.5937, 78.9629], 5);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

            markerRef.current = L.marker([20.5937, 78.9629]).addTo(mapRef.current);
        }

        const updatePosition = (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });

            if (markerRef.current) {
                markerRef.current.setLatLng([latitude, longitude]);
            }

            if (mapRef.current) {
                mapRef.current.setView([latitude, longitude], 15);
            }
        };

        
        navigator.geolocation.getCurrentPosition(updatePosition);

       
        const intervalId=setInterval(() => {
            navigator.geolocation.getCurrentPosition(updatePosition)
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div id="map" style={{ height: '500px', width: '100%' ,zIndex:-1}}></div>
        </div>
    );
};

export default LiveTracking;
