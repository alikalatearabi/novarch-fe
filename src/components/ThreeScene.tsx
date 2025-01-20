// src/ThreeScene.js
import React, { use, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function resizeImage(originalWidth: number, originalHeight: number, maxWidth: number, maxHeight: number) {
    let newWidth = originalWidth;
    let newHeight = originalHeight;

    // Calculate the aspect ratio
    const aspectRatio = originalWidth / originalHeight;

    // Resize based on width
    if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = maxWidth / aspectRatio;
    }

    // Resize based on height
    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = maxHeight * aspectRatio;
    }

    return {
        width: Math.round(newWidth),
        height: Math.round(newHeight),
    };
}

function scalePosition(x: number, y: number, originalWidth: number, originalHeight: number, targetWidth: number, targetHeight: number) {
    // Calculate the scale factors
    const scaleX = targetWidth / originalWidth;
    const scaleY = targetHeight / originalHeight;

    // Calculate the new scaled position
    const scaledX = x * scaleX;
    const scaledY = y * scaleY;

    return { scaledX, scaledY };
}

interface ThreeSceneProps {
    imagePath: string;
    boxHeight?: number;
    boxWidth?: number;
    points?: { x: number; y: number; }[];
}
const ThreeScene = ({ imagePath, boxHeight, boxWidth, points }: ThreeSceneProps) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const pointsRef = useRef([]);
    const planeRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>>(null);
    const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const width = boxWidth || mountRef.current?.clientWidth;
        const height = boxHeight || 300;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        // Set up renderer with alpha for transparent background
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        // renderer.setSize(window.innerWidth, window.innerHeight);

        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(imagePath, (texture) => {
            // Set the aspect ratio based on the loaded texture
            const aspect = texture.image.width / texture.image.height;
            const newWidth = width; // Full screen width
            const newHeight = newWidth / aspect; // Calculate height based on aspect ratio
            setImageSize({ width: newWidth, height: newHeight });

            const geometry = new THREE.PlaneGeometry(newWidth, newHeight);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
            const plane = new THREE.Mesh(geometry, material);

            planeRef.current = plane; // Store plane reference
            scene.add(plane);
            camera.position.z = Math.max(1, newHeight / 1.2);
            if (points) {
                for (let i = 0; i < points.length; i++) {
                    const { scaledX, scaledY } = scalePosition(points[i].x, points[i].y, texture.image.width, texture.image.height, newWidth, newHeight);
                    addColoredDot(scene, newWidth, newHeight, scaledX, scaledY, '#0000FF99')
                }
            }
        });

        cameraRef.current = camera;

        const animate = () => {
            requestAnimationFrame(animate);
            // Keep the circle at a fixed pixel size

            const pixelSize = 20; // Desired size in pixels
            const distance = camera.position.z; // Camera distance
            // @ts-ignore
            const worldSize = (pixelSize / renderer.getContext().canvas.clientWidth) * (2 * Math.tan((camera.fov * Math.PI) / 360) * distance);
            for (let i = 0; i < pointsRef.current.length; i++) {
                const dot = pointsRef.current[i];
                dot.scale.set(worldSize, worldSize, 1);
            }            

            renderer.render(scene, camera);
        };

        // Mouse wheel event for zooming
        const handleWheel = (event) => {
            event.preventDefault();
            const zoomSpeed = 0.1;
            camera.position.z += event.deltaY * zoomSpeed * 0.6; // Adjust zoom sensitivity here
            camera.position.z = Math.max(1, camera.position.z); // Prevent zooming too close
        };

        // Mouse drag event
        const handleMouseDown = (event) => {
            event.preventDefault();
            const onMouseMove = (moveEvent) => {
                const deltaX = moveEvent.movementX * 1; // Adjust drag sensitivity
                const deltaY = -moveEvent.movementY * 1; // Invert Y for standard dragging
                if (planeRef.current) {
                    planeRef.current.position.x += deltaX;
                    planeRef.current.position.y += deltaY;
                }
            };

            const onMouseUp = () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);

        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('mousedown', handleMouseDown);

        animate();

        return () => {
            mountRef.current?.removeChild(renderer.domElement);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, [boxHeight, boxWidth, imagePath, points]); // Add imagePath to dependencies

    const addColoredDot = (scene: THREE.Scene, width: number, height: number, x: number, y: number, color: string) => {
        // Create a circular texture
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const radius = 50; // Radius in pixels
        canvas.width = radius * 2;
        canvas.height = radius * 2;

        // Draw a filled circle
        context.beginPath();
        context.arc(radius, radius, radius, 0, Math.PI * 2, false);
        context.fillStyle = color; // Circle color
        context.fill();
        context.closePath();

        // Create a texture from the canvas
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        const spriteMaterial = new THREE.SpriteMaterial({ map: texture }); // Red color
        const sprite = new THREE.Sprite(spriteMaterial);

        // Set the size of the sprite
        const spriteSize = 24; // Size in world units
        sprite.scale.set(spriteSize, spriteSize, 1); // Fixed size in world units

        // Position in the center of the scene
        /**
         * @TODO the division by 2 and 3 are hardcoded and found using trial and error
         * needs a proper calculation
         */
        sprite.position.set(x - (width / 2), y - (height / 3), 0.01);
        pointsRef.current.push(sprite);
        scene.add(sprite);
    };

    return (
        <div ref={mountRef} style={{ width: boxWidth ? `${boxWidth}px` : '100%', height: boxHeight ? `${boxHeight}px` : '300px' }} />
    )
};

export default ThreeScene;