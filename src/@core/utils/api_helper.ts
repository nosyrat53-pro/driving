import axios from 'axios'
import { isObject } from '.'
import { QueryParams } from './types'
import toast from 'react-hot-toast'

// import { useSnackbarStore } from '@/utils/modules/snackbar-store'
// import axios from '@axios'

function mapToFormData(obj: Record<string, unknown>): FormData {
  console.log('test3', obj)

  const toSend = new FormData()
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element: any = obj[key]

      if (key === 'image') {
        toSend.append(`${key}`, element)
      }

      else if (key === 'socialMedia') {
        toSend.append(`${key}`, element)
      }

      else if (isObject(element)) {
        for (const innerKey in element) {
          if (isObject(element[innerKey]) || Array.isArray(element[innerKey])) {
            const innerEl: any = element[innerKey]

            innerEl.forEach((arrEl: any) => {
              toSend.append(`${innerKey}[]`, arrEl)
            })
          }
          else {
            toSend.append(`${key}[]`, element[innerKey])
          }
        }
      }

      else if (element || element === 0) {
        (element || element === 0) && toSend.append(key, element)
      }
      else { toSend.append(`${key}`, element) }
    }
  }

  return toSend
}

export default class BaseCrud {
  ep: string
  constructor(ep: string) {
    this.ep = ep
  }

  async index(qp: QueryParams) {
    return await axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}${this.ep}`, { params: qp,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => res.data)
      .catch(err => {
        // toast.error(err.response.data.message);
    })
  }

  async show(id: number, qp: QueryParams) {
    return await axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}${this.ep}/${id}`, { params: qp }).then(res => res)
  }

  async create(form: any,qp: QueryParams) {
    const toSend = mapToFormData(form)

    return await axios.post(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}${this.ep}/create`, {...form},{
    params: qp,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => {
      // if (res.status >= 200 && res.status < 300)
      //   useSnackbarStore().showSnackbar(res.data.message, { color: 'success' })
      // toast.success('created successfully')
      return res.data
    })
      .catch(err => {
        // console.log('error', err)
        toast.error(err.response.data.error.message);
    })
  }

  async update(id,form: any) {
    const toSend = mapToFormData(form)

    toSend.append('_method', 'PUT')

    return await axios.patch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}${this.ep}/${id}`, {...form} , {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}}).then(res => {
      // if (res.status >= 200 && res.status < 300)
      //   useSnackbarStore().showSnackbar(res.data.message, { color: 'success' })


      return res.data
    })
      .catch(err => {
        toast.error(err.response.data.message);
    })
  }

  async destroy(id: number) {
    return await axios.delete(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}${this.ep}/${id}`,{  headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }}).then(res => {
      // if (res.status >= 200 && res.status < 300)
      //   useSnackbarStore().showSnackbar(res.data.message, { color: 'success' })

      return res.data
    }).catch(err => {
      // console.log('error is => ', err);
      toast.error(err.response.data.message);
    })
  }
}
