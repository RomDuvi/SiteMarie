import { Component, OnInit, Input } from '@angular/core';
import { PaypalConfig } from '../../models/paypalConfig.model';
import { ToastGeneratorService } from '../app/services/toastGenerator.service';
import { Picture } from 'src/models/picture.model';
import { Options } from 'selenium-webdriver/safari';
import { privateEncrypt } from 'crypto';
declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @Input() picture: Picture;
  options: Option[] = [];
  config: PaypalConfig;

  constructor(
    private toast: ToastGeneratorService
  ) { }

  ngOnInit() {
    this.config = new PaypalConfig((data, actions) => this.onAuthorize(data, actions), () => this.onCancel(), () => this.onError());
    this.config.env = 'production';
    this.initOptions();
  }

  initButton(config: PaypalConfig) {
    document.getElementById('paypal-container').innerHTML = '';
    paypal.Button.render(config, '#paypal-container');
  }

  onAuthorize(data, actions) {
    return actions.payment.execute().then((d: any) => {
      this.toast.toastSucess('Order', 'Payment authorized!');
    });
  }

  onCancel() {
    this.toast.toastWarning('Order', 'Payment cancelled');
  }

  onError() {
    this.toast.toastError('Order',  'An error occured');
  }

  initOptions() {
    const price = this.picture.price;
    const width = this.picture.width;
    const height = this.picture.height;

    this.options.push(new Option(true, `${width} x ${height} px`, price));
    this.options.push(new Option(false, `${Math.floor(width / 3)} x ${Math.floor(height / 3)} px`, Math.floor(price / 2)));
    this.options.push(new Option(false, `${Math.floor(width / 4)} x ${Math.floor(height / 4)} px`, Math.floor(price / 3)));

    this.config.createPayment(price, 'EUR');
    this.initButton(this.config);
  }

  selectOption(option: Option) {
    this.options.forEach(opt => {
      opt.selected = false;
    });
    option.selected = true;
    this.config.createPayment(option.price, 'EUR');
    this.initButton(this.config);
  }
}

class Option {
  constructor(
    public selected: boolean,
    public size: string,
    public price: number
  ) { }
}
