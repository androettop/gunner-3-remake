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

export type LevelEntity = PlayerEntity | EnemySoldierEntity | GroundEntity;

export type LevelLayer = {
  name: string;
  entities: LevelEntity[];
  parallax: number;
};

export type Level = {
  // music: Sound;
  layers: LevelLayer[];
};
