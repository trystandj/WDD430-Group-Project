import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ReviewList from '@/app/components/[reviews]/reviewList'
import ReviewSummary from '@/app/components/[reviews]/reviewSummary'

describe('review components', () => {
  it('ReviewList renders no reviews message', () => {
    render(<ReviewList reviews={[]} />)
    expect(screen.getByText(/No reviews yet/i)).toBeInTheDocument()
  })

  it('ReviewSummary renders average', () => {
    render(<ReviewSummary reviews={[{ rating: 5 }, { rating: 3 }]} />)
    expect(screen.getByText(/Review/)).toBeInTheDocument()
    expect(screen.getByText(/4.0/)).toBeInTheDocument()
  })
})
