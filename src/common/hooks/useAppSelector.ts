import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { AppRootStateType } from 'app/bll/store'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
