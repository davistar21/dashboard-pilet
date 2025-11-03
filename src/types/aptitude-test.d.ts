declare module "aptitude-test" {
  export interface PiletApi {
    registerPage: (path: string, component: React.ComponentType<any>) => void;
    registerMenu: (component: React.ComponentType<any>) => void;
    registerTile?: (component: React.ComponentType<any>, options?: any) => void;
  }
}
