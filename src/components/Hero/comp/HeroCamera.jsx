

import {useFrame, } from '@react-three/fiber';
import {  PerspectiveCamera, } from '@react-three/drei';


export default function HeroCamera({cameraRef}) {


    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const radius = 8; // Raio da rotação
        const speed = 0.15; // Velocidade da rotação
        const x = radius * Math.cos(speed * elapsedTime);
        const z = radius * Math.sin(speed * elapsedTime);
        if (cameraRef.current) {
            cameraRef.current.position.set(x, 0, z);
            cameraRef.current.lookAt(0, 0, 0); // Olha para o centro da cena
        }
    });

    return (
        <>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 1]} fov={75} />
        </>




    );
}