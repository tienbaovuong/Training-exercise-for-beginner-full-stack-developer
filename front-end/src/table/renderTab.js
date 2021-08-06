import '../index.css';
import '../home.css';
import {
    Link
} from "react-router-dom";
export default function RenderTab({current,limit,numPage}){
    if(current!==1) {
        current--;
    }
    else{
        limit--;
    }
    if(limit===4)
    return(
        <div>
        <Link to= "/1"><button>{"<<"}</button></Link>
        <Link to= {`/${current}`}><button>{current}</button></Link>
        <Link to= {`/${current+1}`}><button>{current+1}</button></Link>
        <Link to= {`/${current+2}`}><button>{current+2}</button></Link>
        <Link to= {`/${current+3}`}><button>{current+3}</button></Link>
        <Link to= {`/${current+4}`}><button>{current+4}</button></Link>
        <Link to= {`/${numPage}`}><button>{">>"}</button></Link>
        </div>
    )
    if(limit===3)
    return(
        <div>
        <Link to= "/1"><button>{"<<"}</button></Link>
        <Link to= {`/${current}`}><button>{current}</button></Link>
        <Link to= {`/${current+1}`}><button>{current+1}</button></Link>
        <Link to= {`/${current+2}`}><button>{current+2}</button></Link>
        <Link to= {`/${current+3}`}><button>{current+3}</button></Link>
        <Link to= {`/${numPage}`}><button>{">>"}</button></Link>
        </div>
    )
    if(limit===2)
    return(
        <div>
        <Link to= "/1"><button>{"<<"}</button></Link>
        <Link to= {`/${current}`}><button>{current}</button></Link>
        <Link to= {`/${current+1}`}><button>{current+1}</button></Link>
        <Link to= {`/${current+2}`}><button>{current+2}</button></Link>
        <Link to= {`/${numPage}`}><button>{">>"}</button></Link>
        </div>
    )
    if(limit===1)
    return(
        <div>
        <Link to= "/1"><button>{"<<"}</button></Link>
        <Link to= {`/${current}`}><button>{current}</button></Link>
        <Link to= {`/${current+1}`}><button>{current+1}</button></Link>
        <Link to= {`/${numPage}`}><button>{">>"}</button></Link>
        </div>
    )
    if(limit===0)
    return(
        <div>
        <Link to= "/1"><button>{"<<"}</button></Link>
        <Link to= {`/${current}`}><button>{current}</button></Link>
        <Link to= {`/${numPage}`}><button>{">>"}</button></Link>
        </div>
    )
}