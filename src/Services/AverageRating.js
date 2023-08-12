
export const averageRating = (ratingArr)=>{
    
    if(ratingArr.length!=0){
        let totalCount = 0;
        ratingArr.forEach(ratingElement => {
            totalCount+=ratingElement.rating    
        });

    
        const ratingAverage = totalCount / ratingArr.length
        return ratingAverage;
    }
    return 0;

}