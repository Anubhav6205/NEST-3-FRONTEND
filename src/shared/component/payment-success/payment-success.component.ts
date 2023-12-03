import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Property } from 'src/shared/model/Property';
import { User } from 'src/shared/model/User';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent implements OnInit {
  @ViewChild('receiptSubContainer') receiptSubContainer!: ElementRef;

  constructor() {}

  userData: User = {} as User;
  propertyData: Property = {} as Property;
  currentDate: string = '';
  dueDate: string = '';
  printOptions: boolean = true;

  ngOnInit(): void {
    this.userData = history.state.userData;
    this.propertyData = history.state.propertyData;
    const date = new Date();
    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(date.getMonth() + 1);

    this.currentDate =
      date.toString().substring(4, 10) +
      ', ' +
      date.toString().substring(11, 16);
    this.dueDate =
      nextMonthDate.toString().substring(4, 10) +
      ', ' +
      nextMonthDate.toString().substring(11, 16);
  }

  downloadAsJpg() {
    html2canvas(this.receiptSubContainer.nativeElement).then((canvas) => {
      const imageData = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'receipt.jpg';
      link.click();
    });
  }

  downloadAsPdf() {
    const content = this.receiptSubContainer.nativeElement;

    html2pdf(content, { margin: 10, filename: 'receipt.pdf' });
  }
}
