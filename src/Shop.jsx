import { useEffect, useState } from 'react';
import './Shop.css';
import axios from 'axios';
function Item(props){
    return (<div key={props.id} onClick={()=>props.callback(props)}>
        <img src={props.img} width={200} height={200}/><br/>
        id: {props.id} <br/>
        name: {props.name}<br/>
        price: {props.price}<br/>
    </div>);
}
export default function Shop(){
    const [products,setProducts]=useState([]);
    const URL="https://ideal-winner-g4q54jrjg67rfw9jj-5000.app.github.dev";
    useEffect(()=>{
        axios.get(URL+'/api/products')
        .then(response=>{
            setProducts(response.data);
        })
        .catch(error=>{
            console.log("error");
        });
    }
    ,[]);
    const [cart,setCart] = useState([]);
    function addCart(item){
        setCart([...cart,{id:item.id,name:item.name,price:item.price,img:item.img}])
    }
    function resetCart(){
        setCart([]);
    }
    const productsList=products.map(item=><Item {...item} callback={addCart}/>)
    const cartList=cart.map((item,index)=><li>{item.id} {item.name} {item.price}
        <button onClick={()=>{
            console.log(index)
            setCart(cart.filter((i,_index)=>index!=_index))
        }}>delete</button>
    </li>)    
    let total=0;
    for(let i=0;i<cart.length;i++) total+=cart[i].price;    
    return (
        <>
            <div className="grid-container">
                {productsList}
            </div>
            <h1>Cart</h1>
            <ol>{cartList}</ol>
            <button onClick={resetCart}>RESET</button>
            <h1>Total = {total}</h1>
        </>
    );
}