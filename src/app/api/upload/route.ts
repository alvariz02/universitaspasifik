import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(request: NextRequest) {
  try {
    console.log('📤 Upload API called')
    
    const formData = await request.formData()
    const file = formData.get('file') as File

    console.log('📁 File received:', { name: file?.name, size: file?.size, type: file?.type })

    if (!file) {
      console.log('❌ No file provided')
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

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

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log('📤 Starting Cloudinary upload...')

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'universitas-pasifik',
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            console.log('❌ Cloudinary upload error:', error)
            reject(error)
          } else {
            console.log('✅ Cloudinary upload success:', result)
            resolve(result)
          }
        }
      ).end(buffer)
    })

    const uploadedFile = result as any

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
