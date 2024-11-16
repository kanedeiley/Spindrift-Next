export interface SearchQuery {
    query: string ,
    page: number
 }
 
 export interface SectionLink{
pagename: string,
link: string
 }

export interface ChartDataItem {
    date: string;
    wave_height: number;
    wind: number;
  };