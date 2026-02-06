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

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      const fileUrl = data.url

      onChange(fileUrl)
      setPreview(fileUrl)
    } catch (error) {
      console.error('Upload error:', error)
      setError('Gagal mengupload file')
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
    onChange(url)
    setPreview(url)
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <Label>Upload Gambar</Label>
      
      {/* Preview */}
      {preview && (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/90 hover:bg-white"
            >
              <Upload className="h-4 w-4 mr-1" />
              Ganti
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
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
          className="flex items-center gap-2"
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

      {/* URL Input (fallback) - hanya tampilkan jika belum ada preview */}
      {!preview && (
        <div className="space-y-2">
          <Label htmlFor="imageUrl" className="text-sm text-muted-foreground">
            Atau masukkan URL gambar:
          </Label>
          <Input
            id="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={value || ""}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
