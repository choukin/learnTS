import React from 'react';
// import logo from './logo.svg';
import Button from 'reactstrap/lib/Button'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import { IPersonState, IProps } from './types';
import FormValidation from './FormValidation'

export default class PersonalDetails extends React.Component<IProps,IPersonState>{
    private defaultState: Readonly<IPersonState>;
    constructor(props:IProps) {
        super(props);
        this.defaultState = props.DefaultState;
        this.state = props.DefaultState
    }

    private updateBinding=(event:any)=>{
        const value = event.target.value
        switch (event.target.id) {
            case 'firstName':
                this.setState({FirstName: value})
                break;
            case 'lastName':
                this.setState({LastName: value})
                break;
            case 'addr1':
                this.setState({Address1:value})
                break;
            case 'addr2':
                this.setState({Address2:value}) 
                break       
            case 'town':
                this.setState({Town:value})
                break
            case 'county':
                this.setState({Country:value})
                break
            case 'postcode':
                this.setState({Postcode:value})
                break
            case 'phoneNumber':
                this.setState({PhoneNumber:value})
                break
            case 'dateOfBirth':
                this.setState({DateOfBirth:value})
                break            
            default:
                break;
        }
    }
    private userCanSave = (hasErrors:boolean)=>{
        this.canSave = hasErrors
    }

    private loadPeople=()=>{
        this.people = new Array<Personrecord>()
        this.dataLayer.Read().then(people=>{
            this.people = people
            this.setState(this.state)
        })
    }
    public render() {
        return (
            <Row>
                <Col lg="8">
                   <Row>
                        <Col><h4 className="mb-3">个人详情</h4></Col>   
                    </Row>    
                    <Row>
                        <Col><label htmlFor="firstName">姓</label></Col>
                        <Col><label htmlFor="lastName">名</label></Col>
                    </Row>
                    <Row>
                        <Col>
                          <input type="text" id="firstName" className="form-control" value={this.state.FirstName} onChange={this.updateBinding} placeholder="请输入姓"/>
                        </Col>
                        <Col>
                          <input type="text" id="lastName" className="form-control" value={this.state.LastName} onChange={this.updateBinding} placeholder="请输入名"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="3">
                        <label htmlFor="postcode">邮编</label>
                        </Col>
                        <Col lg="4">
                            <label htmlFor="phoneNumber">手机号</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="3">
                            <input type="text" id="postcode" className="form-control" value={this.state.Postcode}/>
                        </Col>
                        <Col lg="4">
                            <input type="text" id="phoneNumber" className="form-control" value={this.state.PhoneNumber}/>
                        </Col>
                    </Row>
                    </Col> 
                    ... 此处省略
                        <Col>
                            <Col>
                                <Row>
                                    <Col lg="6">
                                        <Button size="lg" color="success">加载</Button>
                                    </Col>
                                    <Col>
                                        <Button size="lg" color="info">新人</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <FormValidation currentSate={this.state} CanSave={this.userCanSave}/>
                                </Row>
                            </Col>
                        </Col>
            </Row>    
        )
    }
}