import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BOOKABLE, isBookable } from '../domain/services'
import { draftStore } from '../infrastructure/stores'

export function useQuickBooking() {
  const navigate = useNavigate()
  const [saved] = useState(() => draftStore.load())
  const [serviceId, setServiceId] = useState(() => saved.serviceIds.find(isBookable) ?? BOOKABLE[0]?.id ?? '')
  const [date, setDate] = useState(saved.preferredDate ?? '')
  const [zip, setZip] = useState(saved.contact.zip)
  const [phone, setPhone] = useState(saved.contact.phone)

  const selectService = (id: string) => {
    if (isBookable(id)) setServiceId(id)
  }

  const continueBooking = () => {
    if (!isBookable(serviceId)) return
    const current = draftStore.load()
    draftStore.save({
      ...current,
      serviceIds: [...new Set([...current.serviceIds.filter(isBookable), serviceId])],
      preferredDate: date || null,
      contact: { ...current.contact, zip, phone }
    })
    navigate('/book')
  }

  return { serviceId, selectService, date, setDate, zip, setZip, phone, setPhone, continueBooking }
}

export type QuickBookingController = ReturnType<typeof useQuickBooking>
