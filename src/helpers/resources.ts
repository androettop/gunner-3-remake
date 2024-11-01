import { Loadable, Loader } from "excalibur";

export const createLoader = (
  ...resourceObjects: Record<string, Loadable<any>>[]
) => {
  const loader = new Loader();
  for (const resourceObject of resourceObjects) {
    for (const key in resourceObject) {
      loader.addResource(resourceObject[key]);
    }
  }

  return loader;
};
