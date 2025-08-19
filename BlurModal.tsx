// components/BlurModal.tsx
import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BlurModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export default function BlurModal({ open, onClose, children }: BlurModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40"
          />
          <motion.div
            key="modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
