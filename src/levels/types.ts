export interface BaseLevelEntity {
  x: number;
  y: number;
  type: string;
  properties?: any;
}

// Elements

export interface PlayerEntity extends BaseLevelEntity {
  type: "player";
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
  width: number;
  height: number;
  properties: {
    type: "green-grass" | "red-grass" | "blue-grass" | "metal";
  };
}

export type LevelEntity = EnemySoldierEntity | GroundEntity;

export type Level = {
  // music: Sound;
  player: PlayerEntity;
  layers: {
    background: LevelEntity[];
    background2: LevelEntity[];
    mapBack: LevelEntity[];
    mapFront: LevelEntity[];
    characters: LevelEntity[];
    foreground: LevelEntity[];
  };
};
