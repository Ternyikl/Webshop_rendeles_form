import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { CreateOrderDto } from './neworder.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  products: Product[] = [
    {src: '', name: ""},
    {src: '', name: ""},
    {src: '', name: ""}
  ]

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'Webshop'
    }
  }

  @Get('neworder')
  @Render('neworder')
  newOrder(){
    return{
      title: 'Order',
      products: this.products
    }
  }

  @Post('neworder')
  @Render('neworder')
  newOrderForm(@Body() body: CreateOrderDto ) {
    const errors: string[] = []

    if(!body.product){
      errors.push('One product must be selected!')
    } else {
      if(!this.products.map(x => x.name).includes(body.product)){
        errors.push('Only the provided products are valid!')
      }
    }

    if(!body.name){
      errors.push('Name is required!')
    }

    if(!body.payAdress){
      errors.push('Payment address is required!')
    }

    if(!body.deliveryAdress){
      errors.push('Delivery adress is required!')
    }

    if(body.kupon && !/^[A-Z]{2}-[0-9]{4}$/.test(body.kupon)){
        errors.push('Provided kupon is invalid!')
    }

    if(!body.cardNumber){
      errors.push('Card Number is required!')
    } else {
      if(!/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/.test(body.cardNumber)){
        errors.push('Card Number is in the wrong format!')
      }
    }

    if(!body.cardDate){
      errors.push('Experision date is required!')
    } else {
      if(!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(body.cardNumber)){
        errors.push('Experision date is in the wrong format!')
      }
    }

    if(!body.cardCode){
      errors.push('Securty code is required!')
    } else {
      if(!/^[0-9]{3}$/.test(body.cardNumber)){
        errors.push('Securty cod is in the wrong format!')
      }
    }

  }
}

interface Product {
  src: string;
  name: string;
}