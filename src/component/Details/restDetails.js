
import React, { Component } from "react";
import "./details.css"
import axios from "axios"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MenuDisplay from "./menuDisplay";
import Header from "../Header"

const detailUrl = "https://xomatoapsapi.herokuapp.com/restaurants"
const menuUrl = "https://xomatoapsapi.herokuapp.com/menu"

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: '',
            menulist: '',
            userItems: '',
           
        }
    }
    addToCard = (data) => {
        this.setState({ userItems: data })
    }

    proceed = () => {
        sessionStorage.setItem('menu', this.state.userItems)
        this.props.history.push(`/placeOrder/${this.state.details.restaurant_name}`)
    }
   

    render() {
        const { details } = this.state
        return (
            <>
                <Header />
                <div className="container-fluid">
                    <div className="m-5">
                        <div className="card border-danger restBox" >
                            <div className="row g-0">
                                <div className="col-md-4 restImg">
                                    <img src={details.restaurant_thumb} className="img-fluid rounded m-3 " alt="" />
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body ms-3">
                                        <h1 className="card-title h1-details">{details.restaurant_name}</h1>
                                        <p className="card-text">
                                            <i className="fas fa-star checked text-success"></i>
                                            <i className="fas fa-star checked text-success"></i>
                                            <i className="fas fa-star checked text-success"></i>
                                            <i className="fas fa-star checked text-success"></i>
                                            <i className="far fa-star text-success"></i>
                                            <small className="text-muted">289 Customer Reviews</small></p>
                                        <hr />
                                        <h5 className="h5-details">Best Taste of {details.restaurant_name} At your Door or DineIn</h5>
                                        <h3 className="h3-details"><strike>Old Price 180</strike></h3>
                                        <h3 className="h3-details">New Price {details.cost}</h3>
                                        <div className="icon">
                                            <i className="bi bi-door-open"></i>
                                            <p>Contact Less Delivery</p>
                                        </div>
                                        <div className="icon">
                                            <i className="bi bi-truck"></i>
                                            <p>Free Home Delivery</p>
                                        </div>
                                        <h3 className="text-success h3-details">Available Now</h3>
                                        {/* <button className="btn btn-danger m-3 px-3" onClick={this.back}>Back</button> */}
                                        <button className="btn btn-success px-3 " onClick={this.proceed}>Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tabs className="col-md-12">
                        <TabList>
                            <Tab>Details</Tab>
                            <Tab >Menu</Tab>
                            <Tab>Contacts</Tab>
                        </TabList>
                        <TabPanel>
                            <h2>{details.restaurant_name}</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </TabPanel>
                        <TabPanel>
                            <MenuDisplay menuData={this.state.menulist}
                                finalOrder={(data) => { this.addToCard(data) }}
                            />
                        </TabPanel>
                        <TabPanel>
                            <h3>{details.address}</h3>
                            <h3>Contacts no.:789453210</h3>
                            <h3>Email:contactme@xomatoaps.com</h3>
                        </TabPanel>
                    </Tabs>
                </div>
            </>

        )
    }
    async componentDidMount() {
        const restId = this.props.match.params.id;
        const response = await axios.get(`${detailUrl}/${restId}`)
        const menuResponse = await axios.get(`${menuUrl}/${restId}`)
        this.setState({ details: response.data[0], menulist: menuResponse.data });
    }
}

export default Details;
