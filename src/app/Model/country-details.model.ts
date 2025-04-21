
  
  export interface CountryDetail {
    id: number;
    name: string;
    description: string;
  }

  export interface FilterState{
 
        destination:string;
        price:string;
        type:string;
        duration:string;
  
}

export const initialFilterState:FilterState={
   
        destination:'',
        price:'',
        type:'',
        duration:'',
  
}

