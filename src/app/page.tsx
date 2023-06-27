import * as React from 'react'
import ClientOnly from './components/ClientOnly'
import EmptyState from './components/EmptyState'
import getListings from './actions/getListings'
import ListingCard from './components/listings/ListingCard'
import getCurrentUser from './actions/getCurrentUser'

export interface PageProps {}

export default async function Page(props: PageProps) {
  const listings = await getListings()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <div className="grid grid-cols-5 gap-8 w-full h-[1000px] z-1">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </ClientOnly>
  )
}
