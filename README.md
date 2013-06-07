Angularjs Map & Directions 
===========

Angularjs Google Maps & Directions Directive 


**Required Dependencies for Component:**
+ **Angularjs**

  Stable: ` <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>`
  
  Unstable: `<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>`
  
  Please refer to the following [**url**](http://goo.gl/zNXqU) for version(stability) discrepancies.
  
  You can still use the "unstable" version for the latest animate and other ng directives.
  
+ **Google Maps Api v3**

  `<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>`


**Optional Dependencies:**
+ **Zurb Foundation**

   Used in simple styling of map and directions.

  `<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/foundation/4.1.6/css/foundation.min.css"  />`


### Usage

Below illustrates a simple setup:


```
<!DOCTYPE html>
<html ng-app="mapComponent">
<head>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/foundation/4.1.6/css/foundation.min.css" />
<link rel="stylesheet" href="style.css" />
<script src="script.js"></script>
</head>
<body>
	<map></map>
</body>

</html>
```

Adding `ng-app="mapComponent"` to the `<html>` tag implies the module mapComponent is the root module for the app.

If you do not want this side effect, you can wrap the `<map></map>` element with a div tag like so:

```
<div ng-app="mapComponent">
	<map><map>
</div>
```

leaving the `<html>` tag clear of attributes as you would per normal situation.

**IE browser and validation note**

If you care about IE versions <= 9 use the attribute or class version of `<map></map>` directive.

The results would be like so respectively:

```
<div data-map></div>
```
or
```
<div class="map"></div>
```

The width and height of the map are controlled explicitly by CSS.

Edits should be made to the CSS and not via javascript.

#### Options:

The following options are available as attributes for map/directions customization:

`Denotes defaults`

+ **destination:** address to user will arrive to. `1600 Amphitheatre Parkway, Santa Clara County, CA`
+ **markerContent:** content of the initial marker and if not using directions. `Google HQ`
+ **zoom:** zoom level of the initial map. `15`
+ **type:** types of map roadmap, satellite, hybird, & terrain. `roadmap`
+ **directions:** a boolean to show or hide directions. `true`


**Ex:**

`<map destination="Philadelphia PA" type="hybrid" zoom="18" marker-content="Philly"></map>`

as previously noted the below version would be valid (validators):

`<div class="map" data-destination="Philadelphia PA" data-type="hybrid" data-zoom="18" data-marker-content="Philly"></div>`

The above would result into a destination of Philadelphia PA 
with the map type of hybrid so both roadmap & satellite combined.

Along with an initial zoom level of 18 and 
if a user were to click on the marker the info window would appear to display Philly.

Any options omitted will simply default to the data described above.


**Todo**
+ Add more options.
+ Maybe create a service as directive feeder.
