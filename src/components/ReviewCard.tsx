import Image from "next/image";

import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

type CustomerType = {
  id: string;
  fullName: string;
  username: string;
}

// const ReviewCard = async ({ productId }: { productId: string }) => {
const ReviewCard = ({
  id,
  customer,
  heading,
  body,
  rating,
  createdAt
}: {
  id: string;
  customer: CustomerType;
  heading: string;
  body: string;
  rating: number;
  createdAt: string;
}) => {

  return (
    <div key={id} className="flex flex-col items-start justify-center gap-4 bg-white p-5 rounded-md text-gray-800 w-[375px] shrink-0">
      {/* STARS */}
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-2 items-center justify-center">
          <span className="text-sm font-medium">{rating % 1 !== 0 ? rating : `${rating}.0`}</span>
          {Array.from({ length: rating }).map((_, index) => (
            <FaStar key={index} className="text-lg text-violet-500" />
          ))}
          {rating % 1 !== 0 && <FaStarHalfAlt className="text-lg text-violet-500" />}
        </div>
        <span className="text-gray-500 text-sm font-light">{createdAt}</span>
      </div>
      {/* DESC */}
      {heading && <h2 className="font-semibold text-base">{heading}</h2>}
      {body && <p className="text-gray-600 font-normal text-sm">{body}</p>}
      {/* <div className="">
        {review.media.map((media: any) => (
          <Image
            src={media.url}
            key={media.id}
            alt=""
            width={100}
            height={50}
            className="object-cover"
          />
        ))}
      </div> */}
      {/* USER */}
      <div className="flex items-center gap-3 font-normal text-sm">
        <Image
          src="/avatar/user-avatar.png"
          alt=""
          width={28}
          height={28}
          className="rounded-full"
        />
        <span>{customer.fullName}</span>
      </div>
    </div>
  );
};

export default ReviewCard;