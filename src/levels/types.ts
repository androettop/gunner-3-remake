export interface BaseLevelEntity {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  properties?: any;
}

// Elements

export interface PlayerEntity extends BaseLevelEntity {
  type: "player";
  width: 64;
  height: 64;
  properties: {
    health: number;
    weapons: number[];
    activeWeapon: number;
  };
}

export interface EnemySoldierEntity extends BaseLevelEntity {
  type: "enemy-soldier";
  properties: {
    health: number;
  };
}

export interface GroundEntity extends BaseLevelEntity {
  type: "ground";
  properties: {
    type: "green-grass" | "red-grass" | "blue-grass" | "metal";
  };
}

export type LevelEntity = EnemySoldierEntity | GroundEntity;

export type Level = {
  // music: Sound;
  player: PlayerEntity;
  layers: LevelEntity[][];
};
