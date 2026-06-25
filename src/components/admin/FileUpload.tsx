'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface FileUploadProps {
  value?: string
  onChange: (url: string) => void
  accept?: string
  maxSize?: number // in MB
  className?: string
}

export default function FileUpload({ 
  value, 
  onChange, 
  accept = "image/*", 
  maxSize = 5,
  className = "" 
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string>(value || "")
  const [error, setError] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    console.log('📁 FileUpload component file:', { name: file.name, size: file.size, type: file.type })

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Ukuran file maksimal ${maxSize}MB`)
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Hanya file gambar yang diperbolehkan')
      return
    }

    setIsUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log('📤 Sending to /api/upload...')

      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/upload`, {
        method: 'POST',
        body: formData,
      })

      console.log('📡 API response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.log('❌ API error response:', errorData)
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ Upload success:', data)
      
      if (!data.url) {
        console.log('❌ No URL in response:', data)
        throw new Error('Upload successful but no URL returned')
      }
      
      const fileUrl = data.url

      onChange(fileUrl)
      setPreview(fileUrl)
    } catch (error) {
      console.error('🚨 Upload error:', error)
      setError('Gagal mengupload file: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange("")
    setPreview("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUrlChange = (url: string) => {
    // Just update preview, don't upload yet
    setPreview(url)
  }

  const uploadUrlToCloudinary = async (url: string) => {
    if (!url || !url.startsWith('http')) {
      setError('URL tidak valid')
      return
    }

    setIsUploading(true)
    setError('')

    try {
      console.log('📤 Uploading URL to Cloudinary:', url)

      const formData = new FormData()
      formData.append('imageUrl', url)

      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/upload`, {
        method: 'POST',
        body: formData,
      })

      console.log('📡 API response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.log('❌ API error response:', errorData)
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ URL upload success:', data)

      if (!data.url) {
        console.log('❌ No URL in response:', data)
        throw new Error('Upload successful but no URL returned')
      }

      // Update with Cloudinary URL
      onChange(data.url)
      setPreview(data.url)
    } catch (error) {
      console.error('🚨 URL upload error:', error)
      setError('Gagal mengupload URL: ' + (error instanceof Error ? error.message : 'Unknown error'))
      // Still save the original URL as fallback
      onChange(url)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-base font-semibold">Upload Gambar</Label>
      
      {/* Preview */}
      {preview && (
        <div className="relative group">
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white shadow-md hover:bg-gray-50"
            >
              <Upload className="h-4 w-4 mr-1" />
              Ganti
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="shadow-md"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* File Upload */}
      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 h-10 px-4 border-2"
        >
          {isUploading ? (
            <>Mengupload...</>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Pilih File
            </>
          )}
        </Button>
        <span className="text-sm text-muted-foreground">
          Maksimal {maxSize}MB
        </span>
      </div>

      {/* URL Input with Upload Button */}
      {!preview && (
        <div className="space-y-3">
          <Label htmlFor="imageUrl" className="text-sm font-medium text-muted-foreground">
            Atau masukkan URL gambar:
          </Label>
          <div className="flex gap-2">
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={value || ""}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="flex-1 h-10"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => uploadUrlToCloudinary(value || '')}
              disabled={isUploading || !value}
              className="whitespace-nowrap h-10 px-4 border-2"
            >
              {isUploading ? 'Mengupload...' : 'Upload URL'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            URL akan diupload ke Cloudinary untuk penyimpanan yang lebih aman
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  )
}
