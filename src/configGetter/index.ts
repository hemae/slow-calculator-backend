import config from 'config'

export type RoutesFolder = 'routes'

export type DatabaseRelationFolderName =
    'forms-input-elements'

export type DatabaseDataFolderName =
    'forms'
    | 'input-elements'
    | 'users'
    | 'results'

export type DatabaseFolderName = DatabaseDataFolderName | DatabaseRelationFolderName

export type FolderName = DatabaseFolderName | RoutesFolder

type Server =
    'port'
    | 'baseUrl'
    | 'apiV'

type JwtSecret =
    'jwtSecret'
    | 'jwtPassword'

type PasswordSecret =
    'passwordSecret'

type App =
    'appName'

type DataBase =
    'dataBasePath'
    | 'databaseSuffix'

type ConfigParam =
    Server
    | FolderName
    | JwtSecret
    | PasswordSecret
    | App
    | DataBase

export default function configGetter<ReturnedType>(param: ConfigParam): ReturnedType {
    return config.get(param)
}
