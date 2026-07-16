'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface ContactDetailsProps {
  open: boolean
  onClose: () => void
  submission?: any
  onStatusChange?: (id: number, status: string) => void
}

export default function ContactDetails({ open, onClose, submission, onStatusChange }: ContactDetailsProps) {
  if (!submission) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-unipas-primary/10 shadow-xl">
        <DialogHeader className="p-4">
          <DialogTitle className="text-lg font-semibold">Detail Pesan Kontak</DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-sm">Nama</Label>
              <div className="text-base font-medium text-unipas-primary">{submission.name || '-'}</div>
            </div>
            <div>
              <Label className="text-sm">Email</Label>
              <div className="text-base text-unipas-primary">{submission.email || '-'}</div>
            </div>
            <div>
              <Label className="text-sm">Telepon</Label>
              <div className="text-base text-unipas-primary">{submission.phone || '-'}</div>
            </div>
            <div>
              <Label className="text-sm">Status</Label>
              <div className="text-base text-unipas-primary capitalize">{submission.status || '-'}</div>
            </div>
          </div>

          <div>
            <Label className="text-sm">Subjek</Label>
            <div className="text-base text-unipas-primary">{submission.subject || '-'}</div>
          </div>

          <div>
            <Label className="text-sm">Pesan</Label>
            <div className="whitespace-pre-wrap rounded-xl border border-unipas-primary/10 bg-unipas-muted p-4 text-unipas-text">
              {submission.message || '-'}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-sm">Tanggal Masuk</Label>
              <div className="text-base text-unipas-primary">
                {submission.createdAt ? new Date(submission.createdAt).toLocaleString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : '-'}
              </div>
            </div>
            <div>
              <Label className="text-sm">ID Pesan</Label>
              <div className="text-base font-mono text-unipas-primary">#{submission.id}</div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {onStatusChange && submission.status !== 'replied' && (
              <Button
                variant="secondary"
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => onStatusChange(submission.id, 'replied')}
              >
                Tandai Dijawab
              </Button>
            )}
            {onStatusChange && submission.status !== 'closed' && (
              <Button
                variant="secondary"
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={() => onStatusChange(submission.id, 'closed')}
              >
                Tandai Ditutup
              </Button>
            )}
            <Button onClick={onClose} className="sm:col-span-1">
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
