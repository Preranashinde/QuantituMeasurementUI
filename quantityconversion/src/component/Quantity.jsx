import React, { Component } from 'react';

class Quantity extends Component {
    constructor() {
        super();
        this.state = {
            quantityType: '',
            quantity:[],
            quantityUnits: [],
            unitType: '',
            OutputUnitType: '',
            path: '',
            outputValue: [],
            values:''
    
        };
    }

    componentDidMount() {
        fetch('http://localhost:8081/quantity')
        .then(res => res.json())
        .then(json => {
            this.setState({
                quantity: json
            })
        })
        fetch('http://localhost:8081/quantity/Length')
        .then(res => res.json())
        .then(json => {
            this.setState({
                quantityUnits: json,
                quantityType: 'Length'
                
            })
        })
    }

        handleChange = (event) => {
        fetch (`http://localhost:8081/quantity/${event.target.value}`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                quantityUnits: json
            })
        })
    
     }

    handleChangeInputUnit = (event) =>{
        this.setState({
            unitType: event.target.value
        })
    }
    handleChangeOutputUnit = (event) =>{
        this.setState({
            OutputUnitType: event.target.value
        })
    }
    handleChangeInput = async(event) => {
        const val = event.target.value 
        await this.setState({
            values: val
        })
        fetch(`http://localhost:8081/quantity/conversion/${this.state.OutputUnitType}`,{
            method: 'POST',
            headers:{
                "Content-Type": "Application/json"
            },
            body:JSON.stringify({"Value": this.state.values, "quantityUnits": this.state.unitType})
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({
                outputValue: json
            })
        })
    }

    render() {
        return (
            <div class="outside">
              <h1>Unit Conversion App</h1>
            <div className="Quantity">
              
                <select onChange={this.handleChange} style={{width:'40%', height:'20px', marginBottom:'20px'}}>
                    {this.state.quantity.map(element => <option>{element}</option>)}
                </select>
                
               <div>
                <input type="text" onChangeCapture={this.handleChangeInput}></input>
                <span>=</span>
                <input value={JSON.stringify(this.state.outputValue)} ></input>
                </div>
               
                
                <div class="flex">
                <select style={{width:'28%', marginTop:'10px'}} onChange={this.handleChangeInputUnit}>{this.state.quantityUnits.map(units => <option>{units}</option>)} </select>
                <span>=</span>
                <select style={{width:'28%', marginTop:'10px'}} onChange={this.handleChangeOutputUnit}>{this.state.quantityUnits.map(units => <option>{units}</option>)}</select>
                </div>
                </div>
                </div>
        );
    }
}
export default Quantity; 
                    
               
