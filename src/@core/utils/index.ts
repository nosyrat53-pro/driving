// import { useSnackbarStore } from '@/utils/modules/snackbar-store'

// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === '')
    return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown): value is undefined | null => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

export const isToday = (date: Date) => {
  const today = new Date()

  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

export const isImage = (src: string) => {
  if (typeof src !== 'string')
    return false

  return (src.match(/^http[^\?]*.(svg|jpg|jpeg|gif|png|tiff|jfif|bmp)(\?(.*))?$/gmi) != null)
}

export const millenniumSeparator = (number: any) => number.toLocaleString()

// export const handelRsponseSnackbar = (res: any) => {
//   const { showSnackbar } = useSnackbarStore()
//   if (res.status >= 200 && res.status < 300)
//     showSnackbar(res.data.message, { color: res.data.status ? 'success' : 'error' })
//   else if (res.status === 500)
//     showSnackbar(res.data.message, { color: res.data.status ? 'success' : 'error' })
// }
