var Three = require("three");
var OrbitControls = require('three-orbit-controls')(THREE)

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;


// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
var controls = new OrbitControls(camera)

// Configure renderer clear color
renderer.setClearColor("#002222");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

var texLoader = new THREE.TextureLoader();

// Sun
var geometry = new THREE.SphereGeometry( 1, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
material.map    = texLoader.load('/assets/textures/sunmap.jpg');

var sun = new THREE.Mesh( geometry, material );
sun.position.set( 0, 0, 5 );
scene.add( sun );
// Sunlight
var light = new THREE.PointLight( 0xffffff, 1, 100 );
var sunPos = sun.getWorldPosition();
light.position.set( sunPos.x, sunPos.y, sunPos.z );
scene.add( light );

// Earth
var earthGeo = new THREE.SphereGeometry( 0.5, 32, 32 );
var material = new THREE.MeshPhongMaterial();

material.map    = texLoader.load('/assets/textures/earthmap4k.jpg');
material.bumpMap    = texLoader.load('assets/textures/earthbump4k.jpg');
material.bumpScale = 0.05

var earthMesh = new THREE.Mesh( earthGeo, material );

var cloudsGeo = new THREE.SphereGeometry( 0.505, 32, 32 );
var material = new THREE.MeshPhongMaterial();

material.transparent = true;

material.map    = texLoader.load('/assets/textures/earthcloudmap.jpg');
material.alphaMap    = texLoader.load('/assets/textures/earthcloudmaptransINV.jpg');
material.bumpScale = 0.05

var cloudMesh = new THREE.Mesh( cloudsGeo, material );

earthMesh.add(cloudMesh);
scene.add( earthMesh );

// Render Loop
var render = function () {
  
  requestAnimationFrame( render );  
  sun.rotation.y += 0.01;
  earthMesh.rotation.y += 0.001;
  cloudMesh.rotation.y += 0.0005;

  // Render the scene
  renderer.render(scene, camera);
};

render();