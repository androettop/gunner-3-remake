import { Color, Sound } from "excalibur";

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

export interface TriggerEntity extends BaseLevelEntity {
  type: "trigger";
  width: number;
  height: number;
  properties: {
    type: "fall-death";
  };
}

export type LevelEntity =
  | PlayerEntity
  | EnemySoldierEntity
  | GroundEntity
  | TriggerEntity;

export type LevelLayer = {
  name: string;
  entities: LevelEntity[];
  parallax: number;
};

export type Level = {
  backgroundColor: Color;
  music: Sound;
  layers: LevelLayer[];
};
