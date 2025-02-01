import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { Suspense } from "react";

export function Scene({ isSpeaking }: { isSpeaking: boolean }) {
    return (
        <Canvas camera={{ position: [0, 15, 5], fov: 50 }}>
            <color attach="background" args={["#1a1a1a"]} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Suspense fallback={null}>
                <Avatar isSpeaking={isSpeaking} />
                <Environment preset="city" />
            </Suspense>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.2}
                maxPolarAngle={Math.PI / 2.2}
            />
        </Canvas>
    );
}
