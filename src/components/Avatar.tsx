import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function Avatar({ isSpeaking }: { isSpeaking: boolean }) {
  const avatarRef = useRef<THREE.Group>();
  const { scene } = useGLTF('https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb');

  useFrame((state) => {
    if (avatarRef.current) {
      // Gentle idle animation
      avatarRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Speaking animation
      if (isSpeaking) {
        avatarRef.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.05;
      } else {
        avatarRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.02;
      }
    }
  });

  return (
    <primitive 
      ref={avatarRef} 
      object={scene} 
      position={[0, -0.8, 0]} 
      scale={0.8} 
    />
  );
}

useGLTF.preload('https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb');