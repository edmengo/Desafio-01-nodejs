export function buildRouterPath(path){
  const routerParameterRegex = /:([a-zA-Z]+)/g 
  
  const pathWithParams = path.replaceAll(routerParameterRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}