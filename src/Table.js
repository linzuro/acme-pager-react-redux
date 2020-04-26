import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

class Table extends Component{
    constructor(){
        super()
        this.state={
            users:[],
            count:0
        }
    }
    async componentDidMount() {
        const hash = this.props.match.params.page
        const userData = (await axios.get(`/api/employees/${hash-1}`)).data 
        this.setState({users: userData.rows, count: userData.count})
    
    }
    async componentDidUpdate(prevProps){
        const hash = this.props.match.params.page
        if(prevProps.match.params.page!==hash){
            const userData = (await axios.get(`/api/employees/${hash-1}`)).data 
        this.setState({users: userData.rows, count: userData.count})
        }
        
    }
    render(){
        const hash = parseInt(this.props.match.params.page)
        const {users,count} = this.state
        const max = Math.ceil(count/50)
        const pages = Array(max).fill().map((item,idx)=>idx+1)
        return  <div id='pageContainer'>
                    <div id='tableHeaderContainer'>
                    <table className='table-striped table-bordered table' id="productSizes" style={{height:'300px', justifyContet:'center'}}>
                            <thead className='thead-dark'>
                            <tr className="d-flex">
                                {['First Name','Last Name', 'Email', 'Title'].map(header=>{
                                    return <th key={header} className="col-3">{header}</th>
                                })}
                            </tr>
                            </thead>
                    </table>
                    </div>
                    <div id='tableContainer' style={{height:'300px', justifyContet:'center'}}>
                        <table className='table-striped table-bordered table' id="productSizes" style={{height:'300px', justifyContet:'center'}}>
                            <tbody>
                                {users.length ? 
                                users.map(user=>{
                                    return  <tr key={user.email} className="d-flex" >
                                                {['firstName','lastName','email','title'].map(key=>{
                                                    return <td key={user[key]} className="col-3">{user[key]}</td>
                                                })}
                                            </tr>
                                })
                                : ''}
                            </tbody>
                        </table>
                    </div>
                    <div id='tableFooterContainer' style={{height:'300px', justifyContet:'center'}}>
                    <table id="productSizes">
                        <tbody className="d-flex">
                            <tr className="d-flex">
                                <td key='prev' id='pageNumber'><Link to={hash===1 ? `/${hash}` : `/${hash-1}`}>Prev</Link></td>
                                {pages.map(item=>{
                                    return <td key={item} style={{justifyContent:'center'}} className="col-2" id='pageNumber' className={item===hash ? 'selected' : ''}>
                                                <Link to={`${item}`}>
                                                    {item}
                                                </Link>
                                            </td>
                                })
                                }
                               <td key='next' id='pageNumber'>{<Link to={hash===max ? `/${hash}` : `/${hash+1}`}>Next</Link>}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
    }
}

export default Table