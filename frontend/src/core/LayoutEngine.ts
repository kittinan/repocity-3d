import { CityEntity } from "../types/CitySchema";

const BUILDING_BASE_SIZE = 5;
const BLOCK_PADDING = 4;
const BUILDING_PADDING = 2;
const HEIGHT_SCALE = 0.05;
const MAX_HEIGHT = 100;

export class LayoutEngine {
  static calculate(node: CityEntity): CityEntity {
    // If it's a file (building)
    if (node.type === "building") {
      const h = Math.min(Math.max(1, (node.size || 100) * HEIGHT_SCALE), MAX_HEIGHT);
      node.dimensions = {
        width: BUILDING_BASE_SIZE,
        depth: BUILDING_BASE_SIZE,
        height: h,
      };
      // Center of the building is at (0, h/2, 0) relative to its local origin
      return node;
    }

    // If it's a folder (block)
    if (!node.children || node.children.length === 0) {
      node.dimensions = { width: BUILDING_BASE_SIZE, depth: BUILDING_BASE_SIZE, height: 1 };
      return node;
    }

    // 1. Process children first (Post-order traversal)
    node.children.forEach(child => this.calculate(child));

    // 2. Simple Grid / Shelf Packing
    // Goal: pack children into a roughly square area
    const children = node.children;
    
    // Calculate total area approximation
    const totalArea = children.reduce((sum, child) => {
        const w = child.dimensions.width + BUILDING_PADDING;
        const d = child.dimensions.depth + BUILDING_PADDING;
        return sum + (w * d);
    }, 0);
    
    // Target width for the row
    const targetWidth = Math.sqrt(totalArea);
    
    let currentX = 0;
    let currentZ = 0;
    let currentRowHeight = 0;
    let maxWidth = 0;

    children.forEach((child) => {
      const childW = child.dimensions.width;
      const childD = child.dimensions.depth;

      // Wrap to next row if we exceed target width
      if (currentX + childW > targetWidth && currentX > 0) {
        currentX = 0;
        currentZ += currentRowHeight + BUILDING_PADDING;
        currentRowHeight = 0;
      }

      // Position child (temporarily 0-based top-left)
      // We store relative position to the parent's corner
      child.position = {
        x: currentX + childW / 2,
        y: (child.type === 'building' ? child.dimensions.height / 2 : 1/2) + 0.5, // Lift on top of base
        z: currentZ + childD / 2
      };

      currentRowHeight = Math.max(currentRowHeight, childD);
      currentX += childW + BUILDING_PADDING;
      maxWidth = Math.max(maxWidth, currentX);
    });

    const finalDepth = currentZ + currentRowHeight;

    // 3. Set Block Dimensions
    node.dimensions = {
      width: maxWidth + BLOCK_PADDING, // Add outer padding
      depth: finalDepth + BLOCK_PADDING,
      height: 1
    };

    // 4. Re-center children
    // Shift all children so the group is centered at (0,0)
    const offsetX = (maxWidth) / 2;
    const offsetZ = (finalDepth) / 2;

    children.forEach(child => {
      child.position.x -= offsetX;
      child.position.z -= offsetZ;
    });

    return node;
  }
}
