import React from 'react';
import {Link} from 'react-router-dom'

const PageTitle = (props:any) => {
    const {title="", breadcrumbs =[]} = props
    return (
        <div style={{paddingLeft:'15px'}}>
            <div style={{width:'100%', display:'inline-block'}}>
                <span style={{fontSize:'30px', float:'left'}}>{title}</span>
                <Link to="/favorite" style={{float:'right'}}>Show Favorite</Link>
            </div>
            
            <div className="breadcrumbs" style={{marginTop:'10px'}}>
                <Link to ="/" className="breadcrumbs-item-first">Home</Link>
                {
                    (breadcrumbs.length>0) ?
                        breadcrumbs.map((el:any, i:number) => (
                            <span key={i}>
                                <>&nbsp;/&nbsp;
                                {
                                    (el[1]) ? 
                                    <Link className="breadcrumbs-item" to={el[1]}>{el[0]}</Link>
                                    : <span className="breadcrumbs-item">{el[0]}</span>
                                }
                                </>
                                
                            </span>
                        ))
                    : <>&nbsp;/</>

                }
            </div>
        </div>
    );
}

export default PageTitle;
