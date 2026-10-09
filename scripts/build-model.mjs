import * as fs from 'fs';
import * as path from 'path';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

class MockFileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
}
globalThis.FileReader = MockFileReader;

async function buildTurntable() {
  const mtlText = fs.readFileSync('source/ProigrivatelPosleBoolean.mtl', 'utf-8');
  const mtlLoader = new MTLLoader();
  const materialsCreator = mtlLoader.parse(mtlText, '');
  materialsCreator.preload();

  const objLoader = new OBJLoader();
  objLoader.setMaterials(materialsCreator);
  const objText = fs.readFileSync('source/ProigrivatelPosleBoolean.obj', 'utf-8');
  const root = objLoader.parse(objText);

  const turntable = new THREE.Group();
  turntable.name = 'TurntableRoot';

  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'TurntableBody';

  const vinylPivot = new THREE.Group();
  vinylPivot.name = 'VinylPivot';

  // Vinyl record center coordinates in original model
  const vinylCenter = new THREE.Vector3(-0.47888, 0.22535, 0.00023);
  vinylPivot.position.copy(vinylCenter);

  // Tonearm pivot
  const armPivot = new THREE.Group();
  armPivot.name = 'TonearmPivot';
  const armCenter = new THREE.Vector3(0.7811, 0.2336, -0.7690);
  armPivot.position.copy(armCenter);

  const vinylMeshNames = ['Cylinder.019_Cylinder.044'];

  let c1Count = 0;
  for (let i = root.children.length - 1; i >= 0; i--) {
    const child = root.children[i];
    const box = new THREE.Box3().setFromObject(child);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Keep only Cluster 1 meshes (main clean turntable)
    if (center.x >= -3 && center.x <= 3) {
      c1Count++;
      if (vinylMeshNames.includes(child.name)) {
        // Shift geometry so its center of rotation is (0, 0, 0)
        child.geometry.translate(-vinylCenter.x, -vinylCenter.y, -vinylCenter.z);
        child.position.set(0, 0, 0);
        child.name = 'VinylMesh';
        vinylPivot.add(child);
      } else {
        bodyGroup.add(child);
      }
    }
  }

  console.log('Cluster 1 meshes processed:', c1Count);

  turntable.add(bodyGroup);
  turntable.add(vinylPivot);

  // Convert materials to high-quality MeshStandardMaterial
  turntable.traverse((node) => {
    if (node.isMesh && node.material) {
      const mats = Array.isArray(node.material) ? node.material : [node.material];
      const newMats = mats.map((m) => {
        const std = new THREE.MeshStandardMaterial({
          name: m.name,
          roughness: 0.45,
          metalness: 0.1,
        });

        if (m.name === 'Metalic_spin' || m.name === 'klepki_ruchka_angle') {
          std.metalness = 0.9;
          std.roughness = 0.15;
          std.color.setHex(0xe6e6e6);
        } else if (m.name.startsWith('Material.003') || m.name.startsWith('Material_no_rough')) {
          // Vinyl record dark grooves
          std.metalness = 0.55;
          std.roughness = 0.22;
          std.color.setHex(0x121214);
        } else if (m.name.startsWith('Material.002')) {
          // Vinyl center label
          std.metalness = 0.05;
          std.roughness = 0.7;
          std.color.setHex(0xd0d0d0);
        } else if (m.name.startsWith('black_base')) {
          std.metalness = 0.15;
          std.roughness = 0.75;
          std.color.setHex(0x1e1e1e);
        } else if (m.name.startsWith('korpus')) {
          std.metalness = 0.1;
          std.roughness = 0.65;
          std.color.setHex(0x28201a); // Rich vintage turntable body
        } else if (m.name.startsWith('bezhevii')) {
          std.metalness = 0.05;
          std.roughness = 0.85;
          std.color.setHex(0xdfd9ce); // Cream interior lining
        } else if (m.name.startsWith('ruchkaa')) {
          std.metalness = 0.1;
          std.roughness = 0.8;
          std.color.setHex(0x382c24);
        } else if (m.name.startsWith('orango')) {
          std.metalness = 0.2;
          std.roughness = 0.5;
          std.color.setHex(0xb8481e);
        } else {
          std.color.setHex(0x2a2a2a);
        }

        return std;
      });

      node.material = Array.isArray(node.material) ? newMats : newMats[0];
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  fs.mkdirSync('public/models', { recursive: true });

  const exporter = new GLTFExporter();
  exporter.parse(
    turntable,
    (glb) => {
      fs.writeFileSync('public/models/turntable.glb', Buffer.from(glb));
      const stats = fs.statSync('public/models/turntable.glb');
      console.log('Successfully saved public/models/turntable.glb:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
    },
    (err) => console.error('Export error:', err),
    { binary: true }
  );
}

buildTurntable();

