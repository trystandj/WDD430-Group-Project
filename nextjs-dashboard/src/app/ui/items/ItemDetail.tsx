import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import './reviews.css'
import { SellerProfile, SellerItem } from '@/app/lib/definitions'
import ReviewsClient from '@/app/components/[reviews]/ReviewsClient'
import ReviewForm from '@/app/components/[reviews]/reviewForm'

export default function ItemDetail({ item, seller }: { item: SellerItem; seller: SellerProfile | null }) {
  return (
    <main className="seller-detail-page item-page-container">
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div className="item-page-main" style={{ flex: '1 1 0' }}>
          <div className="item-header" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <h1 className="seller-profile-name" style={{ margin: 0 }}>{item.title}</h1>
            {seller && (
              <div className="seller-float">
                <div className="seller-compact-card">
                  <Image src={seller.avatarUrl || "/images/spoons.webp"} alt={seller.name} className="seller-profile-avatar" width={40} height={40} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="seller-compact-name">{seller.name}</span>
                    <Link href={`/sellers/${seller.id}`} className="seller-compact-button">View Seller</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href={`/catalog/${item.id}/edit`} className="flex justify-end p-3">
              <button
                className="text-black border border-[var(--primary)] bg-[var(--primary)] px-5 py-1 rounded-md hover:cursor-pointer hover:brightness-80"
              >Edit Item</button>
            </Link>

          <div className="seller-profile-card item-image-wrapper">
            <Image
              src={item.imageUrl}
              alt={item.title}
              className="item-image"
              width={800}
              height={600}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          <div className="items-section" style={{ marginTop: '1rem' }}>
            <h2 className="items-section-title">Item Details</h2>
            <p className="item-description" style={{ marginTop: '0.5rem' }}>{item.description}</p>
            <p className="item-price" style={{ marginTop: '0.5rem', fontWeight: 700, textAlign: 'center' }}>Price: ${item.price.toFixed(2)}</p>
            {seller && (
              <div className="seller-below" style={{ marginTop: '0.75rem' }}>
                <Link href={`/sellers/${seller.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Image src={seller.avatarUrl ?? '/images/spoons.webp'} alt={seller.name} className="seller-profile-avatar" width={40} height={40} />
                  <span className="seller-compact-name">{seller.name}</span>
                </Link>
              </div>
            )}
          </div>

          <div className="leave-review-section" style={{ marginTop: '2rem' }}>
            <ReviewForm productId={String(item.id)} itemId={item.id} sellerId={seller?.id} />
          </div>

          <hr className="reviews-divider" />

          <div className="reviews-section">
            <ReviewsClient productId={String(item.id)} itemId={item.id} />
          </div>
        </div>

      </div>

    </main>
  )
}