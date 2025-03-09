'use client';

import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { CartItem } from '../context/CartContext';

// Register custom font (optional)
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto'
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
  },
  column: {
    flex: 1,
    fontSize: 10,
  },
  columnHeader: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
  },
  customerDetails: {
    marginBottom: 20,
  },
  bankDetails: {
    marginTop: 20,
    fontSize: 10,
  },
  total: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

interface EstimatePDFProps {
  items: CartItem[];
  totalAmount: number;
  customerDetails?: {
    name: string;
    mobile: string;
    address: string;
  };
}

const EstimatePDF = ({ items, totalAmount, customerDetails }: EstimatePDFProps) => {
  const currentDate = new Date().toLocaleDateString('en-GB');
  const estimateNo = `2025SRT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>ESTIMATE</Text>
          <Text style={styles.companyInfo}>SRT Crackers</Text>
          <Text style={styles.companyInfo}>171-A, P.K.N Road, SIVAKASI-626189</Text>
          <Text style={styles.companyInfo}>Mobile: 9444652762 | E-mail: crackerssrt@gmail.com</Text>
          
          <View style={[styles.row, { marginTop: 20 }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10 }}>Enquiry No: {estimateNo}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 10 }}>Date: {currentDate}</Text>
            </View>
          </View>
        </View>

        {/* Customer Details */}
        <View style={styles.customerDetails}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>Customer Details</Text>
          <Text style={{ fontSize: 10 }}>{customerDetails?.name || 'Guest Customer'}</Text>
          <Text style={{ fontSize: 10 }}>{customerDetails?.mobile || ''}</Text>
          <Text style={{ fontSize: 10 }}>{customerDetails?.address || ''}</Text>
        </View>

        {/* Products Table */}
        <View style={styles.section}>
          {/* Table Header */}
          <View style={[styles.row, { backgroundColor: '#f0f0f0' }]}>
            <View style={[styles.columnHeader, { flex: 0.5 }]}>
              <Text>S.No</Text>
            </View>
            <View style={[styles.columnHeader, { flex: 2 }]}>
              <Text>Product Name</Text>
            </View>
            <View style={[styles.columnHeader, { flex: 0.8 }]}>
              <Text>Quantity</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text>Rate/Qty</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text>Discount</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text>Final Rate</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text>Amount (Rs)</Text>
            </View>
          </View>

          {/* Table Body */}
          {items.map((item, index) => {
            const discountAmount = (item.product.price * (item.product.discount || 0)) / 100;
            const finalRate = item.product.price - discountAmount;
            const amount = finalRate * item.quantity;

            return (
              <View key={index} style={styles.row}>
                <View style={[styles.column, { flex: 0.5 }]}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={[styles.column, { flex: 2 }]}>
                  <Text>{item.product.name}</Text>
                </View>
                <View style={[styles.column, { flex: 0.8 }]}>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={[styles.column, { flex: 1 }]}>
                  <Text>{item.product.price.toFixed(2)}</Text>
                </View>
                <View style={[styles.column, { flex: 1 }]}>
                  <Text>{item.product.discount || 0}%</Text>
                </View>
                <View style={[styles.column, { flex: 1 }]}>
                  <Text>{finalRate.toFixed(2)}</Text>
                </View>
                <View style={[styles.column, { flex: 1 }]}>
                  <Text>{amount.toFixed(2)}</Text>
                </View>
              </View>
            );
          })}

          {/* Total */}
          <View style={[styles.row, { borderTopWidth: 2 }]}>
            <View style={[styles.column, { flex: 6 }]}>
              <Text style={styles.totalText}>Total Items: {items.length}</Text>
            </View>
            <View style={[styles.column, { flex: 2 }]}>
              <Text style={styles.totalText}>Overall Total: ₹{totalAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Bank Details */}
        <View style={styles.bankDetails}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Bank Details</Text>
          <Text>A/C Name: SRI RAJESWARI TRADERS</Text>
          <Text>A/C Number: 349002000005678</Text>
          <Text>A/C Type: CURRENT ACCOUNT</Text>
          <Text>Bank Name: INDIAN OVERSEAS BANK, SIVAKASI</Text>
          <Text>IFSC Code: IOBA0003490</Text>
        </View>
      </Page>
    </Document>
  );
};

export default EstimatePDF; 