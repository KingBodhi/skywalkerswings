export const money=(c:number)=>Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(c/100);
