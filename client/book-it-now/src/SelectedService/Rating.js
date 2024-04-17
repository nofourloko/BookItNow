import React, { useEffect, useState } from 'react'

export default function Rating({ratingList}) {
    const [ratingObject, setRatingObject] = useState({
        rating_one : 0,
        rating_two : 0,
        rating_three : 0,
        rating_four: 0,
        rating_five : 0
    })

    const [avg, setAvg] = useState()

   useEffect(() => {
    let sum = 0;

    ratingList.map(item => {
        sum += item.rating
        switch(item.rating){
            case 1:
                ratingObject.rating_one++;
                break;
            case 2:
                ratingObject.rating_two++;
                break;
            case 3:
                ratingObject.rating_three++;
                break;
            case 4:
                ratingObject.rating_four++;
                break;
            case 5:
                ratingObject.rating_five++;
                break;
            default:
                break;
        }
    })

    setAvg(sum / ratingList.rating)
   },[])
  

  return (
    <div>
        <div>
            <p>{avg}</p>
            {/* stars */}
            <p>Na podstawie {ratingList.length} opini</p>
        </div>
        <div>

        </div>
    </div>
  )
}
