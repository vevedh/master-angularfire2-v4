import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  public billList: AngularFireList<any>;
  public userId: string;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
      this.billList = this.afDatabase.list(`/userProfile/${user.uid}/billList`);
    });
  }

  getBillList(): AngularFireList<any> {
    return this.billList;
  }

  getBill(billId: string): AngularFireObject<any> {
    return this.afDatabase.object(`/userProfile/${this.userId}/billList/${billId}`);
  }

  createBill(
    name: string,
    amount: number,
    dueDate: any = null,
    paid: boolean = false
  ): Promise<any> {
    const newBillRef: firebase.database.ThenableReference = this.billList.push({});

    return newBillRef.set({
      name,
      amount,
      dueDate: `${dueDate.year.value}-${dueDate.month.value - 1}-${dueDate.day.value}`,
      paid,
      id: newBillRef.key,
    });
  }

  removeBill(billId: string): Promise<any> {
    return this.billList.remove(billId);
  }

  payBill(billId: string): Promise<any> {
    return this.billList.update(billId, { paid: true });
  }
}
