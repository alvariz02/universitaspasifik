'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Facebook, Twitter, MessageCircle, Link2, Check } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ShareButtonProps {
  title: string
  url: string
  description?: string
}

export default function ShareButton({ title, url, description }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : url

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'text-sky-500'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`,
      color: 'text-green-600'
    },
    {
      name: 'Copy Link',
      icon: copied ? Check : Link2,
      url: '#',
      color: copied ? 'text-green-600' : 'text-gray-600',
      action: () => handleCopyLink()
    }
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = (link: typeof shareLinks[0]) => {
    if (link.action) {
      link.action()
    } else {
      window.open(link.url, '_blank', 'width=600,height=400')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Bagikan
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {shareLinks.map((link) => {
          const Icon = link.icon
          return (
            <DropdownMenuItem
              key={link.name}
              onClick={() => handleShare(link)}
              className="cursor-pointer"
            >
              <Icon className={`h-4 w-4 mr-2 ${link.color}`} />
              {copied && link.name === 'Copy Link' ? 'Tersalin!' : link.name}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
