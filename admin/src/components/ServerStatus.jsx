import React, { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const ServerStatus = () => {
  const [status, setStatus] = useState('checking')
  const [message, setMessage] = useState('Checking server status...')

  useEffect(() => {
    checkServerStatus()
  }, [])

  const checkServerStatus = async () => {
    try {
      const response = await fetch('/api/public/media.php?limit=1')

      if (response.ok) {
        setStatus('online')
        setMessage('Server is online and ready')
        return
      }

      if (response.status >= 500) {
        setStatus('error')
        setMessage('Server is reachable, but the API returned an internal error.')
        return
      }

      if (response.status === 404) {
        setStatus('error')
        setMessage('Server is running, but the login API route is missing.')
        return
      }

      setStatus('error')
      setMessage(`Server is reachable, but login API returned status ${response.status}.`)
    } catch (error) {
      setStatus('offline')
      setMessage('Server is offline. Please start XAMPP Apache.')
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'offline':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'offline':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'error':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  if (status === 'online') return null

  return (
    <div className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${getStatusColor()}`}>
      {getStatusIcon()}
      <div>
        <p className="font-medium">{message}</p>
        {status === 'offline' && (
          <p className="text-sm mt-1">
            1. Open XAMPP Control Panel<br/>
            2. Start Apache service<br/>
            3. Refresh this page
          </p>
        )}
      </div>
    </div>
  )
}

export default ServerStatus
