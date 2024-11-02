import { Engine } from "excalibur";
import { getPlayer } from "./helpers/player";

export type DebugAction = {
  key: string;
  description: string;
  action: (game: Engine) => void;
};

export const debugActions: DebugAction[] = [
  {
    key: "1",
    description: "Go to main menu",
    action: (game) => {
      game.goToScene("main_menu");
    },
  },
  {
    key: "2",
    description: "Debug scene",
    action: (game) => {
      game.goToScene("debug_scene");
    },
  },
  {
    key: "3",
    description: "-1 Health",
    action: (game) => {
      const player = getPlayer(game.currentScene);
      player.health--;
    },
  },
  {
    key: "4",
    description: "+1 Health",
    action: (game) => {
      const player = getPlayer(game.currentScene);
      player.health++;
    },
  },
];

export const setupDebugTools = (game: Engine) => {
  window.document.addEventListener("keypress", (e) => {
    if (e.ctrlKey) {
      const key = e.key;
      const action = debugActions.find((a) => a.key === key);
      if (action) {
        action.action(game);
      }
    }
  });

  // append debug tools to the DOM
  const debugTools = window.document.createElement("div");
  debugTools.className = "debug-tools";
  const debugToolsTitle = window.document.createElement("h2");
  debugToolsTitle.innerText = "Debug Tools";
  debugTools.appendChild(debugToolsTitle);
  const debugToolsList = window.document.createElement("ul");
  debugActions.forEach((action) => {
    const debugToolsListItem = window.document.createElement("li");
    debugToolsListItem.innerText = `Alt+${action.key}: ${action.description}`;
    debugToolsListItem.addEventListener("click", () => {
      action.action(game);
    });
    debugToolsList.appendChild(debugToolsListItem);
  });
  debugTools.appendChild(debugToolsList);
  window.document.body.appendChild(debugTools);
};
