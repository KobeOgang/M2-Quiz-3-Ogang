const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera();
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

//Box
const dvdGeometry = new THREE.PlaneGeometry(0.4, 0.3);
const dvdMaterial = new THREE.MeshBasicMaterial();
const dvd = new THREE.Mesh(dvdGeometry, dvdMaterial);
dvd.material.color.set(randomColor());
scene.add(dvd);

//Initial Position n Speed
let dvdPosition = new THREE.Vector3(0, 0, 0);
let dvdVelocity = new THREE.Vector3(0.01, -0.005, 0);

//Bounce Counter
let bounceCount = 0;

//Color generator cuz me lazy hehe
function randomColor() {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    return new THREE.Color(r, g, b);
}

function animate() {
    requestAnimationFrame(animate);

    dvdPosition.add(dvdVelocity);
    
    if (Math.abs(dvdPosition.x) >= 0.9) {
        dvdVelocity.x *= -1;
        dvd.material.color.set(randomColor());
        bounceCount++;
        dvd.scale.x -= 0.1;
        dvd.scale.y -= 0.1;
    }
    else if (Math.abs(dvdPosition.y) >= 0.9) {
        dvdVelocity.y *= -1;
        dvd.material.color.set(randomColor());
        bounceCount++;
        dvd.scale.x -= 0.1;
        dvd.scale.y -= 0.1;
    }
    else if (bounceCount >= 8) {
        dvd.visible = false;
        dvdVelocity.x = 0;
        dvdVelocity.y = 0;
    }

    dvd.position.copy(dvdPosition);
    renderer.render(scene, camera);
}

animate();