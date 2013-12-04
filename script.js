// vim: et:ts=4:sw=4
/*global google:false */
var component = angular.module('mapComponent', []);

component.provider('MapConfig', [function () {
    this.options = {
        templateUrl: 'map.html',
        destination: '1600 Amphitheatre Parkway, Santa Clara County, CA',
        defaultMarkerContent: 'Google HQ'
    };

    this.$get = [
        function () {
            var service = {
                options: this.options
            };

            return service;
        }
    ];
}]);

component.directive('map', [ 'MapConfig', function (MapConfig) {

    'use strict';
    var directionsDisplay = new google.maps.DirectionsRenderer(),
        directionsService = new google.maps.DirectionsService(),
        geocoder = new google.maps.Geocoder(),
        map,
        marker,
        mapObj,
        infowindow;

    mapObj = {
        restrict: 'EAC',
        scope: {
            origin: '@',
            destination: '@',
            markerContent: '@',
            zoom: '=',
            type: '@',
            directions: '@'
        },
        replace: true,
        templateUrl: MapConfig.options.templateUrl,
        link: function (scope, element) {
            scope.init = function () {
                var mapOptions = {
                    zoom: scope.zoom !== undefined ? scope.zoom : 15,
                    mapTypeId: scope.type !== undefined ? scope.type.toLowerCase() : 'roadmap',
                    streetViewControl: false
                };
                map = new google.maps.Map(document.getElementById('theMap'), mapOptions); // todo: use angular-element :)      
                scope.endPoint = scope.destination !== undefined ? scope.destination : MapConfig.options.destination;

                geocoder.geocode({
                    address: scope.endPoint
                }, function (results, status) {
                    var location;
                    if (status === google.maps.GeocoderStatus.OK) {
                        location = results[0].geometry.location;
                        map.setCenter(location);
                        marker = new google.maps.Marker({
                            map: map,
                            position: location,
                            animation: google.maps.Animation.DROP
                        });
                        infowindow = new google.maps.InfoWindow({content: scope.markerContent !== undefined ? scope.markerContent : MapConfig.options.defaultMarkerContent });
                        google.maps.event.addListener(marker, 'click', function () {
                            return infowindow.open(map, marker);
                        });

                    } else {
                        alert('Cannot Geocode');
                    }

                });
               

            };

            scope.init();

            scope.getDirections = function () {
                var request = {
                    origin: scope.origin || '',
                    destination: scope.endPoint,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                directionsService.route(request, function (response, status) {
                    return status === google.maps.DirectionsStatus.OK ? directionsDisplay.setDirections(response) : console.warn(status);
                });
                directionsDisplay.setMap(map);

                directionsDisplay.setPanel(document.getElementById('directionsList')); // again need to use angular element thats ugly otherwise.
            };

            scope.$watch('origin', function() {
                scope.getDirections();
            });

            scope.clearDirections = function () {
                scope.init();
                directionsDisplay.setPanel(null);
                scope.origin = '';
            };



        }
    };

    return mapObj;



}]);
