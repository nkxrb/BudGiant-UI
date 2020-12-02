declare type PluginInstallFunction = (app: App, ...options: any[]) => any;

// Vue组件类型声明
declare type VuePlugin = {
  install: PluginInstallFunction
}

declare class KViewComponent extends VuePlugin {
  install: PluginInstallFunction
}