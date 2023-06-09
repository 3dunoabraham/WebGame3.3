import { Text } from '@react-three/drei';
import { MeshBasicMaterial, MeshStandardMaterial, Vector3 } from 'three';

export default function Component ({
  children,
  ...props
}:any)  {

  return (
        
        
        <Text {...props} font='/marko.ttf'>
        {children}
      </Text>
  );
};