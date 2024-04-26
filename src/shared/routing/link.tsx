export interface ILink {
    to: string,
    children?: any,
    persistent?: boolean,
    back?: boolean,
}
export const Link = ({ to, children, persistent, back }: ILink) => { 
    const handleClick = (event: any) => { 
      event.preventDefault();
      if (back) {
        history.back();
      }
      else if (persistent) {
        history.replaceState(null, '', to);
      } else {
      history.pushState(null, '', to);
    }
      window.dispatchEvent(new Event('popstate')); 
    }; 
   
    return ( 
      <a style='text-decoration: none' href={to} onClick={handleClick}> 
        {children} 
      </a> 
    ); 
  };