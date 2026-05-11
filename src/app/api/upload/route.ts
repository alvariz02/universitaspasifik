import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(request: NextRequest) {
  try {
    console.log('📤 Upload API called')
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const imageUrl = formData.get('imageUrl') as string

    console.log('📁 Input received:', { 
      hasFile: !!file, 
      fileName: file?.name, 
      fileSize: file?.size,
      hasImageUrl: !!imageUrl 
    })

    if (!file && !imageUrl) {
      console.log('❌ No file or URL provided')
      return NextResponse.json(
        { error: 'No file or image URL provided' },
        { status: 400 }
      )
    }

    // Handle file upload (existing logic)
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.log('❌ Invalid file type:', file.type)
        return NextResponse.json(
          { error: 'Only image files are allowed' },
          { status: 400 }
        )
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        console.log('❌ File too large:', file.size)
        return NextResponse.json(
          { error: 'File size must be less than 5MB' },
          { status: 400 }
        )
      }
    }

    // Check Cloudinary credentials
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    console.log('🔑 Cloudinary creds:', { 
      hasCloudName: !!cloudName, 
      hasApiKey: !!apiKey, 
      hasApiSecret: !!apiSecret 
    })

    if (!cloudName || !apiKey || !apiSecret) {
      console.log('❌ Missing Cloudinary credentials')
      return NextResponse.json(
        { error: 'Cloudinary credentials not configured' },
        { status: 500 }
      )
    }

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    })

    console.log('⚙️ Cloudinary configured')

    let uploadedFile: any

    // Handle URL upload (Facebook and other restricted URLs need server-side download first)
    if (imageUrl) {
      console.log('📤 Processing URL:', imageUrl)
      try {
        // Detect if URL is from restricted domain (Facebook, Instagram, etc.)
        const isRestrictedDomain = /facebook\.com|fb\.cdn|instagram\.com|ig\.cdn/i.test(imageUrl)
        
        if (isRestrictedDomain) {
          console.log('🔒 Detected restricted domain, downloading server-side...')
          
          // Download image from restricted URL (bypass CORS by doing it server-side)
          const response = await fetch(imageUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          })
          
          if (!response.ok) {
            throw new Error(`Failed to download image: ${response.status}`)
          }
          
          const arrayBuffer = await response.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          
          console.log('📥 Downloaded', buffer.length, 'bytes')
          
          // Upload buffer to Cloudinary
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                resource_type: 'image',
                folder: 'universitas-pasifik/hero-sliders',
                use_filename: true,
                unique_filename: true,
                overwrite: false,
              },
              (error, result) => {
                if (error) reject(error)
                else if (!result) reject(new Error('No result'))
                else resolve(result)
              }
            )
            uploadStream.end(buffer)
          })
          
          uploadedFile = result
        } else {
          // Direct upload for non-restricted URLs
          console.log('📤 Direct upload to Cloudinary:', imageUrl)
          const result = await cloudinary.uploader.upload(imageUrl, {
            resource_type: 'image',
            folder: 'universitas-pasifik/hero-sliders',
            use_filename: true,
            unique_filename: true,
            overwrite: false,
          })
          uploadedFile = result
        }
        
        console.log('✅ URL upload success:', {
          public_id: uploadedFile.public_id,
          url: uploadedFile.secure_url
        })
      } catch (error) {
        console.log('❌ URL upload error:', error)
        return NextResponse.json(
          { error: 'Failed to upload image from URL', details: error instanceof Error ? error.message : 'Unknown error' },
          { status: 500 }
        )
      }
    } else if (file) {
      // Handle file upload
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      console.log('📤 Starting Cloudinary upload...')
      console.log('📤 Uploading to Cloudinary folder: universitas-pasifik/hero-sliders')
      
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'universitas-pasifik/hero-sliders',
            use_filename: true,
            unique_filename: true,
            overwrite: false,
          },
          (error, result) => {
            if (error) {
              console.log('❌ Cloudinary upload error:', error)
              reject(new Error(`Cloudinary error: ${error.message}`))
            } else if (!result) {
              console.log('❌ Cloudinary returned null result')
              reject(new Error('Cloudinary returned null result'))
            } else {
              console.log('✅ Cloudinary upload success:', {
                public_id: result.public_id,
                url: result.secure_url
              })
              resolve(result)
            }
          }
        )
        
        uploadStream.on('error', (err) => {
          console.log('❌ Stream error:', err)
          reject(new Error(`Stream error: ${err.message}`))
        })
        
        uploadStream.end(buffer)
      })
      
      uploadedFile = result
    }

    console.log('🔗 Uploaded file details:', {
      secure_url: uploadedFile.secure_url,
      public_id: uploadedFile.public_id,
      format: uploadedFile.format,
      size: uploadedFile.bytes
    })

    const response = { 
      success: true,
      url: uploadedFile.secure_url,
      filename: uploadedFile.public_id
    }

    console.log('📤 Sending response:', response)

    return NextResponse.json(response)

  } catch (error) {
    console.error('🚨 Upload API error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
