import { CheckCircle2, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface NotificationProps {
  message: string
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  type?: 'success' | 'error'
  duration?: number
  showConfirm?: boolean
}

export function Notification({
  message,
  isOpen,
  onClose,
  onConfirm,
  type = 'success',
  duration = 5000,
  showConfirm = false,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      if (!showConfirm) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          onClose()
        }, duration)
        return () => clearTimeout(timer)
      }
    }
  }, [isOpen, duration, onClose, showConfirm])

  if (!isOpen) return null

  const handleConfirm = () => {
    setIsVisible(false)
    onClose()
    onConfirm?.()
  }

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 transform transition-all duration-500 ease-in-out',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-3 border min-w-[320px]">
        <div className="flex items-center gap-3">
          {type === 'success' && (
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
          )}
          <p className="text-sm text-gray-700 flex-grow">{message}</p>
          {!showConfirm && (
            <button
              onClick={() => {
                setIsVisible(false)
                onClose()
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {showConfirm && (
          <div className="flex justify-end">
            <Button
              variant="default"
              size="sm"
              onClick={handleConfirm}
            >
              OK
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 