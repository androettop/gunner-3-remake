import { DefaultLoader, Loadable } from "excalibur";

export const loadResources = (
  loader: DefaultLoader,
  ...resourceObjects: Record<string, Loadable<any>>[]
) => {
  for (const resourceObject of resourceObjects) {
    for (const key in resourceObject) {
      loader.addResource(resourceObject[key]);
    }
  }

  return loader;
};
