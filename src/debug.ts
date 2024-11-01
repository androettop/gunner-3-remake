import { Engine } from "excalibur";

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
];

export const setupDebugTools = (game: Engine) => {
  window.document.addEventListener("keypress", (e) => {
    const key = e.key;
    const action = debugActions.find((a) => a.key === key);
    if (action) {
      action.action(game);
    }
  });

  // append debug tools to the DOM
  const debugTools = window.document.createElement("div");
  debugTools.style.position = "fixed";
  debugTools.style.top = "0";
  debugTools.style.right = "0";
  debugTools.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  debugTools.style.color = "white";
  debugTools.style.padding = "8px";
  debugTools.style.zIndex = "999";
  debugTools.innerHTML = `
    <h2>Debug Tools</h2>
    <ul>
      ${debugActions.map((a) => `<li><kbd>${a.key}</kbd> - ${a.description}</li>`).join("")}
    </ul>
  `;
  window.document.body.appendChild(debugTools);
};
