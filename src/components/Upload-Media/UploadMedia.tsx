import React, { useState } from 'react'
import type { UploadFile, UploadProps } from 'antd'
import { message, Upload, Button } from 'antd'
import { InboxOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons'

import { UploadMediaProps } from './UploadMedia.type'

const UploadMedia: React.FC<UploadMediaProps> = ({
  maxFiles = 5,
  maxSize = 10,
  multiple = true,
  onChange,
  value,
  buttonStyle = false,
  accept = '.jpg,.png,.svg,.zip',
  title = 'Media Upload',
  subTitle = `Add your documents here, and you can upload up to ${maxFiles} files max`,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(value || [])

  const props: UploadProps = {
    name: 'file',
    multiple,
    fileList: fileList,
    accept: accept,

    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        if (onSuccess) {
          onSuccess('ok')
        }
      }, 100)
    },
    beforeUpload: (file) => {
      const isLessThanMaxSize = file.size / 1024 / 1024 < maxSize
      if (!isLessThanMaxSize) {
        message.error(`File must be smaller than ${maxSize}MB!`)
        return Upload.LIST_IGNORE
      }

      if (fileList.length >= maxFiles) {
        message.error(`You can only upload a maximum of ${maxFiles} files!`)
        return Upload.LIST_IGNORE
      }

      return true
    },
    onChange(info) {
      const { status } = info.file

      setFileList(info.fileList.slice(0, maxFiles))

      if (onChange) {
        onChange(info.fileList.slice(0, maxFiles))
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },

    listType: 'picture',
    onPreview: async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as File)
      }

      const image = new Image()
      image.src = file.url || file.preview || ''

      const imgWindow = window.open(file.url || file.preview)
      imgWindow?.document.write(image.outerHTML)
    },
  }

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  if (buttonStyle) {
    return (
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File{multiple ? 's' : ''}</Button>
        <p className='mt-2 text-xs text-gray-500'>
          Max {maxFiles} file{maxFiles > 1 ? 's' : ''}, up to {maxSize}MB each. Only{' '}
          {accept.replace(/\./g, '')} files are allowed.
        </p>
      </Upload>
    )
  }

  return (
    <div className='relative rounded-md border border-solid border-[#d9d9d9] p-4'>
      <div className='mb-2 flex items-center justify-between'>
        <div>
          <h3 className='text-base font-medium'>{title}</h3>
          <p className='text-sm text-gray-500'>{subTitle}</p>
        </div>
        <button
          className='text-gray-500 hover:text-gray-700'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (onChange) {
              onChange([])
            }
            setFileList([])
          }}
        >
          <CloseOutlined />
        </button>
      </div>

      <Upload.Dragger {...props} className='bg-white' height={200}>
        <div className='flex flex-col items-center justify-center py-6'>
          <p className='ant-upload-drag-icon text-blue-500'>
            <InboxOutlined style={{ fontSize: '32px' }} />
          </p>
          <p className='ant-upload-text font-medium'>
            Drag your file(s) or <span className='text-blue-500'>browse</span>
          </p>
          <p className='ant-upload-hint text-sm text-gray-400'>
            Max {maxFiles} MB files are allowed
          </p>
          <p className='mt-4 text-xs text-gray-400'>
            Only support {accept.replace(/\./g, ', ').replace(/^, /, '')} files
          </p>
        </div>
      </Upload.Dragger>
    </div>
  )
}

export default UploadMedia
