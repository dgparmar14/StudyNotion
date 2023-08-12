export const formatdate = (dateString)=>{
   const options = {
        month:"long",
        day:"numeric",
        year:"numeric"
    };
    const date = new Date(dateString);
    const dateFormat = date.toLocaleDateString("en-US", options);

    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    const formatedTime = `${hour % 12} ${minute.toString().padStart(2, "0")} ${period}`;
    return `${dateFormat} | ${formatedTime}`;
}