export const isValidNumber=(number)=>{
   const re = /^[0-9]+$/
   if(number === '') return true;
   return re.test(number)
};
