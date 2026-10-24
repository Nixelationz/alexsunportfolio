import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import modelUrl from '../../1.obj?url'
import materialUrl from '../../1.mtl?url'
import bodyUrl from '../../AboutMe1_diff.png?url'
import texture1 from '../../Handle1_diff.png?url'
import texture2 from '../../Handle2_diff.png?url'
import texture3 from '../../Handle3_diff.png?url'
import texture4 from '../../Handle4_diff.png?url'

export default function AvatarScene() {
  const container = useRef<HTMLDivElement>(null)
  const reset = useRef<() => void>(() => {})
  const [status, setStatus] = useState('Loading character…')
  useEffect(() => {
    const host = container.current!
    let disposed = false
    let frame = 0
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 200)
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }) }
    catch { setStatus('3D rendering is unavailable in this browser.'); return }
    renderer.setPixelRatio(1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)
    renderer.domElement.setAttribute('aria-label', 'Interactive 3D avatar of Alex Sun')
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.enableZoom = false
    controls.touches.ONE = THREE.TOUCH.ROTATE
    scene.add(new THREE.HemisphereLight(0xffffff, 0x777788, 2))
    const key = new THREE.DirectionalLight(0xffffff, 2.3)
    key.position.set(4, 7, -6)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xb7dfff, 1)
    fill.position.set(5, 3, -4)
    scene.add(fill)
    let model: THREE.Group | undefined
    let size = new THREE.Vector3(5, 7, 3)
    const fit = () => {
      const width = host.clientWidth
      const height = host.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(Math.max(1, Math.round(width / 3)), Math.max(1, Math.round(height / 3)), false)
      const distance = Math.max(size.y, size.x / camera.aspect) / (2 * Math.tan(THREE.MathUtils.degToRad(16))) * 1.22
      // Roblox exports face -Z; this angle reveals the front and its left edge.
      camera.position.set(distance * 0.40, distance * 0.10, -distance)
      controls.target.set(0, size.y * 0.015, 0)
      controls.minDistance = distance * 0.55
      controls.maxDistance = distance * 2
      controls.update()
    }
    reset.current = fit
    const observer = new ResizeObserver(fit)
    observer.observe(host)
    fit()
    const textures: Record<string, string> = { 'AboutMe1_diff.png': bodyUrl, 'Handle1_diff.png': texture1, 'Handle2_diff.png': texture2, 'Handle3_diff.png': texture3, 'Handle4_diff.png': texture4 }
    const manager = new THREE.LoadingManager()
    manager.setURLModifier(url => textures[url.split('/').pop()!] ?? url)
    manager.onLoad = () => { if (!disposed) setStatus('') }
    const fail = () => { if (!disposed) setStatus('Unable to load the character. Please refresh to try again.') }
    new MTLLoader(manager).load(materialUrl, materials => {
      if (disposed) return
      materials.preload()
      Object.values(materials.materials).forEach(material => {
        if (!(material instanceof THREE.MeshPhongMaterial)) return
        material.color.lerp(new THREE.Color(0xffffff), 0.25)
        material.specular.set(0x111111)
        material.alphaMap = null
        material.side = THREE.DoubleSide
      })
      new OBJLoader(manager).setMaterials(materials).load(modelUrl, object => {
        if (disposed) return
        model = object
        const bounds = new THREE.Box3().setFromObject(object)
        bounds.getSize(size)
        object.position.sub(bounds.getCenter(new THREE.Vector3()))
        scene.add(object)
        fit()
      }, undefined, fail)
    }, undefined, fail)
    const animate = () => { frame = requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera) }
    animate()
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      controls.dispose()
      model?.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach(material => { material.map?.dispose(); material.dispose() })
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return <section className="avatar-stage" aria-label="3D character"><div ref={container} className="avatar-canvas" />{status && <p className="avatar-status" role="status">{status}</p>}<button type="button" className="avatar-reset" title="Reset camera" aria-label="Reset camera" onClick={() => reset.current()}>↺</button></section>
}
