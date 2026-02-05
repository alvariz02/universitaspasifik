'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface StaffDetailsProps {
  open: boolean
  onClose: () => void
  staff?: any
}

export default function StaffDetails({ open, onClose, staff }: StaffDetailsProps) {
  if (!staff) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-4">
          <DialogTitle className="text-lg font-semibold">Detail Staff</DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-3">
          <div>
            <Label className="text-sm">Nama</Label>
            <div className="text-base font-medium">{staff.name}</div>
          </div>

          <div>
            <Label className="text-sm">Slug</Label>
            <div className="text-base">{staff.slug}</div>
          </div>

          <div>
            <Label className="text-sm">Role / Jabatan</Label>
            <div className="text-base">{staff.role || staff.position || '-'}</div>
          </div>

          <div>
            <Label className="text-sm">Fakultas</Label>
            <div className="text-base">{staff.faculty?.name || '-'}</div>
          </div>

          <div>
            <Label className="text-sm">Departemen</Label>
            <div className="text-base">{staff.department?.name || '-'}</div>
          </div>

          <div>
            <Label className="text-sm">Email</Label>
            <div className="text-base">{staff.email || '-'}</div>
          </div>

          <div>
            <Label className="text-sm">Telepon</Label>
            <div className="text-base">{staff.phone || '-'}</div>
          </div>

          <div>
            <Label className="text-sm">Biografi</Label>
            <div className="text-base whitespace-pre-wrap">{staff.bio || '-'}</div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>Tutup</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
