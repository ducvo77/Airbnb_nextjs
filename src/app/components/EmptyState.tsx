'use client'

import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'

interface EmptyStateProps {
  title?: string
  subTitle?: string
  showReset?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subTitle = 'Try changing or removing some of your filters.',
  showReset,
}) => {
  const router = useRouter()
  return (
    <div className="flex h-[60vh] m-auto">
      <div className="m-auto text-center flex flex-col gap-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        <span className="text-sm text-gray-700">{subTitle}</span>
        {showReset && (
          <Button
            variant="outlined"
            className="mx-10 border-black border-2 text-black text-xs"
            onClick={() => router.push('/')}
          >
            Remove all filters
          </Button>
        )}
      </div>
    </div>
  )
}

export default EmptyState
