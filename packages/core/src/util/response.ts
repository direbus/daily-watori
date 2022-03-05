
export interface ResponseError {
  title: string,
  description?: string,
  code?: string
}


export interface ResponseFormat {
  status: boolean,
  message: string | null,
  data: any | null,
  error: ResponseError | null
}

export function respondOk(data: any, message?: string): ResponseFormat {
  return {
    status: true,
    message: message || null,
    data: data,
    error: null
  }
}

export function respondError(errorInfo: ResponseError, message?: string): ResponseFormat {
  return {
    status: false,
    message: message || null,
    data: null,
    error: errorInfo
  }
}
