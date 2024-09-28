'use client'

import { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useNotificationStore } from '../../store'

interface NotificationProps {
  message?: string
}

export default function Notification({
  message = "The product has been successfully saved to your cart.",
}: NotificationProps) {
  const [show, setShow] = useState(false)
  const { notifications, removeNotification } = useNotificationStore()
  const currentNotification = {
    id: notifications[0]?.id ?? '',
    message: notifications[0]?.message ?? message,
    type: notifications[0]?.type ?? 'success'
  }

  useEffect(() => {
    if (notifications.length > 0) {
      setShow(true)
    }
  }, [notifications])

  useEffect(() => {
    const onClose = () => {
      setShow(false)
      setTimeout(() => {
        removeNotification(currentNotification.id)
      }, 300)
    }

    if (show) {
      setTimeout(() => {
        onClose()
      }, 3000)
    }
  }, [currentNotification.id, removeNotification, show])

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 lg:mt-20"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition show={show}>
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {currentNotification.type === 'success' && <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />}
                  {currentNotification.type === 'error' && <XCircleIcon aria-hidden="true" className="h-6 w-6 text-red-400" />}
                  {currentNotification.type === 'info' && <InformationCircleIcon aria-hidden="true" className="h-6 w-6 text-blue-400" />}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">
                    {currentNotification.type === 'success' && 'Successfully saved!'}
                    {currentNotification.type === 'error' && 'Error'}
                    {currentNotification.type === 'info' && 'Information'}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{currentNotification.message}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setShow(false)
                    }}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}
