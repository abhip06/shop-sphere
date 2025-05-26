"use client"

import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';

const reviews = [
  {
    id: "jfsdk98j12345",
    customer: {
      id: "jkwdjkfd",
      fullName: "John Doe",
      username: "johndoe_001",
    },
    heading: "Nice Service",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, aspernatur quis similique quas ut veritatis beatae maiores.",
    rating: 4.4,
    createdAt: "10 May 2024",
  },
  {
    id: "pmttnassj12345",
    customer: {
      id: "jkwdjkfd",
      fullName: "John Doe",
      username: "johndoe_001",
    },
    heading: "Fast Delivery",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, aspernatur quis similique quas ut veritatis beatae maiores.",
    rating: 4.5,
    createdAt: "14 Aprip 2024",
  },
  {
    id: "uwecoidj45465",
    customer: {
      id: "jkwdjkfd",
      fullName: "John Doe",
      username: "johndoe_001",
    },
    heading: "Trendy Products",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, aspernatur quis similique quas ut veritatis beatae maiores.",
    rating: 4.8,
    createdAt: "25 May 2024",
  },
  {
    id: "jfjjguij12785",
    customer: {
      id: "jkwdjkfd",
      fullName: "John Doe",
      username: "johndoe_001",
    },
    heading: "Value for Money Products",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, aspernatur quis similique quas ut veritatis beatae maiores.",
    rating: 5,
    createdAt: "10 May 2024",
  },
  {
    id: "uwecoid78fghi465",
    customer: {
      id: "jkwdjkfd",
      fullName: "John Doe",
      username: "johndoe_001",
    },
    heading: "Best Deal",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, aspernatur quis similique quas ut veritatis beatae maiores.",
    rating: 4.8,
    createdAt: "11 June 2024",
  },
  {
    id: "upzwyoidj45465",
    customer: {
      id: "jkwdjkfd",
      fullName: "John Doe",
      username: "johndoe_001",
    },
    heading: "Fabulous Stroe",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, aspernatur quis similique quas ut veritatis beatae maiores.",
    rating: 5,
    createdAt: "20 June 2024",
  },
];

const ReviewCarousel = () => {

  return (
    <div className="w-full mt-8 bg-gray-800 py-20 px-4 md:px-8">
      <div
        className="overflow-hidden w-full flex flex-col gap-16"
      >
        <div className="flex justify-end items-center gap-7 w-full moveCardsRight">
        {
          reviews.map((review: any) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              customer={review.customer}
              heading={review.heading}
              body={review.body}
              rating={review.rating}
              createdAt={review.createdAt}
            />
          ))
        }
        </div>
        <div className="flex justify-start items-center gap-7 w-full moveCardsLeft">
        {
          reviews.map((review: any) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              customer={review.customer}
              heading={review.heading}
              body={review.body}
              rating={review.rating}
              createdAt={review.createdAt}
            />
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default ReviewCarousel