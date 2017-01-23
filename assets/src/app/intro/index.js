angular.module( 'investing.intro', [
])

.controller( 'IntroCtrl', function IntroController( $scope, $state, config ) {

	console.log('ok')
	var ww, wh, renderer, scene, camera, cloud;

	var opt = {
	  radius: 20
	};

	function init() {

	  ww = window.innerWidth;
	  wh = window.innerHeight;

	  renderer = new THREE.WebGLRenderer({
	    canvas: document.getElementById("scene"),
	    antialias: true
	  });
	  renderer.setSize(ww, wh);
	  renderer.setClearColor(0x888888);

	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000);
	  camera.position.set(250, 250, 250);
	  camera.lookAt(new THREE.Vector3(0, 0, 0));
	  scene.add(camera);


	  createDots();
	  requestAnimationFrame(render);
	  window.addEventListener("resize", onWindowResize);
	}


	function onWindowResize(){
	  ww = window.innerWidth;
	  wh = window.innerHeight;
	  
	  camera.aspect = ww/wh;
	  camera.updateProjectionMatrix();

	  renderer.setSize(ww,wh);
	}

	function createDots() {
	  var geometry = new THREE.Geometry();
	  var x, y, z, vertex;
	  var i = 0;
	  for (var x = -5; x < 5; x++) {
	    for (var y = -5; y < 5; y++) {
	      for (var z = -5; z < 5; z++) {
	        vertex = new THREE.Vector3(
	          x * opt.radius,
	          y * opt.radius,
	          z * opt.radius
	        );
	        // var theta = (i/density) * (mouse.x*100);
	        // var delta = (i / density - 0.5) * Math.PI * (mouse.y);
	        // var x = 200 * Math.cos(delta) * Math.cos(theta); 
	        // var y = 200 * Math.cos(delta) * Math.sin(theta);
	        // var z = 200 * Math.sin(delta);
	        
	        vertex.index = Math.abs(x) + Math.abs(y) + Math.abs(z);
	        geometry.vertices.push(vertex);
	        i++;
	      }
	    }
	  }
	  geometry.vertices = geometry.vertices.sort(sortVertices);
	  var animation = new TimelineMax({
	    repeat: -1,
	    repeatDelay: 0.5
	  });
	  animation.staggerTo(geometry.vertices, 2.5, {
	    cycle: {
	      x: function(i) {
	        return -geometry.vertices[i].z - opt.radius
	      },
	      y: function(i) {
	        return geometry.vertices[i].y
	      },
	      z: function(i) {
	        return geometry.vertices[i].x
	      }
	    },
	    ease: SlowMo.ease.config(0.5, 0.5, false)
	  }, 0.0007)
	  var material = new THREE.PointsMaterial({
	    color: 0xECF0F1,
	    size: 2,
	    sizeAttenuation: false
	  });
	  cloud = new THREE.Points(geometry, material);

	  scene.add(cloud);
	}

	function sortVertices(a, b) {
	  if (a.index > b.index) {
	    return 0;
	  } else {
	    return -1;
	  }
	}

	function render(a) {
	  requestAnimationFrame(render);

	  cloud.geometry.verticesNeedUpdate = true;

	  renderer.render(scene, camera);
	}

	init();

});