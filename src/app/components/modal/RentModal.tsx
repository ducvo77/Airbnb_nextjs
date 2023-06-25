'use client'

import useRentModal from '@/app/hooks/useRentModal'
import Modal from './Modal'
import categories from '@/app/constants/categories'
import { useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useCountries from '@/app/hooks/useCountries'
import Map from '../Map'
import dynamic from 'next/dynamic'
import CoutrySelect from '../input/CoutrySelect'

interface RentModalProps {}

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal: React.FC<RentModalProps> = ({}) => {
  const router = useRouter()
  const rentModal = useRentModal()
  const countries = useCountries()

  const [step, setStep] = useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  )

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  let labelContent = 'Which of the best desribes your place?'
  let descriptionContent = 'Pick a category'
  let bodyContent = (
    <div className="w-full overflow-y-scroll">
      <div className="grid gap-3 grid-cols-2 w-full h-full text-gray-900 font-semibold">
        {categories.map((item, index) => (
          <li
            onClick={() => setCustomValue('category', item.label)}
            key={`item-${index}`}
            className={`${
              item.label === category ? 'border-black' : ''
            } flex flex-col p-3 border-2 rounded-lg gap-2 cursor-pointer hover:border-black justify-center items-center`}
          >
            <item.icon size={20} />
            <span className="text-xs">{item.label}</span>
          </li>
        ))}
      </div>
    </div>
  )
  let footer = <></>

  if (step === STEPS.LOCATION) {
    ;(labelContent = 'Where is your place located?'),
      (descriptionContent = 'Help guests find you?'),
      (bodyContent = (
        <>
          <CoutrySelect
            value={location}
            onChange={(value) => setCustomValue('location', value)}
          />
          <Map center={location?.latlng} />
        </>
      ))
  }
  console.log(location)

  return (
    <Modal
      title="Airbnb your home"
      label={labelContent}
      description={descriptionContent}
      isOpen={rentModal.isOpen}
      body={bodyContent}
      footer={footer}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  )
}

export default RentModal
