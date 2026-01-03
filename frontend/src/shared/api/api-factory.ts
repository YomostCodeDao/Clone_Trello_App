// frontend/src/shared/api/api-factory.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AxiosResponse } from "axios"
import apiClient from "./api-config"
import { API_ENDPOINTS } from "./api-endpoint"

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

class ApiFactory {
  async get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.get(url, { params })
    return response.data
  }

  async post<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.post(url, data)
    return response.data
  }

  async put<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.put(url, data)
    return response.data
  }

  async patch<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.patch(url, data)
    return response.data
  }

  async delete<T = any>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.delete(url)
    return response.data
  }

  async uploadFile<T = any>(url: string, file: File, fieldName = "file"): Promise<T> {
    const formData = new FormData()
    formData.append(fieldName, file)

    const response: AxiosResponse<T> = await apiClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }

  async downloadFile(url: string, filename: string): Promise<void> {
    const response = await apiClient.get(url, {
      responseType: "blob",
    })

    const blob = new Blob([response.data])
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
}

const apiFactory = new ApiFactory()
export default apiFactory

export { API_ENDPOINTS }
